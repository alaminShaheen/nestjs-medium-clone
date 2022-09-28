import { StringUtils } from "../utils/string.utils";

export const errorMessages = {
    emailExists: () => `User with email already exists`,
    serverError: () => `An internal server error occurred`,
    invalidCredentials: () => `Invalid credentials provided`,
    fieldRequired: (fieldName: string) => `${StringUtils.capitalize(fieldName)} is required`,
    userDoesNotExist: () => `User does not exist`
};
