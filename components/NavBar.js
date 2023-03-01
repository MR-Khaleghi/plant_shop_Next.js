import useSignOut, { useUser } from '@/hooks/user';
import { fetchJson } from '@/lib/api';
import Link from 'next/link';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

function NavBar() {
  const user = useUser();
  const signOut = useSignOut();

  console.log(user);
  return (
    <nav className="px-2 py-1">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role="seperator" className="flex-1" />
        {user ? (
          <>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>{user.name}</li>
            <li>
              <button onClick={signOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
