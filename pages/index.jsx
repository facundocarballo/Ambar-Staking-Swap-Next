import React from "react";
import { NavBar } from "@/src/components/NavBar";
import { Banner } from "@/src/components/Banner";
import { Skills } from "@/src/components/Skills";
import { Projects } from "@/src/components/Projects";
import { Contact } from "@/src/components/Contact";
import { Footer } from "../src/components/Footer";

export default function Home() {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);
  return (
    <>
      {isBrowser ? (
        <div className="App">
          <NavBar />
          <Banner />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      ) : null}
    </>
  );
}
