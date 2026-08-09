import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  Max,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(1000)
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Price must be at least 1 unit.' })
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(500, { message: 'stock percentage cannot exceed 500' }) // Custom error message
  stock!: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  category!: string;
}
