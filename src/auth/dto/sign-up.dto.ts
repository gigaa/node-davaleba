import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserRole } from 'src/enums/user-role.enum';

export class SingUpDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 25)
  fullName!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password!: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
