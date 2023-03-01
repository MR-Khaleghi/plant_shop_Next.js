import { fetchJson } from '@/lib/api';
import cookie from 'cookie';
import { CMS_URL } from '..';
// const CMS_URL = process.env.CMS_URL;

async function LoginHandler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('not allowed');
    return;
  }

  //   console.log(req.body.email);
  const { email, password } = req.body;
  try {
    const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password }),
    });
    res
      .status(200)
      .setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', jwt, {
          path: '/api',
          httpOnly: true,
        })
      )
      .json({
        id: user.id,
        name: user.username,
      });
  } catch (error) {
    // console.log(error);
    return res.status(401).send(error);
  }
}
export default LoginHandler;
