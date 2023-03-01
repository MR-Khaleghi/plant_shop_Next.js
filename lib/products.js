import { CMS_SERVER } from '@/pages';
import { fetchJson } from './api';

const CMS_URL = 'https://strapi-cms-gtl8.onrender.com';
// const CMS_URL = 'http://localhost:1337';
export async function getProduct(id) {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  // console.log(response);

  return stripProduct(product);
}

export async function getProducts() {
  const products = await fetchJson(`${CMS_URL}/products`);
  // console.log(products);
  console.log(CMS_URL);
  return products.map(stripProduct);
}

function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: '$' + product.price.toFixed(2),
    imageUrl: CMS_URL + product.picture.url,
  };
}
