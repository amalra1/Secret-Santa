'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface GroupContextType {
  groupName: string;
  setGroupName: (name: string) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
  const [groupName, setGroupNameState] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('secretSantaGroupName');
    if (savedName) {
      setGroupNameState(savedName);
    }
  }, []);

  const setGroupName = (name: string) => {
    setGroupNameState(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('secretSantaGroupName', name);
    }
  };

  return (
    <GroupContext.Provider value={{ groupName, setGroupName }}>
      {children}
    </GroupContext.Provider>
  );
}

export function useGroup() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
}