import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "@/components/Projects";
import Advisory from "@/components/Advisory";
import Contact from "@/components/Contact";
import { experiences } from "@/config/experience";
import { JsonLdScript, workHistoryJsonLd } from "@/utils/jsonld";

export default function HomePage() {
  return (
    <div>
      <JsonLdScript
        data={workHistoryJsonLd(experiences)}
        data-testid="json-ld"
      />
      <About />
      <Experience />
      <Projects />
      <Advisory />
      <Contact teaser />
    </div>
  );
}
