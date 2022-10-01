import { Injectable } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { StringUtils } from "../common/utils/string.utils";

@Injectable()
export class DtoErrorMessagesService {
    static IS_REQUIRED<T> (dtoType: ClassConstructor<T>, fieldName: keyof T) {
        return `${StringUtils.capitalize(fieldName.toString())} is required`;
    }
    
    static MUST_BE_TYPE<T, K> (dtoType: ClassConstructor<T>, fieldName: keyof T, type: string) {
        return `${StringUtils.capitalize(fieldName.toString())} must be of type ${type.toString()}`;
    }
    
    static INVALID_FIELD<T, K> (dtoType: ClassConstructor<T>, fieldName: keyof T) {
        return `${StringUtils.capitalize(fieldName.toString())} is invalid`;
    }
    
    static NOT_MATCH<T> (dtoType: ClassConstructor<T>, fieldName1: keyof T, fieldName2: keyof T) {
        return `${StringUtils.capitalize(fieldName1.toString())} and ${StringUtils.capitalize(fieldName2.toString())} don't match`;
    }
}
