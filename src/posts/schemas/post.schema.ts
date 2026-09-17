import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@ObjectType()
@Schema({ timestamps: true })
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true, trim: true })
  title: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field({ nullable: true })
  @Prop({ trim: true })
  author?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
