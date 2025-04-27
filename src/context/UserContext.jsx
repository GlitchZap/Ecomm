import React, { createContext, useState, useContext } from 'react';

// Initialize with the exact time you specified
const initialUserState = {
  name: "GlitchZap",
  email: "glitchzap@mail.com",
  avatar: "https://ui-avatars.com/api/?name=GlitchZap&background=random",
  role: "Seller",
  dateTime: "2025-04-27 19:36:17"
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  
  const updateUser = (updatedInfo) => {
    setUser(prevState => ({ 
      ...prevState, 
      ...updatedInfo,
      avatar: updatedInfo.name ? 
        `https://ui-avatars.com/api/?name=${updatedInfo.name.replace(/\s/g, '+')}&background=random` : 
        prevState.avatar
    }));
  };
  
  const updateDateTime = (newDateTime) => {
    setUser(prevState => ({
      ...prevState,
      dateTime: newDateTime
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, updateDateTime }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);