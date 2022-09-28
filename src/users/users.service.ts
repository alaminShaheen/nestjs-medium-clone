import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { errorMessages } from "../helpers/errorMessages";

@Injectable()
export class UsersService {
    constructor (@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }
    
    create (email: string, password: string, salt: string) {
        const user = this.userRepository.create({ email, password, salt });
        return this.userRepository.save(user);
    }
    
    async findOneByEmail (email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }
    
    async findOneById (id: string) {
        return await this.userRepository.findOne({ where: { id } });
    }
    
    async update (userId: string, userInfo: Partial<UserEntity>) {
        try {
            const userToUpdate = await this.findOneById(userId);
            
            if (!userToUpdate) throw new NotFoundException(errorMessages.userDoesNotExist());
            
            Object.assign(userToUpdate, userInfo);
            return this.userRepository.save(userToUpdate);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            else throw new InternalServerErrorException(errorMessages.serverError());
            
        }
    }
}
