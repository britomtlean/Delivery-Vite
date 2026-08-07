import { useState, useEffect, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';
import { getToken } from '../../Services/Storage';
import type { Product } from '../../Types/Types';


type Prop = {
    render: Dispatch<SetStateAction<string>>;
};

interface ProdutoPedido {
    produtoId: string;
    nome: string;
    quantidade: number;
    valorUnitario: number;
    subtotal: number;
}

interface Pedido {
    id: string;
    dataOriginal: string;
    data: string;
    valorTotal: number;
    status: boolean | null;
    nomeCliente: string;
    contatoCliente: string;
    enderecoCliente: string;
    produtos: ProdutoPedido[];
}

const Produtos = ({ render }: Prop) => {
    // PRODUCTS
    const [produtos, setProdutos] = useState<Array<Product> | null>(null);
    const [top3, setTop3] = useState<Array<Product> | null>(null);
    const [firstProduct, setFirstProduct] = useState<Record<string, any> | null>(null);

    const [busca, setBusca] = useState<string>('');
    const [produtosList, setProdutosList] = useState<Array<Product> | null>(null);

    useEffect(() => {

        const getProducts = async () => {

            const token = await getToken();
            const res = await fetch('https://dotnet-webapi-base-production.up.railway.app/api/Produtos', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            });

            const data = await res.json();

            maisVendidos(data);
            setProdutos(() => {
                console.log(data);
                return data;
            });
            setProdutosList(data);
        };

        getProducts();
    }, []);

    useEffect(() => {
        if (!produtos) return;

        setFirstProduct(top3?.find((arr, index) => index == 0)!);
    }, [top3]);

    const nextProduct = () => {
        if (!top3) return;

        const first: Product = top3[0];
        const fila: Array<Product> = top3.filter((array, index) => index != 0);
        const newArray: Array<Product> = [...fila, first];

        setTop3(newArray);
    };

    const returnProduct = () => {
        if (!top3) return;

        const last: Product = top3[produtos?.length! - 1];
        const fila: Array<Product> = top3?.filter((array, index) => index != produtos?.length! - 1);
        const newArray: Array<Product> = [last, ...fila];

        setTop3(newArray);
    };

    async function maisVendidos(dataProduto: Product[]): Promise<void> {
        try {
            const token = await getToken();
            const res = await fetch('https://dotnet-webapi-base-production.up.railway.app/api/pedido', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Erro HTTP: ${res.status}`);
            }

            const data = await res.json();

            ///////////////////

            const top3MaisVendidos: Array<Product> = Object.values(
                //Converte em array
                data
                    .flatMap((pedido: any) => pedido.produtos) //Transforma pedido.produtos em um único array

                    .reduce((acc: any, produto: any) => {
                        // Cria um index para cada produto com base no Id e retorna como objeto
                        if (!acc[produto.produtoId]) {
                            acc[produto.produtoId] = {
                                produtoId: produto.produtoId,
                                nome: produto.nome,
                                imagem: dataProduto?.find((array) => array.id == produto.produtoId)?.imagem,
                                descricao: dataProduto?.find((array) => array.id == produto.produtoId)?.descricao,
                                valor: dataProduto?.find((array) => array.id == produto.produtoId)?.valor,
                                quantidadeVendida: 0,
                            };
                        }

                        //Se o index existir incrementa a quantidade no index correspondente
                        acc[produto.produtoId].quantidadeVendida += produto.quantidade;

                        return acc;
                    }, {})
            )

                //Ordena o array
                .sort((a: any, b: any) => b.quantidadeVendida - a.quantidadeVendida)

                //Retornar os 3 primeiros itens
                .slice(0, 3) as Array<Product>;

            const produtosMaisVendidos = produtos?.filter((produto) =>
                top3MaisVendidos.some((item) => item.nome === produto.nome)
            ) as Array<Record<string, any>>;

            console.log('Mais vendidos:');
            console.log(top3MaisVendidos);
            setTop3(top3MaisVendidos);

            //////////////////
        } catch (err) {
            console.error(err);
        }
    }

    //////////////////////////// SEARCH //////////////////////////////////

    const dadosFiltrados = produtosList?.filter((item) => {
        const texto = busca.toLowerCase();
        return item.nome.toLowerCase().includes(texto) || String(item.valor).includes(texto);
    });

    ////////////////////////////////////////////////////////////////////

    return (
        <div
            className="flex flex-col justify-start items-center overflow-y-scroll w-full h-full pt-10 pb-30 border-t-2 border-white gap-y-5 gap-x-8
                    md:grid md:overflow-hidden md:py-5 grid-cols-7 grid-rows-5 "
        >
            <div
                className="w-full h-3/5 md:h-full flex justify-center items-center flex-wrap col-span-3 row-span-2
                font-bold text-center
                shadow-xl/30 rounded-3xl"
            >
                <button className="h-full bg-black-300/50!" onClick={returnProduct}>
                    <FaAngleLeft className="size-6" />
                </button>

                <div className="flex-10 flex flex-col justify-center items-center h-full bg-gray-200/10 p-4">
                    <h1
                        className="text-[1rem]! text-black! mb-2.5 font-bold
                    lg:text-[1.7rem]!"
                    >
                        Mais vendidos
                    </h1>

                    {firstProduct == null ? (
                        'Carregando...'
                    ) : (
                        <>
                            <img
                                className="flex-5 min-w-3/4 max-h-[50%] rounded-3xl lg:mb-4"
                                src={`${firstProduct.imagem}`}
                                alt=""
                            />
                            <h2 className="flex-1 text-black! text-[1rem]! font-extrabold text-center">
                                {firstProduct.nome}
                            </h2>
                            <h2 className="flex-1 text-black! text-[1.2rem]! font-medium">
                                {firstProduct.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h2>
                        </>
                    )}
                </div>

                <button className="h-full bg-black-300/50!" onClick={nextProduct}>
                    <FaAngleRight className="size-6" />
                </button>
            </div>

            <div
                className="p-5 md:p-7 w-full h-full
              col-span-4 row-span-3 flex flex-col justify-start items-center
              font-bold text-center
              bg-radial from-blue-400/20 to-blue-500/20
              shadow-xl/30 border border-white rounded-3xl"
            >
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="my-4 px-4 py-2 rounded w-full text-[16px] font-normal shadow bg-sky-200"
                />
                <ul className="w-full grid grid-cols-4 py-2 bg-slate-200 rounded-t-lg px-8">
                    <li>Nome</li>
                    <li>Valor</li>
                    <li>Estoque</li>
                    <li>Dados</li>
                </ul>
                <div className="w-full overflow-y-scroll rounded-b-lg">
                    {dadosFiltrados?.map((item) => (
                        <ul
                            className="grid grid-rows-2 grid-cols-4 px-10
                          w-full py-3 bg-blue-200 border-b border-white
                          font-medium font-sans hover:bg-white "
                            key={item.id}
                        >
                            <>
                                <li>{item?.nome}</li>
                                <li>{item?.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                                <li>{item.estoque}</li>
                                <Link to={`/produto/${item.id}`} target="_blank" className="hover:cursor-pointer">
                                    Editar
                                </Link>
                            </>
                        </ul>
                    ))}
                </div>
            </div>

            <button className="hidden md:block h-4/6 w-7/8 text-1xl col-span-2 bg-blue-500! hidden!">
                Compartilhar
            </button>

            <div
                className="p-4 w-full h-full hidden md:flex flex-col justify-center items-center gap-2 col-span-3 col-start-1 row-start-3 shadow-xl/30
                bg-radial from-blue-400/20 to-blue-500/20 border border-white rounded-3xl"
            >
                <h1 className="text-3xl! text-black! font-sans">Total de vendas:</h1>

                <div className="text-1xl bg-white/30 w-full h-full text-center rounded-3xl flex justify-center items-center">
                    <span className="text-red-600 font-extrabold font-sans text-2xl">
                        {firstProduct?.quantidadeVendida || 0} Produtos vendidos
                    </span>
                </div>
            </div>

            <button
                className="h-4/6 w-full col-span-7 col-start-1 row-start-4 bg-blue-500! py-4! shadow-xl/30 rounded-3xl text-white"
                onClick={() => render('new')}
            >
                Novo Produto
            </button>
        </div>
    );
};

export default Produtos;
