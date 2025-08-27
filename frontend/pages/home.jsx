import React, { useEffect } from "react";
import "./style/home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "../componets/navbar";

export function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
   <>
   <h1>home</h1>
   </>
  );
}
