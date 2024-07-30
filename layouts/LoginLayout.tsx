import Image from 'next/image';
import React from 'react';
import Logo from '../public/assets/Logo.png';

const LoginLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 bg-green-300 flex flex-col items-center justify-center gap-10 p-8 text-center h-1/3 md:h-auto">
        <div className="flex items-center gap-2">
          <Image unoptimized src={Logo} alt="logo" width="80" height="80" />
          <h1 className="text-left text-3xl md:text-5xl font-bold">
            Star <br /> Protect
          </h1>
        </div>
        <h1 className="text-sm md:text-base">
          A one-stop unified solution to manage your insurances for your
          vehicles.
        </h1>
      </div>
      <main className="w-full md:w-2/3 h-full flex flex-col space-y-4 justify-center items-center bg-[#f3f3f3] p-4">
        {children}
      </main>
    </section>
  );
}

export default LoginLayout