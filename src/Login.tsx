
const Login = () => {
  return (
    <section className=' h-full w-full
    flex flex-col justify-center items-center'>

      <div className=''>
        <h2 className='font-bold text-5xl text-center'>Login</h2>
      </div>

        <form onSubmit={() => {}} className='w-[500px] h-[400px] mx-auto p-[20px] flex gap-5 flex-col border-b-2 justify-center items-center'>
          <div className=" text-center w-full">
            <input type="email" id="email" name="email" placeholder='Email' required className='bg-amber-50 border-2 rounded-lg py-[8px] px-[4px] w-full' />
          </div>

          <div className=" text-center w-full">
            <input type="password" id="senha" name="senha" placeholder='Senha' required className='bg-amber-50 border-2 rounded-lg py-[8px] px-[4px] w-full' />
          </div>

          <div className=" text-center w-full">
            <button className='bg-blue-400 border-2 rounded-lg py-[8px] px-[4px] w-full opacity-85 hover:opacity-100 hover:cursor-pointer font-bold text-[20px]' type="submit">Entrar</button>
          </div>
        </form>

    </section>
  )
}

export default Login
