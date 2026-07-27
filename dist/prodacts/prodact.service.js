"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdactService = void 0;
const common_1 = require("@nestjs/common");
let ProdactService = class ProdactService {
    product = [
        {
            id: 1,
            name: 'tomato',
            price: 3,
            category: 'Food',
            description: 'tomato',
        },
        {
            id: 2,
            name: 'toster',
            price: 50,
            category: 'Electronics',
            description: 'toster',
        },
        {
            id: 3,
            name: 'blender',
            price: 100,
            category: 'Electronics',
            description: 'blender',
        },
        {
            id: 4,
            name: 'tv',
            price: 1000,
            category: 'Electronics',
            description: 'tv',
        },
        {
            id: 5,
            name: 'camera',
            price: 1500,
            category: 'Electronics',
            description: 'camera',
        },
        {
            id: 6,
            name: 'phone',
            price: 3000,
            category: 'Electronics',
            description: 'phone',
        },
    ];
    getAllProduct() {
        return this.product;
    }
    getProductById(id) {
        const product = this.product.find((el) => el.id === Number(id));
        if (!product)
            throw new common_1.HttpException('not found', common_1.HttpStatus.NOT_FOUND);
        return product;
    }
    createProduct(body) {
        const lastId = this.product[this.product.length - 1]?.id || 0;
        const newObj = {
            id: lastId + 1,
            name: body.name,
            price: body.price,
            category: body.category,
            description: body.description,
        };
        this.product.push(newObj);
        return newObj;
    }
    updateProduct(id, body) {
        const index = this.product.findIndex((el) => el.id === Number(id));
        if (index === -1)
            throw new common_1.HttpException('not found', common_1.HttpStatus.NOT_FOUND);
        this.product[index] = {
            ...this.product[index],
            ...body,
        };
        return this.product[index];
    }
    deleteProduct(id) {
        const index = this.product.findIndex((el) => el.id === Number(id));
        if (index === -1)
            throw new common_1.HttpException('not found', common_1.HttpStatus.NOT_FOUND);
        const deleteproduct = this.product.splice(index, 1);
        return deleteproduct;
    }
};
exports.ProdactService = ProdactService;
exports.ProdactService = ProdactService = __decorate([
    (0, common_1.Injectable)()
], ProdactService);
//# sourceMappingURL=prodact.service.js.map