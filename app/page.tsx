// Main page — assembles all portfolio sections in order
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Minigame from '@/components/sections/Minigame';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  return (
    <>
      {/* Loading screen overlays everything on first load */}
      <LoadingScreen />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Fixed navigation */}
      <Navbar />

      {/* Main content anchor for skip-to-content */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Minigame />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
