import { prisma } from "../../../config";
import { UpdateUserData, UserData } from "../../../types";
import { Session, User } from "@prisma/client";

async function insertUser(userData: UserData): Promise<User> {
  return prisma.user.create({
    data: { 
      name: userData.name,
      email: userData.email,
      password: userData.password,
      report: userData.report,
      isOAuth: userData.isOAuth ?? false,
    }
  });
}

async function findEmail(email: string): Promise<User> {
  return prisma.user.findUnique({
    where: { email }
  });
}

async function insertSession(userId: number, token: string): Promise<Session> {
  return prisma.session.create({
    data: {
      userId,
      token
    }
  });
}

async function findUsersWithReport(): Promise<User[]> {
  return prisma.user.findMany({
    where: { report: true }
  });
}

async function findById(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
}

async function updateById(userId: number, updateUserData: UpdateUserData) {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: updateUserData
  })
}

const usersRepository = {
  insertUser,
  findEmail,
  insertSession,
  findUsersWithReport,
  findById,
  updateById
};

export default usersRepository;
