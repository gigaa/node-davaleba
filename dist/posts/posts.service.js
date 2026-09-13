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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./schema/post.schema");
const user_role_enum_1 = require("../enums/user-role.enum");
let PostsService = class PostsService {
    postModel;
    constructor(postModel) {
        this.postModel = postModel;
    }
    async create(createPostDto, user) {
        const post = await this.postModel.create({
            ...createPostDto,
            author: user._id,
        });
        return post;
    }
    findAll() {
        return this.postModel.find().populate('author', '-password');
    }
    async findOne(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.NotFoundException('Invalid post ID');
        const post = await this.postModel
            .findById(id)
            .populate('author', '-password');
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async findByUser(userId) {
        return this.postModel
            .find({ author: userId })
            .populate('author', '-password');
    }
    async update(id, updatePostDto, user) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.NotFoundException('Invalid post ID');
        const post = await this.postModel.findById(id);
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        const isOwner = post.author.toString() === user._id.toString();
        const isAdmin = user.role === user_role_enum_1.UserRole.ADMIN;
        if (!isOwner && !isAdmin)
            throw new common_1.ForbiddenException('You can only edit your own posts');
        return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
    }
    async remove(id, user) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.NotFoundException('Invalid post ID');
        const post = await this.postModel.findById(id);
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        const isOwner = post.author.toString() === user._id.toString();
        const isAdmin = user.role === user_role_enum_1.UserRole.ADMIN;
        if (!isOwner && !isAdmin)
            throw new common_1.ForbiddenException('You can only delete your own posts');
        return this.postModel.findByIdAndDelete(id);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map