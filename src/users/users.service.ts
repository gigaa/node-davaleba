import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const exsisitingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (exsisitingUser) throw new BadRequestException();
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID');
    const findUser = await this.userModel.findById(id);
    if (!findUser) throw new NotFoundException('User Not Found');
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID');
    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updateUser) throw new NotFoundException();

    return updateUser;
  }

  async findOneByEmail(email: string) {
    const user = this.userModel.findOne({ email: email }).select('+password');
    return user;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID');
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    if (!deleteUser) throw new NotFoundException('User Not Found');
    return deleteUser;
  }
}
