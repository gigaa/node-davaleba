import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SingUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sing-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SingUpDto) {
    const existingUser = await this.userService.findOneByEmail(signUpDto.email);
    if (existingUser)
      throw new ConflictException('This account already exists');

    const hashedPass = await bcrypt.hash(signUpDto.password, 10);
    await this.userService.create({ ...signUpDto, password: hashedPass });
    return { message: 'User created successfully' };
  }

  async signIn(signInDto: SignInDto) {
    const existingUser = await this.userService.findOneByEmail(signInDto.email);
    if (!existingUser)
      throw new UnauthorizedException(
        "This account doesn't exist. Create a new account.",
      );

    const isEqualPass = await bcrypt.compare(
      signInDto.password,
      existingUser.password,
    );
    if (!isEqualPass) throw new UnauthorizedException('Invalid credentials');

    const payload = { userId: existingUser._id };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    return { accessToken };
  }
}
