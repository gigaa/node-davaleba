import { ProductDTO } from './DTO/product.dto';
export declare class ProductService {
    product: {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    }[];
    getAllProduct(): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    }[];
    getProductById(id: number): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    };
    createProduct(body: ProductDTO): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    };
    updateProduct(id: number, body: ProductDTO): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    };
    deleteProduct(id: number): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    }[];
}
