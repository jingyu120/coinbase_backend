import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserRequest } from "./dto/create-user-request.dto";
import { UsersRepository } from "./users.repository";
import { hash } from "bcrypt";
import { User } from "./models/Users";
import { UserReponse } from "./dto/request/user-response.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserRequest: CreateUserRequest): Promise<any> {
    await this.validateCreateUserRequest(createUserRequest);
    const user = await this.usersRepository.insertOne({
      ...createUserRequest,
      password: await hash(createUserRequest.password, 10),
    });
    return this.buildReponse(user);
  }

  private async validateCreateUserRequest(
    createUserRequest: CreateUserRequest
  ): Promise<void> {
    const user = await this.usersRepository.findOneByEmail(
      createUserRequest.email
    );
    if (user) {
      throw new BadRequestException("Email already exists");
    }
  }
  private buildReponse(user: User): UserReponse {
    return { _id: user._id.toHexString(), name: user.name, email: user.email };
  }
}
