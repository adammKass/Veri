import gsap from "gsap";
import Navbar from "./components/Navbar";
import { ScrollTrigger, SplitText, ScrollToPlugin } from "gsap/all";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import Home from "./components/subpages/Home";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

const App = () => {
  // Lenis integration with Gsap from documentation

  // const lenisRef = useRef();

  // useEffect(() => {
  //   function update(time) {
  //     // Smaller number for smoother scrolling
  //     lenisRef.current?.lenis?.raf(time * 1000);
  //   }

  //   gsap.ticker.add(update);

  //   return () => gsap.ticker.remove(update);
  // }, []);

  return (
    <>
      <ReactLenis root>
        <Navbar></Navbar>
        <Home></Home>
      </ReactLenis>
    </>
  );
};

export default App;
