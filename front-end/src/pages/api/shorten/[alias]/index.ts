// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getList } from 'src/services/google-apis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') throw new Error('Method not allowed');
    const alias = req.query.alias as string;
    const result = await getList();
    const data = result.find((item: any) => item[3] === '/' + alias);
    const url = data[2];
    if (!url) res.status(404).json({ error: 'Not found' });
    else {
      console.log('LOG ~ url:', url);
      res.status(200).json({ url });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
