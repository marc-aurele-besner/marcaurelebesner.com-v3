import dynamic from "next/dynamic";

const About = dynamic(() => import("../components/About"));
const Experience = dynamic(() => import("../components/Experience"));
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));

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
