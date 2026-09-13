import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[], import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("./schema/user.schema").User, "find", {}>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
