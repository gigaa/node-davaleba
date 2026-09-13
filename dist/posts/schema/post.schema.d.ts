import { Types } from 'mongoose';
export declare class Post {
    title: string;
    content: string;
    author: Types.ObjectId;
}
export declare const postSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, any, any, Post>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, import("mongoose").Document<unknown, {}, Post, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Post & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Post, import("mongoose").Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Post & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, Post, import("mongoose").Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Post & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    author?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Post, import("mongoose").Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Post & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Post>;
