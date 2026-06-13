import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError()
    console.error(error)

  return (

    <div className='h-svh flex flex-col justify-center items-center'>
        <h1 className='font-bold text-[120px]'>Ops!</h1>
        <p className='font-medium text-[50px]'>Página não encontrada :(</p>
    </div>
  )
}

export default ErrorPage