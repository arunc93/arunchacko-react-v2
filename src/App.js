import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Intro02 from "./components/Intro02/Intro02.jsx";
import Experience from "./components/Experience/Experience.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Skills from "./components/Skills/Skills.jsx";
import HireMe from "./components/HireMe/HireMe.jsx";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // === REFS FOR ALL SECTIONS (Used for smooth scrolling) ===
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null); // Points to Skills section (you can change)
  const contactRef = useRef(null); // Points to HireMe section

  // === APPLY DARK/LIGHT BACKGROUND TO ENTIRE PAGE ===
  useEffect(() => {
    document.documentElement.style.backgroundColor = isDarkMode
      ? "#0f172a"
      : "#ffffff";
    document.body.style.backgroundColor = isDarkMode ? "#0f172a" : "#ffffff";
  }, [isDarkMode]);

  // === TOGGLE DARK MODE ===
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // === SMOOTH SCROLL FUNCTION WITH OFFSET (Fixes navbar overlap) ===
  const scrollToSection = (elementRef) => {
    const offset = 80; // Height of fixed navbar (adjust if needed)
    const element = elementRef.current;
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };
  const scrollToProjects = () => scrollToSection(projectsRef);

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      {/* === PASS SCROLL FUNCTION AND REFS TO NAVBAR === */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
        sections={{ homeRef, projectsRef, aboutRef, contactRef }}
      />

      {/* === HOME / INTRO SECTION === */}
      <div ref={homeRef}>
        <Intro02 isDarkMode={isDarkMode} onViewProjects={scrollToProjects} />
      </div>

      {/* === EXPERIENCE SECTION === */}
      <Experience isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* === PROJECTS SECTION === */}
      <div ref={projectsRef}>
        <Projects isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      {/* === ABOUT / SKILLS SECTION === */}
      <div ref={aboutRef}>
        <Skills isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      {/* === CONTACT / HIRE ME SECTION === */}
      <div ref={contactRef}>
        <HireMe isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;
