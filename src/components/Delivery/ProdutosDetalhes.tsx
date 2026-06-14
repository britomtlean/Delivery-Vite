import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

type Produto = {
    produtoId: string;
    nome: string;
    descricao: string;
    quantidade: number;
    valor: number;
    subtotal: number;
    categoria: string;
    imagem: string;
    id?: string
};


const ProdutosDetalhes = () => {

    const { id } = useParams<{ id: string }>();

        // PRODUCTS
        const [produto, setProduto] = useState<Produto | null>(null);


        useEffect(() => {

          const getProducts = async () =>
            {
              const res = await fetch('http://localhost:5157/api/Produtos');
              const data = await res.json();
              const produtoFiltred = data.find((array: Produto) => array.id == id)
              setProduto(() =>{console.log(produtoFiltred); return produtoFiltred;})
            }

            getProducts()
        },[])

  return (
      <div
          className="flex justify-start items-center flex-col
      h-3/4 w-1/4 py-20 mt-8 rounded gap-4 border-2 border-white"
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
  );
}

export default ProdutosDetalhes
