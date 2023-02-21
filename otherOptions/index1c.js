// option 1c : data fetches on the server side (using getServerSideProps) but at runtime that is on evry request. server generates the html page dynamically on every request like php and ruby on rails

import { getProducts } from '@/lib/products';
import Head from 'next/head';

export async function getServerSideProps() {
  const products = await getProducts();
  return { props: { products } };
}

export default function Home({ products }) {
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
