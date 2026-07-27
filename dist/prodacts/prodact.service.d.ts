import { ProductDTO } from './DTO/prodact.dto';
export declare class ProdactService {
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
        name: any;
        price: any;
        category: any;
        description: any;
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
