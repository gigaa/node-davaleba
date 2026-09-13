import { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from "../users/schema/user.schema";
export declare class PostsService {
    private postModel;
    constructor(postModel: Model<Post>);
    create(createPostDto: CreatePostDto, user: User & {
        _id: any;
    }): Promise<import("mongoose").Document<unknown, {}, Post, {}, import("mongoose").DefaultSchemaOptions> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Post, {}, import("mongoose").DefaultSchemaOptions> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[], import("mongoose").Document<unknown, {}, Post, {}, import("mongoose").DefaultSchemaOptions> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, Post, "find", {}>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Post, {}, import("mongoose").DefaultSchemaOptions> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, Post, {}, import("mongoose").DefaultSchemaOptions> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    update(id: string, updatePostDto: UpdatePostDto, user: User & {
        _id: any;
    }): Promise<(import("mongoose").Document<unknown, {}, Post, {}, import("mongoose").DefaultSchemaOptions> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string, user: User & {
        _id: any;
    }): Promise<(import("mongoose").Document<unknown, {}, Post, {}, import("mongoose").DefaultSchemaOptions> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
