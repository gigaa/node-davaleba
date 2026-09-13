import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'My first post', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  title!: string;

  @ApiProperty({ example: 'Post content goes here', maxLength: 5000 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 5000)
  content!: string;
}
