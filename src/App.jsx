import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar";
import { heroSlides } from "./constants";
import { ScrollTrigger, SplitText, ScrollToPlugin } from "gsap/all";
import { ReactLenis } from "lenis/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import CTAButton from "./components/CTAButton";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

const App = () => {
  useGSAP(() => {
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

    gsap.utils.toArray("section").forEach((section, index) => {
      const imageWrapper = section.querySelector(".image-container");
      const contentWrapper = section.querySelector(".content");

      gsap.to(imageWrapper, {
        yPercent: -40, // Image moves up slower → parallax lag
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // start when section enters from bottom
          end: "bottom top", // end when section leaves at top
          scrub: true, // smooth scrubbing (key for parallax)
          // Important for Lenis + GSAP to play nice:
          invalidateOnRefresh: true,
        },
      });

      gsap.to(contentWrapper, {
        yPercent: -60, // Image moves up slower → parallax lag
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // start when section enters from bottom
          end: "bottom top", // end when section leaves at top
          scrub: true, // smooth scrubbing (key for parallax)
          // Important for Lenis + GSAP to play nice:
          invalidateOnRefresh: true,
        },
      });
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
          <section
            key={index}
            className="relative h-screen bg-amber-600 overflow-hidden flex flex-col justify-end"
          >
            <div className="image-container absolute w-full h-[170%] top-0 left-0 will-change-transform">
              <picture>
                <source srcSet={slide.imageMobile} media="(max-width: 768px)" />
                <source srcSet={slide.image} media="(min-width: 769px)" />
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover"
                  loading="eager" // important for parallax
                  fetchPriority="high"
                  width="100%"
                  height="100%"
                />
              </picture>
            </div>
            <div className="content text-white md:self-start text-left flex flex-col gap-4 mb-[10vh] lg:bg-linear-to-r lg:from-black/20 lg:to-transparent lg:to-60% py-4 z-80 will-change-transform">
              <h2 className="font-serif font-bold text-2xl portrait:text-5xl lg:text-8xl uppercase z-80">
                {slide.name}
              </h2>
              <p className="text-sm sm:text-base max-w-prose z-80">
                {slide.subheading}
              </p>
              <CTAButton path="#" text="Learn More" />
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default App;
