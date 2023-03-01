// option 1a : fetch products on the server side (in getStaticProps)
// this way data detched at build time and included in the statically generated page which means the page loads very quickly and will also easily indexable by search engines

import { getProducts } from '@/lib/products';
import Head from 'next/head';

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products } };
}

export default function Home({ products }) {
  // console.log(products);
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
