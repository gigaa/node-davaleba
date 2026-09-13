import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sing-in.dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/users/schema/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  singUp(@Body() body: SingUpDto) {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign in and get JWT' })
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  @Get('/curr-user')
  @ApiOperation({ summary: 'Get the currently authenticated user' })
  currUser(@CurrentUser() user: User) {
    return user;
  }
}
