import React, { ReactElement } from 'react';

export const contextObject = {
  userData: {
    email: '',
    password: ''
  },
  setUserData: () => {},
  config: '',
  setConfig: () => {},
};

export type Context = {
  userData: {
    email: string,
    password: string
  },
  setUserData: ReactElement,
  config: string,
  setConfig: ReactElement,
  displaySideBar: string,
  setDisplaySideBar: ReactElement,
  animationSideBar: string,
  setAnimationSideBar: ReactElement
}
