//option 1b : similar to option 1a : with thw additional revalidate option which results in incremental static generation which means we get the benefits of statically genereated pagr but the pagse will regenerated periodically which means if the data changes in the backend the page also will be up to date.
// the only downside is that this approach is not compatible with exporting the website statically using the next export command
import Page from '@/components/Page';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

export default function Home({ products }) {
  // console.log(products);
  return (
    <>
      <Page title="Indoor Plants">
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
