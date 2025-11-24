import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import { heroSlides } from "./constants";
import { ScrollTrigger, SplitText, ScrollToPlugin } from "gsap/all";
import { useEffect, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

const App = () => {
  useLayoutEffect(() => {
    const sections = gsap.utils.toArray("section");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=15%",
        end: "bottom top+=15%",
        onEnter: () => {
          gsap.to(window, {
            scrollTo: section.offsetTop,
            duration: 1.4,
            ease: "power3.out",
          });
        },
        onEnterBack: () => {
          gsap.to(window, {
            scrollTo: section.offsetTop,
            duration: 1.3,
            ease: "power3.out",
          });
        },
      });
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <main className="min-h-dvh h-dvh">
        {heroSlides.map((slide, index) => (
          <section key={index} className="relative h-lvh bg-amber-600">
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
