import { Request } from "express";
import { Post as PostData } from "@prisma/client";

export type OceanData = {
    Hsig: string | null,
    Avg_W_Tmp1: string | null,
    Avg_W_Tmp2: string | null,
    Avg_Wv_Dir: string | null,
    Avg_Wv_Dir_N: string | null,
    M_Decl: string | null,
    TAvg: string | null,
    YEAR: number | null,
    MONTH: number | null,
    DAY: number | null,
    HOUR: number | null,
    MINUTE: number | null,
    SECOND: number | null
};

export type AtmosphereData = {
    YEAR: number | null,
    MONTH: number | null,
    DAY: number | null,
    HOUR: number | null,
    MINUTE: number | null,
    SECOND: string | null,
    Avg_Air_Tmp: string | number | null,
    Avg_Wnd_Sp: string | null,
    Avg_Wnd_Dir: string | null,
    Avg_Wnd_Dir_N: string | null,
    M_Decl: string | null
};

export type UserData = {
    name: string,
    email: string, 
    password: any,
    report: boolean
    isOAuth?: boolean
};

export type ApplicationError = {
    name: string,
    message: string
};

export type UserDataLogin = Omit<UserData, "name">;

export type OAuthDataLogin = {
    accessToken: string, 
    email: string,
    displayName: string
}

export type UserToken = {
    userId: number,
    token: string
}

export type AuthenticatedRequest = Request & JWTPayload;

export type JWTPayload = {
  userId: number;
};

export type ReportObject = {
    waveCondition: string,
    temperatureCondition: string,
    windSpeedCondition : string,
    date: string,
    hour: string
};

type UserEmail = {
    email: string,
    name: string
};

export type Email = {
    emailsList: UserEmail[],
    report: ReportObject
};

export type Post = {
    title: string,
    content: string
};

export type OffensiveWords = {
    [key: string]: boolean
};

export type PostAndUserName = (PostData & {
    User: {
        name: string;
    };
});

export type PostWithBRDate = (PostData & {hour?: string, date?: string});

export type IFormatHour = {[key: number]: (atmData: AtmosphereData) => void};

export type UpdateUserData = {
    name?: string,
    email?: string,
    oldPassword?: string,
    newPassword?: string,
    confirmNewPassword?: string,
    report?: boolean,
    password?: string,
};

export type UserAccountInformations = {
    name: string,
    email: string,
    report?: boolean,
    isOAuth?: boolean
};
