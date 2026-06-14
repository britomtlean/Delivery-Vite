import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//ROUTER
import { createBrowserRouter, RouterProvider } from 'react-router';
//CSS
import './index.css';
//CONTEXT
import { ContextProvider } from './context/ContextProvider';

//COMPONENTS
import Login from './Login.tsx'
import Home from './components/Delivery/Home.tsx';
import Sucesso from './components/Delivery/Payment/Sucesso.tsx';
import Aguarde from './components/Delivery/Payment/Aguarde.tsx';
import ProdutosDetalhes from './components/Delivery/ProdutosDetalhes.tsx';



let router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login/',
        element: <Login />,
    },
    {
        path: '/sucesso/',
        element: <Sucesso />,
    },
    {
        path: '/produto/:id',
        element: <ProdutosDetalhes />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </StrictMode>
);
