"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsViewer = exports.IsEditor = exports.IsAdmin = void 0;
const common_1 = require("@nestjs/common");
let IsAdmin = class IsAdmin {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const role = request.headers['role'];
        if (!role || !['admin'].includes(role))
            throw new common_1.UnauthorizedException();
        return true;
    }
};
exports.IsAdmin = IsAdmin;
exports.IsAdmin = IsAdmin = __decorate([
    (0, common_1.Injectable)()
], IsAdmin);
let IsEditor = class IsEditor {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const role = request.headers['role'];
        if (!role || !['admin', 'editor'].includes(role))
            throw new common_1.UnauthorizedException();
        return true;
    }
};
exports.IsEditor = IsEditor;
exports.IsEditor = IsEditor = __decorate([
    (0, common_1.Injectable)()
], IsEditor);
let IsViewer = class IsViewer {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const role = request.headers['role'];
        if (!role || !['admin', 'editor', 'viewer'].includes(role))
            throw new common_1.UnauthorizedException();
        return true;
    }
};
exports.IsViewer = IsViewer;
exports.IsViewer = IsViewer = __decorate([
    (0, common_1.Injectable)()
], IsViewer);
//# sourceMappingURL=role.guard.js.map