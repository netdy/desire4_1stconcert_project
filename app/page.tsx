import { Suspense } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Loading from './loading';

export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<Loading />}>
        <Projects />
      </Suspense>
      <Footer />
    </main>
  );
}
