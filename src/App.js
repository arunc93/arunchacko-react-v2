import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Intro03 from "./components/Intro03/Intro03.jsx";
import Experience from "./components/Experience/Experience.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Skills from "./components/Skills/Skills.jsx";
import HireMe from "./components/HireMe/HireMe.jsx";
//import Blogs from "./components/Blogs/Blogs.jsx";


function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // === REFS FOR ALL SECTIONS (Used for smooth scrolling) ===
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null); // Points to Skills section (you can change)
  const contactRef = useRef(null); // Points to HireMe section
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const scrollMap = {
        homeRef,
        projectsRef,
        aboutRef,
        contactRef,
      };
      const targetRef = scrollMap[location.state.scrollTo];
      if (targetRef) {
        setTimeout(() => scrollToSection(targetRef), 0);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, homeRef, projectsRef, aboutRef, contactRef]);

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      {/* === PASS SCROLL FUNCTION AND REFS TO NAVBAR === */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
        sections={{ homeRef, projectsRef, aboutRef, contactRef }}
      />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* === HOME / INTRO SECTION === */}
              <div ref={homeRef}>
                <Intro03 isDarkMode={isDarkMode} onViewProjects={scrollToProjects} />
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
            </>
          }
        />
        {/* === BLOGS SECTION HIDDEN FOR NOW=== 

        <Route path="/blogs" element={<Blogs isDarkMode={isDarkMode} />} />
        <Route path="/blogs/:blogId" element={<Blogs isDarkMode={isDarkMode} />} />
        
        */}
        
      </Routes>
    </div>
  );
}

export default App;
