//option 1b : similar to option 1a : with thw additional revalidate option which results in incremental static generation which means we get the benefits of statically genereated pagr but the pagse will regenerated periodically which means if the data changes in the backend the page also will be up to date.
// the only downside is that this approach is not compatible with exporting the website statically using the next export command
import Page from '@/components/Page';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products';

const dev = process.env.NODE_ENV !== 'production';

export const server = dev
  ? 'http://localhost:3000'
  : 'https://plant-shop-next-js.vercel.app';

console.log(server);

export const CMS_SERVER = 'https://strapi-cms-gtl8.onrender.com';
// export const CMS_SERVER = 'http://localhost:1337';

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

export default function Home({ products }) {
  console.log(products);
  return (
    <>
      <Page title="Indoor Plants">
        <ul className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
