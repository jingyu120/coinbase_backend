import { Module } from "@nestjs/common";
import { CoinbaseAuthService } from "./coinbase-auth.service";
import { CoinbaseController } from "./coinbase.controller";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [HttpModule, AuthModule, UsersModule],
  controllers: [CoinbaseController],
  providers: [CoinbaseAuthService],
})
export class CoinbaseModule {}
