import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sing-in.dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/users/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  singUp(@Body() body: SingUpDto) {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Get('/curr-user')
  currUser(@CurrentUser() user: User) {
    return user;
  }
}
