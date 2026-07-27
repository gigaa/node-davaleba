import { ProductService } from './product.service';
import { ProductDTO } from './DTO/product.dto';
export declare class ProductController {
    private readonly ProductService;
    constructor(ProductService: ProductService);
    getAllProdact(): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    }[];
    getProdactById(id: number): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    };
    createUser(body: ProductDTO): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    };
    updateProdact(body: ProductDTO, id: number): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    };
    deleteProdact(id: number): {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
    }[];
}
