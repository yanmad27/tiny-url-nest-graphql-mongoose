import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const alias = router.query.alias;
    if (!alias) return;
    setLoading(true);
    fetch(`/api/shorten/${alias}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status !== 200) throw res;
        return res.json();
      })
      .then((res) => {
        console.log('LOG ~ .then ~ res.url:', res.url);
        router.push(res.url);
      })
      .catch((err) => {
        console.log('LOG ~ .then ~ err:', err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [router]);
  return (
    <div className={styles.container}>
      <Spin spinning={loading} indicator={antIcon} />
      {loading && <div>redirect /{router.query.alias}...</div>}
      {!loading && notFound && (
        <div className={styles.notFound}>
          <div>Not found /{router.query.alias}</div>
          <Button onClick={() => router.push('/')}>
            <ArrowLeftOutlined />
          </Button>
        </div>
      )}
    </div>
  );
}
