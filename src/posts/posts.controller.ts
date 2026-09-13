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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UserRole } from 'src/enums/user-role.enum';
import { User } from 'src/users/schema/user.schema';

@ApiTags('posts')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
@Controller('posts')
@UseGuards(AuthGuard, RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a post (authenticated user)' })
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User & { _id: any },
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'List all posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get('admin/all')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'List all posts (admin only)' })
  findAllAdmin() {
    return this.postsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'List posts by user' })
  @ApiParam({ name: 'userId', description: 'Author user id' })
  findByUser(@Param('userId') userId: string) {
    return this.postsService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiParam({ name: 'id', description: 'Post MongoDB id' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post (author or admin)' })
  @ApiParam({ name: 'id', description: 'Post MongoDB id' })
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User & { _id: any },
  ) {
    return this.postsService.update(id, updatePostDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post (author or admin)' })
  @ApiParam({ name: 'id', description: 'Post MongoDB id' })
  remove(
    @Param('id') id: string,
    @CurrentUser() user: User & { _id: any },
  ) {
    return this.postsService.remove(id, user);
  }
}
