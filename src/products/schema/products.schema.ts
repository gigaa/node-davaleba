import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ type: String })
  title!: string;

  @Prop({ type: String })
  description!: string;

  @Prop({ type: Number })
  price!: number;

  @Prop({ type: Number })
  stock!: number;

  @Prop({ type: String })
  category!: string;
}

export const productSchema = SchemaFactory.createForClass(Product);
