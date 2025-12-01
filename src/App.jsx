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
  //     lenisRef.current?.lenis?.raf(time * 800);
  //   }

  //   gsap.ticker.add(update);
  //   gsap.ticker.lagSmoothing(0);

  //   return () => gsap.ticker.remove(update);
  // }, []);

  return (
    <>
      {/* <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} /> */}
      <Navbar></Navbar>
      <Home></Home>
    </>
  );
};

export default App;
