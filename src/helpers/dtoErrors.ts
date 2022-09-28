import { ClassConstructor } from "class-transformer";
import { StringUtils } from "../utils/string.utils";

export const dtoErrorMessages = {
    isRequired: <T> (dtoType: ClassConstructor<T>, fieldName: keyof T) => {
        return `${StringUtils.capitalize(fieldName.toString())} is required`;
    },
    mustBeType: <T, K> (dtoType: ClassConstructor<T>, fieldName: keyof T, type: string) => {
        return `${StringUtils.capitalize(fieldName.toString())} must be of type ${type.toString()}`;
    },
    invalidEmail: () => `Email is invalid`,
    notMatch: <T> (dtoType: ClassConstructor<T>, fieldName1: keyof T, fieldName2: keyof T) => {
        return `${StringUtils.capitalize(fieldName1.toString())} and ${StringUtils.capitalize(fieldName2.toString())} don't match`;
    }
};
