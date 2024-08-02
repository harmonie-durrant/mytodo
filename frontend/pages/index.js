import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return null; // or you can display a loading spinner or message
};

export default Home;
