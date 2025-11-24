import Navbar from "./components/Navbar";
import Section from "./components/Section";
import { heroSlides } from "./constants";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <main className="min-h-dvh h-dvh overflow-y-scroll snap-mandatory snap-y scroll-smooth">
        {heroSlides.map((slide, index) => (
          <Section
            key={index}
            name={slide.name}
            image={slide.image}
            imageMobile={slide.imageMobile}
            subheading={slide.subheading}
          />
        ))}
      </main>
    </>
  );
};
export default App;
