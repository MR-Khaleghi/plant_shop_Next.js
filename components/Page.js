import Head from 'next/head';
import React from 'react';

function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
      </Head>
      <main className="p-6">
        <h1 className="py-6 text-2xl font-bold">{title}</h1>
        {children}
      </main>
    </>
  );
}

export default Page;
