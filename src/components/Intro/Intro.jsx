import React, { useState, useEffect } from "react";

const Intro = ({ isDarkMode, toggleTheme }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1.5rem",
        background: isDarkMode
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
          : "var(--bg-solid)",
      }}
    >
      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          paddingBottom: isMobile ? "4rem" : "6rem",
        }}
      >
        {/* Prominent Name */}
        <p
          style={{
            fontSize: isMobile ? "1.8rem" : "2.4rem",
            fontWeight: "700",
            color: isDarkMode ? "#c4b5fd" : "#6d28d9",
            margin: "0 0 0.5rem 0",
            letterSpacing: "0.5px",
            background: isDarkMode
              ? "linear-gradient(90deg, #a78bfa, #818cf8)"
              : "none",
            backgroundClip: isDarkMode ? "text" : "initial",
            WebkitBackgroundClip: isDarkMode ? "text" : "initial",
          }}
        >
          I'm Arun,
        </p>

        {/* Main Heading with Gradient */}
        <h1
          style={{
            fontSize: isMobile ? "3.2rem" : "4.2rem",
            fontWeight: "900",
            margin: "0.8rem 0 1.8rem",
            lineHeight: "1.1",
            background: "var(--gradient)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "-1px",
          }}
        >
          Visual Designer & Developer
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: isMobile ? "1.2rem" : "1.4rem",
            lineHeight: "1.8",
            color: isDarkMode ? "#cbd5e1" : "#475569",
            maxWidth: "720px",
            margin: "0 auto 3rem",
            opacity: 0.95,
          }}
        >
          I create videos, websites, apps, brands, and digital experiences.
        </p>

        {/* CTA Button */}
        <button
          onClick={toggleTheme}
          style={{
            padding: "1.1rem 3rem",
            fontSize: "1.15rem",
            fontWeight: "600",
            color: "white",
            background: "var(--gradient)",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "all 0.4s ease",
            boxShadow: "0 12px 35px rgba(109, 40, 217, 0.35)",
            transform: "translateY(0)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow =
              "0 20px 45px rgba(109, 40, 217, 0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 12px 35px rgba(109, 40, 217, 0.35)";
          }}
        >
          View Projects
        </button>
      </main>
    </section>
  );
};

export default Intro;
