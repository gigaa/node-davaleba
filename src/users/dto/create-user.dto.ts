import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
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
}
