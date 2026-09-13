import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from 'src/enums/user-role.enum';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  fullName!: string;

  @Prop({ type: String })
  email!: string;

  @Prop({ type: String, select: false })
  password!: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role!: UserRole;
}

export const userSchema = SchemaFactory.createForClass(User);
