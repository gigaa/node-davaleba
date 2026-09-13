import { AuthService } from './auth.service';
import { SingUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sing-in.dto';
import { User } from "../users/schema/user.schema";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    singUp(body: SingUpDto): Promise<{
        message: string;
    }>;
    signIn(body: SignInDto): Promise<{
        accessToken: string;
    }>;
    currUser(user: User): User;
}
