import { CMS_URL } from '@/pages';
import { fetchJson } from './api';

// const CMS_URL = process.env.CMS_URL;

export async function getProduct(id) {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  // console.log(response);
  // console.log(CMS_URL);

  return stripProduct(product);
}

export async function getProducts() {
  const products = await fetchJson(`${CMS_URL}/products`);
  // console.log(products);
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
