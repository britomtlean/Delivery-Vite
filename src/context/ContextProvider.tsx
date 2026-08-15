import { useState, createContext, useEffect } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'; //TIPAGEM PROP
import type { User } from '../Types/Types';
import { HubConnectionBuilder, HubConnectionState, type HubConnection } from '@microsoft/signalr';

export type ContextType = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    login: User | null;
    setLogin: React.Dispatch<React.SetStateAction<User | null>>;
    contato: string;
    setContato: React.Dispatch<React.SetStateAction<string>>;
    notify: Array<Record<string, any>> | null;
    setNotify: React.Dispatch<SetStateAction<Array<Record<string, any>> | null>>;
    connection: HubConnection | null;
    setConnection: React.Dispatch<SetStateAction<HubConnection | null>>;
    connectionStatus: boolean | null;
    setConnectionStatus: React.Dispatch<SetStateAction<boolean | null>>;
    online: boolean;
    setOnline: React.Dispatch<SetStateAction<boolean>>;
};


export const Context: React.Context<ContextType | null> = createContext<ContextType | null>(null);

/************************************************************************************** */

export const ContextProvider = ({ children }: PropsWithChildren) => {



    const [theme, setTheme] = useState<string>('Default');
    const [status, setStatus] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('Hello Context');
    const [contato, setContato] = useState<string>('');
    const [notify, setNotify] = useState<Array<Record<string, any>> | null>(null);
    const [login, setLogin] = useState<User | null>(null);
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [state, setStaate] = useState(connection?.state);
    const [connectionStatus, setConnectionStatus] = useState<boolean |null>(null);
    const [online, setOnline] = useState<boolean>(false);

    useEffect(() => {

            if(connection) return

            console.log("Conexão declarada.");

            const newConnection = new HubConnectionBuilder()
                .withUrl('https://dotnet-webapi-base-production.up.railway.app/chat')
                .withAutomaticReconnect()
                .build();

            newConnection.serverTimeoutInMilliseconds = 30000;
            newConnection.keepAliveIntervalInMilliseconds = 5000;

            newConnection.onclose(async (error) => {
                console.error('🔴 DESCONNECTED:', error);

                if (newConnection.state !== 'Disconnected') {
                    await newConnection.stop();
                }

                setConnectionStatus(false);
                setOnline(false);
            });

            newConnection.onreconnecting((error) => {
                console.warn('🟡 RECONNECTING:', error);

                setConnectionStatus(null);
                setOnline(false);
            });

            newConnection.onreconnected(async (connectionId) => {
                console.log('🟢 RECONNECTED:', connectionId);

                setConnectionStatus((prev: any) => {
                    return true;
                });
            });

            newConnection.on('Erro', async (mensagem: string) => {
                console.error('❌ Servidor:', mensagem);
                setOnline(false);
            });

            newConnection.on('Conectado', (msg: string) => {
                console.log(msg);
                setOnline(true);
            });

            setConnection(newConnection);

    },[])

    return (
        <Context.Provider
            value={{
                theme,
                setTheme,
                status,
                setStatus,
                message,
                setMessage,
                login,
                setLogin,
                contato,
                setContato,
                notify,
                setNotify,
                connection,
                setConnection,
                connectionStatus,
                setConnectionStatus,
                online,
                setOnline
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
