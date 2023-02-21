// option 2b : similar to option 2a fetch products on the client side but from an internal API route that'son the same Next.js app so the browser doesnt need to access to the backend api directly. this requires writing an api handler that runs on next.js server and fetches data from the backend cms possibly transforming the data on the process.

import { getProducts } from '@/lib/products';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/products');
      const products = await response.json();
      setProducts(products);
    })();
  }, []);

  console.log(products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main>
        <h1>Next Shop</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
