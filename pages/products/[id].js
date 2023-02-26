import Page from '@/components/Page';
import { ApiError } from '@/lib/api';
import { getProduct, getProducts } from '@/lib/products';
import Head from 'next/head';
import Image from 'next/image';
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
      <Page title={product.title}>
        <div className=" flex flex-col lg:flex-row">
          <Image src={product.imageUrl} width={600} height={400} alt="" />
          <div className="lg:ml-4">
            <p className="text-sm">{product.description}</p>
            <p className="text-lg font-bold mt-2">{product.price}</p>
          </div>
        </div>
      </Page>
    </>
  );
}
