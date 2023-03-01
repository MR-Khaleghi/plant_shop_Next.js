import { fetchJson } from '@/lib/api';
import { server } from '@/pages';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import Button from './Button';

function AddToCart({ productId }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const mutation = useMutation(
    async () =>
      await fetchJson(`${server}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      })
  );
  const addClickHandler = async () => {
    await mutation.mutateAsync();
    router.push('/cart');
    // console.log(productId, quantity);
  };

  return (
    <div className="py-2">
      <input
        type="number"
        min="1"
        className="border rounded px-3 mr-2 w-16 text-right"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      {mutation.isLoading ? (
        <p>Loading...</p>
      ) : (
        <Button onClick={addClickHandler}>Add to cart</Button>
      )}
    </div>
  );
}

export default AddToCart;
