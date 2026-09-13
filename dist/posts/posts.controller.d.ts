import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from "../users/schema/user.schema";
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, user: User & {
        _id: any;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[], import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("./schema/post.schema").Post, "find", {}>;
    findAllAdmin(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[], import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("./schema/post.schema").Post, "find", {}>;
    findByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updatePostDto: UpdatePostDto, user: User & {
        _id: any;
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string, user: User & {
        _id: any;
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
