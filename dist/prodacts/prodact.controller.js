"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdactController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_dto_1 = require("./DTO/product.dto");
let ProdactController = class ProdactController {
    ProdactService;
    constructor(ProdactService) {
        this.ProdactService = ProdactService;
    }
    getAllProdact() {
        return this.ProdactService.getAllProdact();
    }
    getProdactById(id) {
        return this.ProdactService.getProdactById(id);
    }
    createUser(body) {
        console.log(body);
        return this.ProdactService.createProdact(body);
    }
    updateProdact(body, id) {
        return this.ProdactService.updateProdact(id, body);
    }
    deleteProdact(id) {
        return this.ProdactService.deleteProdact(id);
    }
};
exports.ProdactController = ProdactController;
__decorate([
    (0, common_1.Get)('/prodact'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProdactController.prototype, "getAllProdact", null);
__decorate([
    (0, common_1.Get)('/prodact/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProdactController.prototype, "getProdactById", null);
__decorate([
    (0, common_1.Post)('/prodact'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProdactDTO]),
    __metadata("design:returntype", void 0)
], ProdactController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('/prodact/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProdactDTO, Number]),
    __metadata("design:returntype", void 0)
], ProdactController.prototype, "updateProdact", null);
__decorate([
    (0, common_1.Delete)('/prodact/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProdactController.prototype, "deleteProdact", null);
exports.ProdactController = ProdactController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [product_service_1.ProdactService])
], ProdactController);
//# sourceMappingURL=prodact.controller.js.map