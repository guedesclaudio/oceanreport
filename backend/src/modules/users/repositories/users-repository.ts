import { prisma } from "@/config";
import { UserData } from "@/types";
import { Session, User } from "@prisma/client";

async function insertUser(userData: UserData): Promise<User> {
  return prisma.user.create({
    data: { 
      name: userData.name,
      email: userData.email,
      password: userData.password,
      report: userData.report
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

const usersRepository = {
  insertUser,
  findEmail,
  insertSession,
  findUsersWithReport
};

export default usersRepository;
