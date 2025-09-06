import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'worker' | 'admin' | 'committee';
  greenCoins: number;
  level: number;
  location: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateGreenCoins: (coins: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateGreenCoins = (coins: number) => {
    if (user) {
      setUser({ ...user, greenCoins: user.greenCoins + coins });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateGreenCoins }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};