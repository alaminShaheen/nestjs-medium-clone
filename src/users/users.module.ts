import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { AppMessagesModule } from "../app-messages/app-messages.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AppMessagesModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {
}
