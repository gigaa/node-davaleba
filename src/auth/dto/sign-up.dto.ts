import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Giga Gabata', maxLength: 25 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 25)
  fullName!: string;

  @ApiProperty({ example: 'giga@example.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'secret123', minLength: 6, maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password!: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
