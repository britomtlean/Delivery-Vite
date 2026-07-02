import { useState, useContext, useEffect} from 'react';

import Pendentes from './Pendentes';
import Concluido from './Concluidos';
import Carrosel from './Produtos';
import Delivery from './Delivery';
import CriarProduto from './CriarProduto';
import { Context } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/All/Loading';
import { deleteToken } from '../../services/Storage';

const Home = () => {

    //CONTEXT
    const { user, setUser } = useContext(Context)!;

    //ROUTER
    const navigate = useNavigate();

    useEffect(() => {
        if (user == null)
            setTimeout(() => {navigate('/auth');}, 2000);
    },[user])


    //NAVEGAÇÃO
    const [section, setSection] = useState<string>('live');

    const renderComponente = () => {
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
                    <header className="w-full h-[10vh] py-4 px-[20%] flex justify-center lg:justify-between items-center mb-4 bg-[rgb(48,62,83)]">
                        <h1 className="hidden lg:block text-4xl! font-bold text-[#ccc] font-bold">Menu</h1>

                        <ul className="hidden lg:flex items-center">
                            <li
                                onClick={() => setSection('live')}
                                className="ml-[30px] list-none cursor-pointer text-[1.3rem] font-bold! text-[#ccc] transition-all hover:border-b hover:border-red-500 hover:text-red-500"
                            >
                                Live
                            </li>

                            <li
                                onClick={() => setSection('pendentes')}
                                className="ml-[30px] list-none cursor-pointer text-[1.3rem] font-bold! text-[#ccc] transition-all hover:border-b  hover:border-red-500 hover:text-red-500"
                            >
                                Pendentes
                            </li>

                            <li
                                onClick={() => setSection('confirmados')}
                                className="ml-[30px] list-none cursor-pointer text-[1.3rem] font-bold! text-[#ccc] transition-all hover:border-b  hover:border-red-500 hover:text-red-500"
                            >
                                Confirmados
                            </li>

                            <li
                                onClick={() => setSection('produtos')}
                                className="ml-[30px] list-none cursor-pointer text-[1.3rem] font-bold! text-[#ccc] transition-all hover:border-b  hover:border-red-500 hover:text-red-500"
                            >
                                Produtos
                            </li>
                        </ul>

                        <div className="flex flex-col gap-1 p-2 rounded-2xl">
                            <h3 className="text-white font-bold text-[0.8rem] hidden lg:block">{user?.nome}</h3>
                            <button
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
                        className="h-full w-full max-w-[1280px]
                    flex justify-center items-start pt-4"
                    >
                        {renderComponente()}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};;

export default Home;
