import Page from '@/components/Page';
import { useCart } from '@/hooks/user';
import { fetchJson } from '@/lib/api';
import React from 'react';
import { useQuery } from 'react-query';

function formatCart(cartItems) {
  let total = 0.0;
  const items = [];
  for (const cartItem of cartItems) {
    const itemTotal = cartItem.product.price * cartItem.quantity;
    total += itemTotal;
    items.push({ ...cartItem, total: itemTotal });
  }
  return { items, total };
}

function CartTable({ cartItems }) {
  const cart = formatCart(cartItems);
  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="px-4 py-2">{cartItem.product.title}</td>
            <td className="px-4 py-2 text-center">
              ${cartItem.product.price.toFixed(2)}
            </td>
            <td className="px-4 py-2 text-center">{cartItem.quantity}</td>
            <td className="px-4 py-2 text-center">
              ${cartItem.total.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className="px-4 py-2 text-left">Total</th>
          <th></th>
          <th></th>
          <th>${cart.total.toFixed(2)}</th>
        </tr>
      </tfoot>
    </table>
  );
}

function Cart() {
  //   const cartItems = useCart();
  const query = useQuery('cart', () => fetchJson('/api/cart'));
  const cartItems = query.data;
  console.log(cartItems);
  return (
    <Page title="Cart">{cartItems && <CartTable cartItems={cartItems} />}</Page>
  );
}

export default Cart;
