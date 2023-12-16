import { CopyOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, QRCode, Spin, message, notification } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './ShortenUrl.module.css';

interface Props {
  [key: string]: any;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ShortenUrl = ({ ...props }: Props) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortenUrl, setShortenUrl] = useState<any>();

  const [listLoading, setListLoading] = useState(false);
  const [shortedList, setShortedList] = useState([]);

  const handleGetShortenList = async () => {
    setListLoading(true);
    fetch('/api/shorten', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status !== 200) throw res;
        return res.json();
      })
      .then((res) => {
        const list = res.reverse();
        setShortedList(list);
      })
      .finally(() => setListLoading(false));
  };

  useEffect(() => {
    handleGetShortenList();
  }, []);

  const handleShortenUrl = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const body: any = { url };
    fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status !== 200) throw res;
        return res.json();
      })
      .then((res) => {
        setUrl('');
        setShortenUrl(res.shortenUrl);
        handleGetShortenList();
        notification.success({
          message: 'Shorten URL Success',
          description:
            'Your shorten URL is ready. You can copy it and share it with your friends.',
        });
      })
      .catch((err) => {
        const status = err.status || 500;
        console.log('LOG ~ handleShortenUrl ~ status:', status);
        let message, description;
        switch (status) {
          case 400:
            message = 'Invalid URL';
            description = 'Ex: https://example.com';
            break;
          default:
            message = 'Something went wrong';
            description = 'Please try again later.';
        }
        notification.error({
          message,
          description,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success({
      content: 'Copy to clipboard success',
    });
  };

  return (
    <div className={styles.container}>
      <Link
        href={'https://rsrm.dev'}
        target='_blank'
        className={styles.pageLink}
      >
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M23.75 39.649C33.0032 37.8938 40 29.764 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 29.764 6.99677 37.8937 16.25 39.649V32.9775C15.7931 32.6762 15.344 32.4043 14.9086 32.1406C13.2801 31.1544 11.8409 30.2828 10.8833 28.4217C10.0342 26.9254 10 22.1875 10 21.25C10 21.25 13.5112 22.4469 16.4045 24.8874C17.8113 26.0741 18.7501 27.8125 18.7501 35V39.9616C19.1634 39.9871 19.5802 40 20 40C20.42 40 20.837 39.9871 21.2505 39.9615V35C21.2505 27.8125 22.1892 26.0741 23.5961 24.8874C26.4894 22.4469 30.0006 21.25 30.0006 21.25C30.0006 22.1875 29.9664 26.9254 29.1173 28.4217C28.1597 30.2828 26.7204 31.1544 25.092 32.1406C24.6563 32.4044 24.2071 32.6765 23.75 32.9779V39.649ZM19.9723 2.51467L19.9723 2.51465L19.9723 2.51463C19.9825 2.50491 19.9876 2.5 19.9872 2.5C25.625 8.75 19.9872 13.75 19.9872 13.75C14.5512 7.69623 19.6579 2.81521 19.9723 2.51467ZM30.0006 10C30.0006 10.9375 29.9664 15.6754 29.1173 17.1717C28.1597 19.0328 26.7204 19.9044 25.092 20.8906C23.8764 21.6268 22.5553 22.4268 21.2505 23.75C21.2505 16.5625 22.1892 14.8241 23.5961 13.6374C26.4894 11.1969 30.0006 10 30.0006 10ZM10.8833 17.1717C10.0342 15.6754 10 10.9375 10 10C10 10 13.5112 11.1969 16.4045 13.6374C17.8113 14.8241 18.7501 16.5625 18.7501 23.75C17.4453 22.4268 16.1242 21.6268 14.9086 20.8906C13.2801 19.9044 11.8409 19.0328 10.8833 17.1717Z'
            fill='#00AFF4'
          />
        </svg>
        <h1>rsrm.dev</h1>
      </Link>
      <h2>Shorten URL</h2>
      <form onSubmit={handleShortenUrl} className={styles.form}>
        <Input
          value={url}
          placeholder={'https://example.com'}
          onChange={(event) => setUrl(event.target.value)}
        />
        <Button loading={loading} htmlType='submit'>
          Shorten Url
        </Button>
      </form>
      {shortenUrl && (
        <div
          className={styles.shortenUrl}
          onClick={() => handleCopy(window.location.origin + shortenUrl)}
        >
          <span className={styles.copy}>Click QR code to copy!</span>
          <QRCode
            size={256}
            style={{
              height: 'auto',
              maxWidth: '100%',
              width: '100%',
            }}
            bgColor='#ffffff'
            value={window.location.origin + shortenUrl}
          />
          <Link
            href={window.location.origin + shortenUrl}
            target='_blank'
            style={{ fontStyle: 'italic', fontSize: 14, color: '#1677ff' }}
          >
            {window.location.origin + shortenUrl}
          </Link>
        </div>
      )}

      <Spin
        spinning={listLoading}
        indicator={antIcon}
        style={{ marginTop: 48 }}
      >
        <div className={styles.links}>
          {shortedList?.length !== 0 && (
            <div className={styles.link}>
              <div className={styles.href}>Full Url</div>
              <div className={styles.href}>
                Shorted Url
                <div style={{ width: 46 }} />
              </div>
            </div>
          )}
          {shortedList.map((item: any, index: number) => {
            return (
              <div key={item[0]} className={styles.link}>
                <div className={styles.href}>
                  <Link href={item[2]} target='_blank'>
                    {item[2]}
                  </Link>
                </div>
                <div className={styles.href}>
                  <Link href={item[3]} target='_blank'>
                    {item[3]}
                  </Link>
                  <Button
                    type='ghost'
                    onClick={() => handleCopy(window.location.origin + item[3])}
                  >
                    <CopyOutlined />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Spin>
    </div>
  );
};
export default ShortenUrl;
