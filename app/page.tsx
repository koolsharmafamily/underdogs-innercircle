import { Hero } from '@/sections/Hero';
import { Manifesto } from '@/sections/Manifesto';
import { Work } from '@/sections/Work';
import { Capabilities } from '@/sections/Capabilities';
import { Process } from '@/sections/Process';
import { Proof } from '@/sections/Proof';
import { Contact } from '@/sections/Contact';

export default function HomePage() {
  return (
    <main className="relative w-full">
      <Hero />
      <Manifesto />
      <Work />
      <Capabilities />
      <Process />
      <Proof />
      <Contact />
    </main>
  );
}
