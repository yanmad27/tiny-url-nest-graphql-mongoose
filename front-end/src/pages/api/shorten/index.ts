import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getList, writeNew } from 'src/services/google-apis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userAgent = req.headers['user-agent'];

    if (req.method === 'GET') {
      const result = await getList();
      const filtered = result.filter((item: any) => item[1] === userAgent);
      console.log('LOG ~ filtered:', filtered);
      return res.status(200).json(filtered);
    } else if (req.method === 'POST') {
      const url = req.body.url;
      console.log('LOG ~ userAgent:', userAgent);
      console.log('LOG ~ request shorten url:', url);

      const regex =
        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
      if (!regex.test(url)) res.status(400).json({ error: 'Invalid URL' });

      const result = await getList();
      const data = result.find(
        (item: any) => item[1] === userAgent && item[2] === url
      );

      if (data) {
        console.log('LOG ~ exist shorten URL: ', data[3]);
        res.status(200).json({ shortenUrl: data[3] });
      } else {
        const uuid = randomUUID();
        const shortenUrl = '/' + uuid.slice(0, 5);

        await writeNew([uuid, userAgent, url, shortenUrl]);
        console.log('LOG ~ create new shorten URL: ', shortenUrl);
        res.status(200).json({ shortenUrl });
      }
    }
  } catch (err) {
    console.error('ERR ~ ', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
