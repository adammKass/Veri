import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ScrollTrigger,
  SplitText,
  ScrollToPlugin,
  ScrollSmoother,
} from "gsap/all";
import { heroSlides } from "../../constants";
import { useIsMobile } from "../utils/useIsMobile";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Home = () => {
  const isMobile = useIsMobile();

  useGSAP(() => {
    // Manual snap points, percentages of whole scroll container (4 sections inside)
    let snapPoints = [0, 0.33, 0.66, 1];

    // ScrollTrigger with snapping points, cant seem to be able to change delay, could have something with lenis

    // ScrollSmoother.create({
    //   smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    //   effects: true, // looks for data-speed and data-lag attributes on elements
    //   smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    //   normalizeScroll: true,
    // });

    ScrollTrigger.create({
      trigger: "#smooth-content",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      snap: {
        snapTo: snapPoints,
        duration: 1,
        ease: "power3.inOut",
        delay: 0,
      },
    });

    // For each section scrollTrigger and Parallax for image

    gsap.utils.toArray("section").forEach((section, index) => {
      const imageWrapper = section.querySelector(".image-container img");

      gsap.fromTo(
        imageWrapper,
        {
          yPercent: -70,
        },
        {
          yPercent: 80,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  });

  return (
    <div id="smooth-wrapper">
      <main id="smooth-content">
        {heroSlides.map((slide, index) => (
          <section
            key={index}
            className="relative overflow-hidden h-screen flex flex-col justify-end "
          >
            {/* 
            Image Container
            Bigger Scale for parallax effect 
            */}
            <div className="image-container absolute inset-0 overflow-hidden">
              <img
                src={isMobile ? slide.imageMobile : slide.image}
                alt={slide.name}
                className="w-full h-full scale-125 object-cover object-top brightness-75 antialiased "
                loading="eager"
                fetchPriority="high"
              />
            </div>
            {/* 
            Text Container
            Bigger Scale for parallax effect 
            */}
            <div className="content relative flex flex-col justify-end">
              {/* Number of Section Container */}
              <div className="w-fit flex flex-row items-end gap-4 border-b-2 border-white ">
                <span className="font-spartan font-extralight text-5xl lg:text-9xl text-white  leading-none">
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
    </div>
  );
};
export default Home;
