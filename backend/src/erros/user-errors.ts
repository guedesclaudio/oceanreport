import { ApplicationError } from "../types";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}

export function loginInvalidInformations(): ApplicationError {
  return {
    name: "LoginInvalidInformations",
    message: "Invalid informations to login",
  };
}

export function userNotFoundError(): ApplicationError {
  return {
    name: "UserNotFound",
    message: "User not found in database",
  };
}