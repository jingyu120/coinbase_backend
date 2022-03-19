import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserResponse } from "src/users/dto/response/user-response.dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}
  async login(user: UserResponse, response: Response): Promise<void> {
    const TokenPayload: TokenPayload = {
      userId: user._id,
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get("JWT_EXPIRATION")
    );
    const token = this.jwtService.sign(TokenPayload);
    response.cookie("Authentication", token, { httpOnly: true, expires });
  }
}
