import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UserRole } from 'src/enums/user-role.enum';
import { User } from 'src/users/schema/user.schema';

@Controller('posts')
@UseGuards(AuthGuard, RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // any authenticated user can create a post
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User & { _id: any },
  ) {
    return this.postsService.create(createPostDto, user);
  }

  // public — no guard needed, but we keep it under the controller guard
  // (guard passes if no @Roles decorator set)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // get all posts of a specific user
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.postsService.findByUser(userId);
  }

  // author or admin can update
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User & { _id: any },
  ) {
    return this.postsService.update(id, updatePostDto, user);
  }

  // author or admin can delete; admins can also use @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: User & { _id: any },
  ) {
    return this.postsService.remove(id, user);
  }

  // example of @Roles decorator: only admins see this
  @Get('admin/all')
  @Roles(UserRole.ADMIN)
  findAllAdmin() {
    return this.postsService.findAll();
  }
}
