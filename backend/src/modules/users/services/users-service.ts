import { duplicatedEmailError, loginInvalidInformations } from "../../../erros";
import { UserData, UserDataLogin, UserToken, OAuthDataLogin } from "../../../types";
import { Session, User } from "@prisma/client";
import { comparePassword, encryptedPassword, generateToken } from "../../../helpers";
import { exclude } from "../../../helpers";
import usersRepository from "../repositories/users-repository";

async function insertUserWithData(userData: UserData): Promise<User> {
  await checkUniqueEmail(userData.email);
  const { password } = userData;
  userData.password = await encryptedPassword(password);
  return usersRepository.insertUser(userData);
}

async function loginUser(userDataLogin: UserDataLogin): Promise<UserToken> {
  const userId = await checkLogin(userDataLogin);
  const token = generateToken(userId);
  const session = await usersRepository.insertSession(userId, token);
  return exclude(session, "createdAt", "updatedAt", "id");
}

async function oAuthLoginUser(oAuthDataLogin: OAuthDataLogin): Promise<Omit<Session, "createdAt" | "updatedAt" | "id">> {
  let user = await usersRepository.findEmail(oAuthDataLogin.email);
  const { email, accessToken, displayName } = oAuthDataLogin;

  if (!user) {
    const userData = { 
      email,
      password: accessToken.substring(0,200),
      name: displayName,
      report: true
    }
    user = await usersRepository.insertUser(userData);
  }

  const token = generateToken(user?.id);
  const session = await usersRepository.insertSession(user.id, token);
  return exclude(session, "createdAt", "updatedAt", "id");
}

async function checkUniqueEmail(email: string): Promise<void> {
  const userExists = await usersRepository.findEmail(email);
  if (userExists) throw duplicatedEmailError;
}

async function checkLogin(UserDataLogin: UserDataLogin): Promise<number> {
  const user = await usersRepository.findEmail(UserDataLogin.email);
  
  if (!user) throw loginInvalidInformations();

  const passwordIsValid = await comparePassword(UserDataLogin.password, user.password);
  
  if (!passwordIsValid) throw loginInvalidInformations();

  return user.id;
}

const usersService = {
  insertUserWithData,
  loginUser,
  oAuthLoginUser
};

export default usersService;
