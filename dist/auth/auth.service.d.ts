import { UsersService } from "../users/users.service";
import { SingUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sing-in.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    signUp(signUpDto: SingUpDto): Promise<{
        message: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
}
