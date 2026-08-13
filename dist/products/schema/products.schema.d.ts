import mongoose from 'mongoose';
export declare class Product {
    title: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    user: mongoose.Schema.Types.ObjectId;
}
export declare const productSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any, any, Product>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, Product, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Product & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: mongoose.SchemaDefinitionProperty<string, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    price?: mongoose.SchemaDefinitionProperty<number, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    stock?: mongoose.SchemaDefinitionProperty<number, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    category?: mongoose.SchemaDefinitionProperty<string, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    user?: mongoose.SchemaDefinitionProperty<mongoose.Schema.Types.ObjectId, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Product>;
