'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

export interface Participant {
  id: number;
  name: string;
}

export interface DrawResult {
  giver: Participant;
  receiver: Participant;
}

interface GroupContextType {
  groupName: string;
  setGroupName: (name: string) => void;
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  drawResults: DrawResult[];
  setDrawResults: (results: DrawResult[]) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
  const [groupName, setGroupName] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [drawResults, setDrawResults] = useState<DrawResult[]>([]);

  return (
    <GroupContext.Provider
      value={{
        groupName,
        setGroupName,
        participants,
        setParticipants,
        drawResults,
        setDrawResults,
      }}
    >
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
