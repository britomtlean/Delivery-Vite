import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../../types/Product';

const ProdutosDetalhes = () => {
    const { id } = useParams<{ id: string }>();

    // PRODUCTS
    const [produto, setProduto] = useState<Product | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch('http://localhost:5157/api/Produtos');
            const data = await res.json();
            const produtoFiltred = data.find((array: Product) => array.id == id);
            setProduto(() => {
                console.log(produtoFiltred);
                return produtoFiltred;
            });
        };

        getProducts();
    }, []);

    return (
        <div
            className="w-5/6 max-w-[1380px] h-screen
                        flex justify-center items-start"
        >
            <div
                className="flex justify-start items-center flex-col
                            h-3/4 flex-1 py-15 mt-8 rounded-lg gap-4 border border-white"
            >
                <img
                    className="flex-5 max-w-4/5 max-h-[280px] rounded-3xl"
                    src={`http://localhost:5157/images/${produto?.imagem}`}
                    alt=""
                />
                <h2 className="font-bold text-2xl">{produto?.nome}</h2>
                <h2 className="font-bold text-2xl">{produto?.descricao}</h2>
                <h2 className="font-bold text-2xl">
                    {produto?.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </h2>
                <h2 className="font-bold text-2xl">{produto?.categoria}</h2>
                <button className="w-3/5 h-1/8 bg-cyan-600!">Editar</button>
                <button className="w-3/5 h-1/8 bg-red-600!">Excluir</button>
            </div>

            <div
                className="flex justify-start items-center flex-col
                            h-3/4 flex-1 py-15 mt-8 rounded-lg gap-4 border border-white"
            >
                <h1 className='font-bold text-black opacity-50 text-5xl!'>Edição</h1>
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
                        id=""
                        placeholder={produto?.nome}
                        className="bg-gray-200 p-4 w-full rounded-lg text-center opacity-50"
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
                        id=""
                    >
                        <option>{produto?.categoria || 'Indefinido'}</option>
                    </select>

                    <input
                        disabled
                        type="text"
                        name="valor"
                        id=""
                        placeholder={produto?.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        className="bg-gray-200 p-4 w-full rounded-lg text-center opacity-50"
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

                    <label className='opacity-50'  htmlFor="">Visibilidade</label>
                    <input disabled type="checkbox" checked={produto?.disponibilidade}/>

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
