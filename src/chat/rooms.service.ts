import { Injectable } from '@nestjs/common';

export interface ChatUser {
  name: string;
  room: string;
}

@Injectable()
export class RoomsService {
  private readonly users = new Map<string, ChatUser>(); // socket.id -> user
  private readonly rooms = new Set<string>();

  /** უნიკალური 6-სიმბოლოიანი კოდი (O/0/I/1 გამოტოვებულია) */
  generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code: string;
    do {
      code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (this.rooms.has(code));
    this.rooms.add(code);
    return code;
  }

  exists(code: string): boolean {
    return this.rooms.has(code);
  }

  add(id: string, name: string, room: string): void {
    this.rooms.add(room);
    this.users.set(id, { name, room });
  }

  get(id: string): ChatUser | undefined {
    return this.users.get(id);
  }

  /** შლის მომხმარებელს; ცარიელ ოთახს ასუფთავებს */
  remove(id: string): ChatUser | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    this.users.delete(id);
    if (this.usersIn(user.room).length === 0) this.rooms.delete(user.room);
    return user;
  }

  usersIn(room: string): string[] {
    return [...this.users.values()].filter((u) => u.room === room).map((u) => u.name);
  }
}
