import React, { useState, useEffect } from "react";
import kpmgLogo from "../../assets/logos/kpmg.png";
import accentureLogo from "../../assets/logos/accenture.png";
import eyLogo from "../../assets/logos/ey.png";
import fidelityLogo from "../../assets/logos/fidelity.png";

const Experience = ({ isDarkMode, toggleTheme }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const companies = [
    { name: "KPMG", logo: kpmgLogo },
    { name: "Accenture", logo: accentureLogo },
    { name: "EY", logo: eyLogo },
    { name: "Fidelity Investments", logo: fidelityLogo },
  ];

  return (
    <section
      style={{
        padding: "50px 5%",
        textAlign: "center",
        //background: "var(--bg-solid)",
        color: "var(--text)",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Top decorative line */}
      <div
        style={{
          width: "100px",
          height: "2px",
          background: "var(--gradient)",
          margin: "0 auto 4rem",
          borderRadius: "2px",
        }}
      />

      {/* Title */}
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "4rem",
          background: "var(--gradient)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: 500,
        }}
      >
        Trusted by the Best
      </h2>

      {/* Responsive Company Logos Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            windowWidth <= 1000
              ? "repeat(2, 1fr)" // 2×2 on small screens
              : "repeat(auto-fit, minmax(200px, 1fr))", // 3–4 on large screens
          gap: "2.5rem",
          maxWidth: "1000px",
          margin: "0 auto 5rem",
        }}
      >
        {companies.map((company) => (
          <div
            key={company.name}
            style={{
              background: "rgba(240, 240, 245, 0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "3rem 2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "all 0.4s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "140px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
            }}
          >
            {/* This is the fix – now showing the actual image */}
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              style={{
                height: "40px", // adjust this value to make logos bigger/smaller
                width: "auto",
                maxWidth: "150px",
                objectFit: "contain",
                filter: "grayscale(20%)", // optional: subtle grayscale
                transition: "filter 0.4s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "grayscale(0%)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.filter = "grayscale(20%)")
              }
            />

            {/* Optional: show company name below the logo */}
            {/* <div style={{ marginTop: "1rem", fontWeight: "600", color: "#444", fontSize: "1rem" }}>
        {company.name}
      </div> */}
          </div>
        ))}
      </div>

      {/* Caption */}
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: 400,
          color: "var(--text)",
          opacity: 0.85,
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}
      >
        Hired by world-class brands who push boundaries and set benchmarks.
      </p>

      {/* Bottom decorative line */}
      <div
        style={{
          width: "100px",
          height: "2px",
          background: "var(--gradient)",
          margin: "4rem auto 0",
          borderRadius: "2px",
        }}
      />
    </section>
  );
};

export default Experience;
