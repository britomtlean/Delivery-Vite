import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../../types/Product';

const ProdutosDetalhes = () => {

    //ROUTER
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // PRODUCTS
    const [produto, setProduto] = useState<Product | null>(null);

    //DISPLAY
    const [display, setDisplay] = useState<boolean>(false);

    //REFS
    const nomeRef = useRef<HTMLInputElement>(null);
    const valorRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch('https://dotnet-webapi-base-production.up.railway.app/api/Produtos');
            const data = await res.json();
            const produtoFiltred = data.find((array: Product) => array.id == id);
            setProduto(() => {
                console.log(produtoFiltred);
                return produtoFiltred;
            });
        };

        getProducts();
    }, []);

    const displayFunction = () => {

        if(!nomeRef.current || !valorRef.current || !statusRef.current) return

        nomeRef.current.disabled = false;
        valorRef.current.disabled = false;

        nomeRef.current.style.border = '2px solid cyan';
        valorRef.current.style.border = '2px solid cyan';

        nomeRef.current.style.outline = 'none';
        valorRef.current.style.outline = 'none';

        nomeRef.current.focus()
    }

    const handleDelete = async () => {

        const confirm = prompt("Digite 'CONFIRMO' para continuar")

        if(confirm != 'CONFIRMO') return

        const res = await fetch(`https://dotnet-webapi-base-production.up.railway.app/api/Produtos/delete/${id}`, {
            method: 'DELETE',
        });

        const data = await res.json();

        if(!res.ok)
        {throw Error(data)}

        alert('Produto exluído');
        navigate('/');
    }

    return (
        <div
            className="w-5/6 max-w-[1380px] h-screen
                        flex justify-center items-start"
        >
            <div
                className={`flex justify-start items-center flex-col
                            h-3/4  py-15 mt-8 rounded-lg gap-4 border border-white transition-opacity ease-out duration-1000
                            ${display ? 'flex-3 opacity-70' : 'w-1/2'}`}
            >
                <img
                    className="flex-5 max-w-4/5 max-h-[280px] rounded-3xl"
                    src={`${produto?.imagem}`}
                    alt=""
                />
                <h2 className="font-bold text-2xl">{produto?.nome}</h2>
                <h2 className="font-bold text-2xl">{produto?.descricao}</h2>
                <h2 className="font-bold text-2xl">
                    {produto?.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </h2>
                <h2 className="font-bold text-2xl">{produto?.categoria}</h2>
                <button
                    className="w-3/5 h-1/8 bg-cyan-600!"
                    onClick={() => {
                        displayFunction();
                        setDisplay(true);
                    }}
                >
                    Editar
                </button>
                <button onClick={() => {handleDelete()}} className="w-3/5 h-1/8 bg-red-600!">Excluir</button>
            </div>

            <div
                className={`flex justify-start items-center flex-col
                            h-3/4 flex-1 py-12 mt-8 rounded-lg gap-4 border transition-all ease-out duration-1000

                            ${display ? 'flex flex-5 shadow-xl/30 border-white shadow-[0_0_80px_2px_rgba(100,197,223,0.5)] inset-shadow-sm border-3' : 'hidden boder-1'}`}
            >
                <h1 className="font-bold text-black opacity-100 text-5xl!">Edição</h1>
                <form
                    className="h-full flex-2
              flex flex-col gap-3 justify-start items-center"
                    onSubmit={(e) => {
                        '';
                    }}
                >
                    <input
                        disabled
                        type="text"
                        name="nome"
                        ref={nomeRef}
                        placeholder={produto?.nome}
                        className={`bg-gray-100 p-4 w-full rounded-lg text-center ${display ? 'opacity-100' : 'opacity-50'}`}
                        onChange={(e) => {
                            '';
                        }}
                    />

                    <input
                        disabled
                        type="text"
                        name="descricao"
                        id=""
                        placeholder={produto?.descricao}
                        className="bg-gray-200 p-4 w-full rounded-lg text-center opacity-50"
                        onChange={(e) => {
                            '';
                        }}
                    />

                    <select
                        defaultValue={produto?.categoria || 'Indefinido'}
                        disabled
                        onChange={(e) => {}}
                        className="bg-gray-200 p-4 w-full rounded-lg text-center opacity-50"
                        name=""
                    >
                        <option>{produto?.categoria || 'Indefinido'}</option>
                    </select>

                    <input
                        disabled
                        type="text"
                        name="valor"
                        ref={valorRef}
                        placeholder={produto?.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        className={`bg-gray-100 p-4 w-full rounded-lg text-center ${display ? 'opacity-100' : 'opacity-50'}`}
                        onChange={(e) => {
                            '';
                        }}
                    />

                    <input
                        disabled
                        type="text"
                        name="estoque"
                        id=""
                        placeholder={produto?.estoque.toString()}
                        className="bg-gray-200 p-4 w-full rounded-lg text-center opacity-50"
                        onChange={(e) => {
                            '';
                        }}
                    />

                    <label className={`w-full flex gap-2 justify-center text-center opacity-50`} htmlFor="">
                        <span>Disponibilidade:</span>
                        <input type="checkbox" ref={statusRef} checked={produto?.disponibilidade} />
                    </label>

                    <div className={`flex gap-4 justify-center ${display ? 'opacity-100' : 'opacity-50'}`}>
                        <label>
                            <input disabled type="radio" name="opcao" value="0" defaultChecked={true} />
                            Disponível
                        </label>

                        <label>
                            <input disabled type="radio" name="opcao" value="1" />
                            Indisponível
                        </label>
                    </div>

                    <input
                        disabled
                        className="bg-blue-400 p-4 w-full rounded-lg text-center opacity-50"
                        type="file"
                        accept="image/*"
                    />

                    <button
                        disabled
                        className="bg-cyan-700! px-4 py-5! w-full rounded-lg text-center opacity-50"
                        type="submit"
                    >
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProdutosDetalhes;
