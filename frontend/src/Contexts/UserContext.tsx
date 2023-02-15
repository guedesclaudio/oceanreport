import { createContext } from 'react';
import { useState } from 'react';
import { contextObject, Context } from '../Helpers/Contexts/Context';

const UserContext = createContext<any>(contextObject);

const UserStorage = ({ children }: any) => {
  const [userData, setUserData] = useState<Storage>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
  );
  const [config, setConfig] = useState(
    localStorage.getItem('user') ? { headers: { 'Authorization': `Bearer ${userData?.token}` } } : null
  );

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        config,
        setConfig
      }}>
      {children}
    </UserContext.Provider>
  );
};
  
export { UserContext, UserStorage };
