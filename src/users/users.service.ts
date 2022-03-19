import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserRequest } from "./dto/request/create-user-request.dto";
import { UsersRepository } from "./users.repository";
import { hash, compare } from "bcrypt";
import { User } from "./models/Users";
import { UserResponse } from "./dto/response/user-response.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserRequest: CreateUserRequest): Promise<any> {
    await this.validateCreateUserRequest(createUserRequest);
    const user = await this.usersRepository.insertOne({
      ...createUserRequest,
      password: await hash(createUserRequest.password, 10),
    });
    return this.buildResponse(user);
  }

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User does not exist with email: ${email}`);
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException("Invalid Crednetials");
    }
    return this.buildResponse(user);
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
  private buildResponse(user: User): UserResponse {
    return { _id: user._id.toHexString(), name: user.name, email: user.email };
  }
}
