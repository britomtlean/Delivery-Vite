import { useState, createContext } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'; //TIPAGEM PROP
import type { User } from '../Types/Types';

export type ContextType = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    contato: string;
    setContato: React.Dispatch<React.SetStateAction<string>>;
    notify: Array<Record<string, any>> | null;
    setNotify: Dispatch<SetStateAction<Array<Record<string, any>> | null>>;
};


export const Context: React.Context<ContextType | null> = createContext<ContextType | null>(null);

/************************************************************************************** */

export const ContextProvider = ({ children }: PropsWithChildren) => {

    const [theme, setTheme] = useState<string>('Default');
    const [status, setStatus] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('Hello Context');
    const [user, setUser] = useState<User | null>(null);
    const [contato, setContato] = useState<string>('');
    const [notify, setNotify] = useState<Array<Record<string, any>> | null>(null);

    return (
        <Context.Provider value={{ theme, setTheme, status, setStatus, message, setMessage, user, setUser, contato, setContato, notify, setNotify }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
