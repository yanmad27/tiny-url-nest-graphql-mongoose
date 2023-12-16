import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
  } catch (err) {
    console.error('ERR ~ ', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
