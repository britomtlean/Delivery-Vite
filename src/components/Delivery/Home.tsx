import { useState, useContext, useEffect, type JSX } from 'react';

import Pendentes from './Pendentes';
import Confirmados from './Confirmados';
import Produtos from './Produtos';
import Live from './Live';
import CriarProduto from './CriarProduto';
import Loading from '../../components/All/Loading';

import { Context } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { deleteToken } from '../../Services/Storage';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Home = () => {

    //CONTEXT
    const { login, setLogin, connection, setConnection } = useContext(Context)!;

    //ROUTER
    const navigate = useNavigate();

    useEffect(() => {

        if (login == null) {

            setTimeout(() => {
                navigate('/auth');
            }, 2000);
        }
        else{
            const newConnection = new HubConnectionBuilder()
                .withUrl('https://dotnet-webapi-base-production.up.railway.app/chat')
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        }
    }, [login]);

    //NAVEGAÇÃO
    const [section, setSection] = useState<string>('live');

    const renderComponente = (): JSX.Element => {
        switch (section) {
            case 'live':
                return <Live />;
            case 'pendentes':
                return <Pendentes />;
            case 'confirmados':
                return <Confirmados />;
            case 'produtos':
                return <Produtos render={setSection} />;
            case 'new':
                return <CriarProduto render={setSection}/>;
            default:
                return <Live />;
        }
    };

    return (
        <>
            {login ? (
                <>
                    <header
                        className="w-full h-[10vh] gap-5 py-4 flex justify-center items-center px-[5%] mb-4 bg-[rgb(48,62,83)]
                        lg:px-[20%] xl:justify-between "
                    >
                        <h1 className="hidden 2xl:flex text-4xl! font-bold text-[#ccc] font-bold">Menu</h1>

                        <ul className="flex items-center">
                            <li
                                onClick={() => setSection('live')}
                                className="ml-[30px] list-none cursor-pointer text-[1.3rem] font-bold! text-[#ccc] transition-all hover:border-b-4 hover:border-red-500 hover:text-red-500"
                            >
                                Live
                            </li>

                            <li
                                onClick={() => setSection('pendentes')}
                                className="hidden md:block ml-[30px] list-none cursor-pointer text-[1.3rem] font-bold! text-[#ccc] transition-all hover:border-b-4  hover:border-red-500 hover:text-red-500"
                            >
                                Pendentes
                            </li>

                            <li
                                onClick={() => setSection('confirmados')}
                                className="hidden md:block ml-[30px] list-none cursor-pointer text-[1.3rem] font-bold! text-[#ccc] transition-all hover:border-b-4  hover:border-red-500 hover:text-red-500"
                            >
                                Confirmados
                            </li>

                            <li
                                onClick={() => setSection('produtos')}
                                className="ml-[30px] list-none cursor-pointer text-[1.3rem] font-bold! text-[#ccc] transition-all hover:border-b-4  hover:border-red-500 hover:text-red-500"
                            >
                                Produtos
                            </li>

                        </ul>

                        <div className="flex h-full gap-4 rounded-2xl justify-center items-center">
                            <h3 className="text-white font-bold text-[0.8rem] hidden">{login?.nome}</h3>
                            <button
                                className=""
                                onClick={() => {
                                    setLogin((prev) => {
                                        deleteToken();
                                        return null;
                                    });
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </header>

                    <div
                        className="h-full lg:h-[85vh] w-[95%] lg:w-[90%] 2xl:w-[80%] overflow-y-scroll
                        flex justify-center items-start"
                    >
                        {renderComponente()}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Home;
