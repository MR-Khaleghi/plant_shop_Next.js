import Button from '@/components/Button';
import Field from '@/components/Field';
import InputForm from '@/components/input';
import Page from '@/components/Page';
import { fetchJson } from '@/lib/api';
import React, { useState } from 'react';

function SingInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, errorFlag: false });

  const handlesubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, errorFlag: false });
    try {
      const response = await fetchJson('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      setStatus({ loading: false, errorFlag: false });
      console.log(response);
    } catch (error) {
      setStatus({ loading: false, errorFlag: true });
    }
  };

  return (
    <Page title="Sign In">
      <form onSubmit={handlesubmit}>
        <Field label="Email">
          <InputForm
            type="email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password">
          <InputForm
            type="password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {status.errorFlag && (
          <p className="text-red-700">Invalid Credentials</p>
        )}
        {status.loading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
}

export default SingInPage;
