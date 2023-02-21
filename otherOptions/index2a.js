// option 2a: fetch products on the client side from an external API(directly from backend which is CMS). this is a valid approach if we want to fetch fresh data and it's ok to access backend api from browser.

import { getProducts } from '@/lib/products';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(setProducts);
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
