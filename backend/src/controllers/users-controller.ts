import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserData, UserDataLogin, OAuthDataLogin } from "@/types";
import usersService from "@/services/users-service";

export async function createUser(req: Request, res: Response) {
  const userData = req.body
  delete userData.confirmPassword;

  try {
    await usersService.insertUserWithData(userData as UserData);
    return res.status(httpStatus.CREATED).send({ message: "user created" });
  } catch (error) {
    if (error.name === "duplicatedEmailError") return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function loginUser(req: Request, res: Response) {
  const userDataLogin = req.body as UserDataLogin;

  try {
    const response = await usersService.loginUser(userDataLogin);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "LoginInvalidInformations") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function loginOAuth(req: Request, res: Response) {
  const oAuthDataLogin = req.body as OAuthDataLogin;

  try {
    const response = await usersService.oAuthLoginUser(oAuthDataLogin);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
