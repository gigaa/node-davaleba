import { ProdactService } from './product.service';
import { ProdactDTO } from './DTO/product.dto';
export declare class ProdactController {
    private readonly ProdactService;
    constructor(ProdactService: ProdactService);
    getAllProdact(): any;
    getProdactById(id: number): any;
    createUser(body: ProdactDTO): any;
    updateProdact(body: ProdactDTO, id: number): any;
    deleteProdact(id: number): any;
}
