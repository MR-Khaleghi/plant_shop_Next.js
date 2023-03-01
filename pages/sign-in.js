import Button from '@/components/Button';
import Field from '@/components/Field';
import InputForm from '@/components/input';
import Page from '@/components/Page';
import { useSignIn } from '@/hooks/user';
import { useRouter } from 'next/router';
import { useState } from 'react';

function SingInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInError, signInLoading } = useSignIn();

  const handlesubmit = async (event) => {
    event.preventDefault();
    const valid = await signIn(email, password);
    if (valid) {
      router.push('/');
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
        {signInError && <p className="text-red-700">Invalid Credentials</p>}
        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
}

export default SingInPage;
