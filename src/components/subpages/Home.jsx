import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { heroSlides } from "../../constants";
import { useIsMobile } from "../utils/useIsMobile";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = () => {
  const isMobile = useIsMobile();
  const lenis = useLenis();

  useGSAP(() => {
    if (!lenis) return;

    // Lenis + ScrollTrigger sync
    ScrollTrigger.scrollerProxy("body", {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => lenis.resize());

    // Get all sections
    const sections = gsap.utils.toArray("section");
    const total = sections.length;

    // Critical: Give ScrollTrigger enough virtual space
    ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: () => `+=${(total - 1) * 100}%`, // This is the magic line
      snap: {
        snapTo: (value) => {
          // Convert progress → nearest section
          const step = 1 / (total - 1);
          const snapped = Math.round(value / step) * step;
          return gsap.utils.clamp(0, 1, snapped);
        },
        duration: 1,
        delay: 0, // Now works perfectly
        ease: "power2.inOut",
      },
    });

    // Parallax (now super smooth)
    sections.forEach((section) => {
      const img = section.querySelector(".image-container img");
      if (!img) return;

      gsap.fromTo(
        img,
        {
          yPercent: -80,
        },
        {
          yPercent: 80,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    // Force initial refresh
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);

  return (
    <main className="relative">
      {heroSlides.map((slide, index) => (
        <section
          key={index}
          className="relative h-dvh w-screen overflow-hidden flex flex-col justify-end snap-start"
        >
          {/* Parallax Background */}
          <div className="image-container absolute inset-0 overflow-hidden">
            <img
              src={isMobile ? slide.imageMobile : slide.image}
              alt={slide.name}
              className="w-full h-full object-cover object-top brightness-75 will-change-transform"
              style={{ yPercent: -70 }}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
          {/*
            Text Container
            Bigger Scale for parallax effect
            */}

          <div className="content relative flex flex-col justify-end">
            {/* Number of Section Container */}
            <div className="w-fit flex flex-row items-end gap-4 border-b-2 border-white ">
              {" "}
              <span className="font-spartan font-extralight text-5xl lg:text-9xl text-white leading-none">
                {slide.number}
              </span>
              <p className="max-w-[8ch] text-xl uppercase text-white mb-1.5 lg:mb-7">
                {slide.sectionName}
              </p>
            </div>
            {/* Main Text */}
            <div className="text-white md:self-end text-center flex flex-col md:flex-row items-left md:items-center justify-between py-4 z-80">
              <h2 className="font-spartan font-bold text-left text-[clamp(2rem,8vw,10rem)] uppercase leading-none z-80 align-baseline">
                {slide.name}
              </h2>

              <div className="flex flex-col items-end self-start md:self-end">
                <p className="text-sm sm:text-base uppercase font-bold max-w-prose z-80 text-left md:text-right mb-0 md:mb-5">
                  {slide.subheading}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Home;
