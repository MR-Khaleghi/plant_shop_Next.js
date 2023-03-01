import { fetchJson } from '@/lib/api';
import { CMS_URL } from '..';
// const CMS_URL = process.env.CMS_URL;

async function userHandler(req, res) {
  const jwt = req.cookies.jwt;
  //   console.log(jwt);

  if (!jwt) {
    res.status(401).send('unauthorized');
    return;
  }
  try {
    const user = await fetchJson(`${CMS_URL}/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (error) {
    res.status(401).send('unauthorized_2');
  }
}

export default userHandler;
