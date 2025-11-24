import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar";
import { heroSlides } from "./constants";
import { ScrollTrigger, SplitText, ScrollToPlugin } from "gsap/all";
import { ReactLenis } from "lenis/react";
import { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

const App = () => {
  useGSAP(() => {
    const sections = gsap.utils.toArray("section");
    let snapPoints = [0, 0.33, 0.66, 1];

    ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: snapPoints,
        duration: 1,
        ease: "power3.inOut",
        delay: 0,
      },
    });
  });

  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 800);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <Navbar></Navbar>
      <main>
        {heroSlides.map((slide, index) => (
          <section key={index} className="relative h-screen bg-amber-600">
            <div className="absolute inset-0">
              <picture>
                <source srcSet={slide.imageMobile} media="(max-width: 768px)" />
                <source srcSet={slide.image} media="(min-width: 769px)" />
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default App;
