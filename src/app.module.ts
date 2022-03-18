import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { CoinbaseService } from "./coinbase/coinbase.service";
import { CoinbaseController } from "./coinbase/coinbase.controller";
import { CoinbaseModule } from "./coinbase/coinbase.module";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { UsersRepository } from "./users/users.repository";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CoinbaseModule,
  ],
})
export class AppModule {}
