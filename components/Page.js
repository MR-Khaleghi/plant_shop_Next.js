import Head from 'next/head';
import React from 'react';
import NavBar from './NavBar';

function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="p-6">
        <h1 className="py-6 text-2xl font-bold">{title}</h1>
        {children}
      </main>
    </>
  );
}

export default Page;
