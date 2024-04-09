import { duplicatedEmailError, loginInvalidInformations, userNotFoundError } from "../../../erros";
import { UserData, UserDataLogin, UserToken, OAuthDataLogin, UpdateUserData } from "../../../types";
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
      report: false,
      isOAuth: true,
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

async function checkLogin(userDataLogin: UserDataLogin): Promise<number> {
  const user = await usersRepository.findEmail(userDataLogin.email);
  
  if (!user) throw loginInvalidInformations();

  const passwordIsValid = await comparePassword(userDataLogin.password, user.password);
  
  if (!passwordIsValid) throw loginInvalidInformations();

  return user.id;
}

async function getUserAccountInformations(userId: number): Promise<User> {
  return usersRepository.findById(userId);
} 

async function updateUser(userId: number, updateUserData: UpdateUserData) {
  const user = await usersRepository.findById(userId);
  if (!user) throw userNotFoundError();

  await checkUpdatePasswords(user, updateUserData)

  const updateUserModel = exclude(updateUserData, "confirmNewPassword", "newPassword", "oldPassword");
  return usersRepository.updateById(userId, updateUserModel);
}

async function checkUpdatePasswords(user: User, updateUserData: UpdateUserData) {
  if (updateUserData.newPassword) {
    const passwordIsValid = await comparePassword(updateUserData.oldPassword, user.password);
    if (!passwordIsValid) throw loginInvalidInformations();

    if (updateUserData.newPassword !== updateUserData.confirmNewPassword) throw loginInvalidInformations();
    updateUserData.password = updateUserData.newPassword;
  }
}

const usersService = {
  insertUserWithData,
  loginUser,
  oAuthLoginUser,
  getUserAccountInformations,
  updateUser,
};

export default usersService;
