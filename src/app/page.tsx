"use client";

import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <div>
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
