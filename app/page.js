"use client";
import Spline from "@splinetool/react-spline";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { GrVmMaintenance } from "react-icons/gr";

export default function Home() {
  const [viewportSize, setViewportSize] = useState({
    width: 0,
    height: 0,
  });

  const ballRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const speed = 0.04;

  const fpms = 60 / 1000;

  useEffect(() => {
    gsap.to(ballRef.current, {
      rotation: "+=360",
      duration: 20,
      repeat: -1,
    });

    const ball = ballRef.current;
    const xSet = gsap.quickSetter(ball, "x", "px");
    const ySet = gsap.quickSetter(ball, "y", "px");

    const handleMouseMove = (e) => {
      mouse.current.x = e.x;
      mouse.current.y = e.y;
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);

      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    const updateAnimation = (time, deltaTime) => {
      const delta = deltaTime * fpms;
      const dt = 1.0 - Math.pow(1.0 - speed, delta);

      pos.current.x += (mouse.current.x - pos.current.x) * dt;
      pos.current.y += (mouse.current.y - pos.current.y) * dt;
      xSet(pos.current.x);
      ySet(pos.current.y);
    };

    gsap.ticker.add(updateAnimation);

    const handleResize = () => {
      if (typeof window !== "undefined") {
        setViewportSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
        gsap.ticker.remove(updateAnimation);
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    pos.current.x = viewportSize.width / 2;
    pos.current.y = viewportSize.height / 2;
  }, [viewportSize]);

  return (
    <main className="grid h-[100dvh] grid-cols-12 ">
      <div
        ref={ballRef}
        className="pointer-events-none fixed left-0 top-0 -z-20 aspect-square h-[25vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-green-600 opacity-80"
      ></div>
      <div className="max-w-screen  min-w fixed left-0 top-0 z-10 max-h-[100lvh] min-h-[100dvh] min-w-full backdrop-blur-[9vmax]"></div>
      <div className=" max-h-[50lvh] col-start-2 col-end-12 bg-black px-4 relative z-40 rounded-md self-center  md:pl-28 lg:col-start-3 lg:col-end-11 xl:col-start-4 xl:col-end-10 flex flex-col pt-12 md:flex-row gap-6 shadow-gray-900 shadow-xl items-center md:pt-0">
        <div>
          <h1 className="text-4xl mb-4">We'll be back.</h1>
          <p>
            We're improving our websites <br /> Please come back soon.
          </p>
          <span className="text-white text-6xl"></span>
        </div>

        <Spline
          className="h-full flex"
          scene="https://prod.spline.design/qL74IxkEu2ZHh-xx/scene.splinecode"
        />
      </div>
    </main>
  );
}
