import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

type Ack = { ok: true; room: string } | { ok: false; error: string };

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly rooms: RoomsService) {}

  @SubscribeMessage('createRoom')
  createRoom(@MessageBody() body: { name: string }, @ConnectedSocket() client: Socket): Ack {
    const name = this.cleanName(body?.name);
    if (!name) return { ok: false, error: 'შეიყვანე სახელი' };
    const room = this.rooms.generateCode();
    this.enter(client, name, room);
    return { ok: true, room };
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() body: { name: string; room: string }, @ConnectedSocket() client: Socket): Ack {
    const name = this.cleanName(body?.name);
    const room = String(body?.room ?? '').trim().toUpperCase();
    if (!name) return { ok: false, error: 'შეიყვანე სახელი' };
    if (!this.rooms.exists(room)) return { ok: false, error: 'ასეთი ოთახი ვერ მოიძებნა' };
    this.enter(client, name, room);
    return { ok: true, room };
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() body: { text: string }, @ConnectedSocket() client: Socket): void {
    const user = this.rooms.get(client.id);
    const text = String(body?.text ?? '').trim().slice(0, 1000);
    if (!user || !text) return;
    // შეტყობინება მხოლოდ იმავე ოთახის წევრებს ეგზავნებათ
    this.server.to(user.room).emit('message', {
      name: user.name,
      text,
      senderId: client.id,
      time: Date.now(),
    });
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(@ConnectedSocket() client: Socket): void {
    this.leave(client);
  }

  handleDisconnect(client: Socket): void {
    this.leave(client);
  }

  // ---------- დამხმარე მეთოდები ----------

  private enter(client: Socket, name: string, room: string): void {
    this.leave(client); // თუ სხვა ოთახში იყო
    client.join(room);
    this.rooms.add(client.id, name, room);
    this.server.to(room).emit('system', { text: `${name} შემოვიდა ოთახში`, time: Date.now() });
    this.server.to(room).emit('users', this.rooms.usersIn(room));
  }

  private leave(client: Socket): void {
    const user = this.rooms.remove(client.id);
    if (!user) return;
    client.leave(user.room);
    this.server.to(user.room).emit('system', { text: `${user.name} გავიდა ოთახიდან`, time: Date.now() });
    this.server.to(user.room).emit('users', this.rooms.usersIn(user.room));
  }

  private cleanName(name: unknown): string {
    return String(name ?? '').trim().slice(0, 24);
  }
}
