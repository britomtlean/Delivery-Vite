import { useState, useContext, useEffect, type JSX } from 'react';

import Pendentes from './Pendentes';
import Concluido from './Concluidos';
import Carrosel from './Produtos';
import Delivery from './Delivery';
import CriarProduto from './CriarProduto';
import { Context } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/All/Loading';
import { deleteToken } from '../../Services/Storage';

const Home = () => {
    //CONTEXT
    const { user, setUser } = useContext(Context)!;

    //ROUTER
    const navigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            setTimeout(() => {
                navigate('/auth');
            }, 2000);
        }
    }, [user]);

    //NAVEGAÇÃO
    const [section, setSection] = useState<string>('live');

    const renderComponente = (): JSX.Element => {
        switch (section) {
            case 'live':
                return <Delivery />;
            case 'pendentes':
                return <Pendentes />;
            case 'confirmados':
                return <Concluido />;
            case 'produtos':
                return <Carrosel render={setSection} />;
            case 'new':
                return <CriarProduto />;
            default:
                return <Delivery />;
        }
    };

    return (
        <>
            {user ? (
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

                            <li
                                onClick={() => setSection('estoque')}
                                className="hidden md:block ml-[30px] list-none cursor-pointer text-[1.3rem] font-bold! text-[#ccc] transition-all hover:border-b-4  hover:border-red-500 hover:text-red-500"
                            >
                                Estoque
                            </li>
                        </ul>

                        <div className="flex h-full gap-4 rounded-2xl justify-center items-center">
                            <h3 className="text-white font-bold text-[0.8rem] hidden">{user?.nome}</h3>
                            <button
                                className=""
                                onClick={() => {
                                    setUser((prev) => {
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
                        className="h-full w-full lg:w-[90%]
                    flex justify-center items-start pt-"
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
