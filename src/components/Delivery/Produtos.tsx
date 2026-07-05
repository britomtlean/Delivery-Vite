import { useState, useEffect, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

type Produto = {
    id?: string;
    nome: string;
    descricao: string;
    estoque: number;
    valor: number;
    subtotal?: number;
    categoria: string;
    imagem: string;
};

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

const Produtos = ({render} : Prop) => {

    // PRODUCTS
    const [produtos, setProdutos] = useState<Array<Produto> | null>(null);
    const [top3, setTop3] = useState<Array<Produto> | null>(null);
    const [firstProduct, setFirstProduct] = useState<Record<string, any> | null>(null);


    const [busca, setBusca] = useState<string>('');
    const [produtosList, setProdutosList] = useState<Array<Produto> | null>(null);


    useEffect(() => {

      const getProducts = async () =>
        {
          const res = await fetch('https://dotnet-webapi-base-production.up.railway.app/api/Produtos');
          const data = await res.json();

          maisVendidos(data);
          setProdutos(() =>{console.log(data); return data})
          setProdutosList(data);
        }

      getProducts();
    },[])

    useEffect(() => {
      if (!produtos) return;

      setFirstProduct(top3?.find((arr, index) => index == 0 )!)


    }, [top3]);

    const nextProduct = () => {
      if(!top3) return

      const first: Produto = top3[0];
      const fila: Array<Produto> = top3.filter((array, index) => index != 0);
      const newArray: Array<Produto> = [...fila, first];

      setTop3(newArray);
    };

    const returnProduct = () => {
      if (!top3) return;

      const last: Produto = top3[produtos?.length! - 1];
      const fila: Array<Produto> = top3?.filter((array, index) => index != produtos?.length! - 1);
      const newArray: Array<Produto> = [last, ...fila];

      setTop3(newArray);
    };

    async function maisVendidos(dataProduto: Produto[]): Promise<void> {
        try {
            const res = await fetch('https://dotnet-webapi-base-production.up.railway.app/api/pedido', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(`Erro HTTP: ${res.status}`);
            }

            const data = await res.json();

            ///////////////////

            const top3MaisVendidos: Array<Produto> = Object.values(
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
                                descricao: dataProduto?.find((array) => array.id == produto.produtoId)
                                    ?.descricao,
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
                .slice(0, 3) as Array<Produto>;

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
          className="flex flex-col justify-start items-center overflow-y-scroll w-full h-full pt-10 pb-30 border-t-2 border-white gap-y-5 gap-x-1 px-2
                    md:grid md:overflow-hidden md:py-5 md:px-10 grid-cols-5 grid-rows-5"
      >
          <div
              className="w-full h-3/5 md:h-full flex justify-center items-center flex-wrap col-span-2 row-span-2
          shadow-xl/30 border-cyan-400 shadow-[0_0_80px_2px_rgba(100,197,223,0.5)] inset-shadow-sm border
          md:w-7/8"
          >
              <button className="flex-1! h-full border-l-0! rounded-r-[0]! bg-black-300/50!" onClick={returnProduct}>
                  <FaAngleLeft className="xl:text-3xl" />
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

              <button className="flex-1 h-full bg-black-300/50! border-r-0! rounded-l-[0]!" onClick={nextProduct}>
                  <FaAngleRight className="xl:text-3xl" />
              </button>
          </div>

          <div
              className="p-5 md:p-10 w-full h-full
              col-span-3 row-span-3 flex flex-col justify-start items-center
              font-bold text-center
              rounded bg-radial from-blue-400/30 to-blue-500/30
              shadow-xl/30 border-cyan-400 shadow-[0_0_80px_2px_rgba(100,197,223,0.5)] inset-shadow-sm border"
          >
              <input
                  type="text"
                  placeholder="Buscar..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="my-4 px-4 py-2 rounded w-full text-[16px] font-normal shadow bg-sky-200"
              />
              <ul className="w-full grid grid-cols-4 py-2 bg-slate-300">
                  <li>Nome</li>
                  <li>Valor</li>
                  <li>Estoque</li>
                  <li>Dados</li>
              </ul>
              <div className="w-full overflow-y-scroll">
                  {dadosFiltrados?.map((item) => (
                      <ul
                          className="grid grid-rows-2 grid-cols-4
                          w-full py-3 bg-blue-300 border-b border-white
                          font-light hover:bg-white "
                          key={item.id}
                      >
                          <>
                              <li>{item.nome}</li>
                              <li>{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                              <li>{item.estoque}</li>
                              <Link to={`/produto/${item.id}`} target="_blank" className="hover:cursor-pointer">
                                  Detalhes
                              </Link>
                          </>
                      </ul>
                  ))}
              </div>
          </div>

          <button className="hidden md:block h-4/6 w-7/8 text-1xl col-span-2 bg-blue-500!">Compartilhar</button>

          <div className="p-4 bg-slate-600/10 w-7/8 h-full hidden md:flex flex-col  justify-center items-center col-span-2 col-start-1 row-start-3 rounded">
              <h1 className="text-2xl! text-black! font-bold">Total de vendas:</h1>
              <h2 className="text-1xl bg-white/30 w-full h-full text-center rounded-1xl flex justify-center items-center">
                  <span className="text-red-500 font-extrabold">
                      {firstProduct?.quantidadeVendida} produtos vendidos
                  </span>
              </h2>
          </div>

          <button
              className="h-4/6 w-full col-span-3 col-start-3 row-start-4 bg-blue-500! py-4!"
              onClick={() => render('new')}
          >
              Novo Produto
          </button>
      </div>
  );
}

export default Produtos
