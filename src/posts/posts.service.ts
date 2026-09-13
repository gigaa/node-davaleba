import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/schema/user.schema';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto, user: User & { _id: any }) {
    const post = await this.postModel.create({
      ...createPostDto,
      author: user._id,
    });
    return post;
  }

  findAll() {
    return this.postModel.find().populate('author', '-password');
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new NotFoundException('Invalid post ID');
    const post = await this.postModel
      .findById(id)
      .populate('author', '-password');
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async findByUser(userId: string) {
    return this.postModel
      .find({ author: userId })
      .populate('author', '-password');
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    user: User & { _id: any },
  ) {
    if (!isValidObjectId(id))
      throw new NotFoundException('Invalid post ID');

    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');

    // only the author or admin can update
    const isOwner = post.author.toString() === user._id.toString();
    const isAdmin = user.role === UserRole.ADMIN;
    if (!isOwner && !isAdmin)
      throw new ForbiddenException('You can only edit your own posts');

    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string, user: User & { _id: any }) {
    if (!isValidObjectId(id))
      throw new NotFoundException('Invalid post ID');

    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');

    // only the author or admin can delete
    const isOwner = post.author.toString() === user._id.toString();
    const isAdmin = user.role === UserRole.ADMIN;
    if (!isOwner && !isAdmin)
      throw new ForbiddenException('You can only delete your own posts');

    return this.postModel.findByIdAndDelete(id);
  }
}
