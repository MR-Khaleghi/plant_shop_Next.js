//option 1b : similar to option 1a  with thw additional revalidate option which results in incremental static generation which means we get the benefits of statically genereated pagr but the pagse will regenerated periodically which means if the data changes in the backend the page also will be up to date.
// the only downside is that this approach is not compatible with exporting the website statically using the next export command
import { getProducts } from '@/lib/products';
import Head from 'next/head';

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products }, revalidate: 60 };
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
