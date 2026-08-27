import { BadGatewayException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SingUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { SignInDto } from './dto/sing-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SingUpDto) {
    const exsisitingUser = await this.userService.findOneByEmail(
      signUpDto.email,
    );
    if (exsisitingUser)
      throw new BadGatewayException('This Account Alrady Exist');
    const hashedPass = await bcrypt.hash(signUpDto.password, 10);
    await this.userService.create({ ...signUpDto, password: hashedPass });
    return 'User Created';
  }

  async signIn(signInDto: SignInDto) {
    const exsisitingUser = await this.userService.findOneByEmail(
      signInDto.email,
    );
    if (!exsisitingUser)
      throw new BadGatewayException(
        "This account does't exist. Create a new account.",
      );
    const isEqualPass = await bcrypt.compare(
      signInDto.password,
      exsisitingUser.password,
    );
    if (!isEqualPass) throw new BadGatewayException('Invalid Credentials');
    const payLoad = {
      userId: exsisitingUser._id,
    };
    const accessToken = await this.jwtService.sign(payLoad, {
      expiresIn: '1hr',
    });
    return accessToken;
  }

  async currUser(userId) {
    const user = this.userService.findOne(userId);
    return user;
  }
}
