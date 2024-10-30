"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ImagesSlider } from "./components/ui/images-slider";
import TypingAnimation from "@/components/ui/typing-animation.tsx";
import {
  DoubleArrowDownIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import AOS from "aos";
import "aos/dist/aos.css";

import "./App.css";

function App() {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação em ms
      offset: 100, // Offset de scroll para iniciar a animação
      /*once: true, */// Se true, a animação ocorre apenas uma vez ao rolar para baixo
    });
  }, []);

  const targetRef = useRef(null);
  const Scroll = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div>
        <ImagesSlider className="h-[100vh]" images={images}>
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col justify-center items-center"
          >
            <motion.p>
              <div className="container-home">
                <section>
                  <h4
                    className="text-container"
                    style={{ textTransform: "uppercase" }}
                  >
                    Welcome to the photo gallery
                  </h4>
                  <h3 className="text-container">
                    <TypingAnimation text="Explore unique moments and details captured" />
                  </h3>
                </section>
                <DoubleArrowDownIcon className="icons" onClick={Scroll} />
              </div>
            </motion.p>
          </motion.div>
        </ImagesSlider>

        <div className="container-search" ref={targetRef}>
          <div className="search">
            <section className="container-input">
              <input type="text" className="input-search" placeholder="Search your images" data-aos="fade-left" />
              <MagnifyingGlassIcon className="icon-search"  data-aos="fade-left" />
            </section>
            <section className="search-options" data-aos="fade-right">
              <a href="" className="link-page">
                See all
              </a>
              <a href="" className="link-page">
                Nature
              </a>
              <a href="" className="link-page">
                Others
              </a>
            </section>
          </div>
        </div>

        <div className="container-images"></div>
      </div>
    </>
  );
}

export default App;
