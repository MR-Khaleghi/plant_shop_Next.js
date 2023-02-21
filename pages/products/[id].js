import { ApiError } from '@/lib/api';
import { getProduct, getProducts } from '@/lib/products';
import Head from 'next/head';
import React from 'react';

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProduct(id);
    return {
      props: { product },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { notFound: true };
    }
    throw error;
  }
}

export default function ProductPage({ product }) {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="p-6">
        <h1 className="py-6">{product.title}</h1>
        <p>{product.description}</p>
      </main>
    </>
  );
}
