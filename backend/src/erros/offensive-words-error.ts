import { ApplicationError } from "../types";

export function postContentIsNotValid(): ApplicationError {
  return {
    name: "PostContentIsNotValid",
    message: "there are offensive words in the post",
  };
}
