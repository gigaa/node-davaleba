import { UserRole } from "../../enums/user-role.enum";
export declare class SingUpDto {
    fullName: string;
    email: string;
    password: string;
    role?: UserRole;
}
