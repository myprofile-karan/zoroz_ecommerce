import Head from 'next/head';
import Header from 'components/header';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
}

export default ({ children, title = 'Next.js Ecommerce' }: LayoutType) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="app-main">
      <Head>
        <title>{ title }</title>
      </Head>

      <Header />

      <main className={(pathname !== '/' ? 'main-page' : '')}>
        { children }
      </main>
      <Toaster />
    </div>
  )
}