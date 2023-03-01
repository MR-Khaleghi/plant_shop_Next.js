import { fetchJson } from '@/lib/api';

// const CMS_URL = process.env.CMS_URL;

import React from 'react';
import { CMS_URL } from '..';

function stripCart(cartItem) {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price,
    },
    quantity: cartItem.quantity,
  };
}

async function cartGetHandler(req, res) {
  const jwt = req.cookies.jwt;
  //   console.log(jwt);

  if (!jwt) {
    res.status(401).send('unauthorized');
    return;
  }
  try {
    const cart = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    // console.log(cart);
    res.status(200).json(cart.map(stripCart));
  } catch (error) {
    res.status(401).send('unauthorized_2');
  }
}

async function cartPostHandler(req, res) {
  const jwt = req.cookies.jwt;
  if (!jwt) {
    res.status(401).send('unauthorized');
    return;
  }
  const { productId, quantity } = req.body;
  try {
    const cart = await fetchJson(`${CMS_URL}/cart-items`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productId, quantity }),
    });
    // console.log(cart);
    res.status(200).json({});
  } catch (error) {
    res.status(401).send('unauthorized_2');
  }
}

async function cartHandler(req, res) {
  if (req.method === 'GET') {
    return cartGetHandler(req, res);
  } else if (req.method === 'POST') {
    return cartPostHandler(req, res);
  } else {
    res.status(405).end();
  }
}
export default cartHandler;
