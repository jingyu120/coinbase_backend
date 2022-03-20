import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./models/Users";
import { Model } from "mongoose";
@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>
  ) {}

  async insertOne(data: Partial<User>): Promise<User> {
    const user = new this.user(data);
    return user.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.user.findOne({ email });
  }

  async findById(userId: string): Promise<User> {
    return this.user.findById(userId);
  }
}
