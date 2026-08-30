import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('Checking if seeding is needed...');

    const count = await this.userModel.countDocuments();

    if (count > 0) {
      this.logger.log(`Database already has ${count} users — skipping seed.`);
      return;
    }

    const SEED_COUNT = 10;
    this.logger.log(`Seeding ${SEED_COUNT} fake users...`);

    const fakeUsers = Array.from({ length: SEED_COUNT }, () => ({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
    }));

    const created = await this.userModel.insertMany(fakeUsers);

    created.forEach((user) => {
      this.logger.log(
        `Created user | name: "${user.fullName}" | email: ${user.email} | id: ${user._id}`,
      );
    });

    this.logger.log(`✅ Seeded ${created.length} users successfully.`);
  }

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
