import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Intro from "./components/Intro/Intro.jsx";
import Experience from "./components/Experience/Experience.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Intro02 from "./components/Intro02/Intro02.jsx";
import Skills from "./components/Skills/Skills.jsx";
import HireMe from "./components/HireMe/HireMe.jsx";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // This applies background to the entire page correctly
  useEffect(() => {
    document.documentElement.style.backgroundColor = isDarkMode
      ? "#0f172a"
      : "#ffffff";
    document.body.style.backgroundColor = isDarkMode ? "#0f172a" : "#ffffff";
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Intro02 isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      {/* <Intro isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> */}
      <Experience isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Projects isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Skills isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <HireMe isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
