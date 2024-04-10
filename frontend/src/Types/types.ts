export type BoxInformation = {
    image: string,
    title: string,
    text: string,
    url: string
};

export type CreateUser = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    report: boolean
};

export type LoginUser = {
    email: string,
    password: string
};

export type Error = {
    [key: string]: string
};

export type LinkType = {
    name: string,
    url: string
};

export type ReportObject = {
    waveCondition: string,
    temperatureCondition: string,
    windSpeedCondition: string,
    date: string,
    hour: string
    [key: string]: string;
};

export type Post = {
    username: string,
    userId: string,
    title: string,
    content: string,
    date: string,
    hour: string,
    postId: string
};

export type LoginOAuth = {
    accessToken: string, 
    email: string,
    displayName: string
};
