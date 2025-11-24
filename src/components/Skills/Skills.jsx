import React, { useState } from "react";

// Import all PNG icons from your folder
import figma from "../../assets/skills/figma.png";
import ae from "../../assets/skills/ae.png";
import ps from "../../assets/skills/ps.png";
import ai from "../../assets/skills/ai.png";
import pr from "../../assets/skills/pr.png";
import id from "../../assets/skills/id.png";
import ppt from "../../assets/skills/ppt.png";
import da from "../../assets/skills/da.png"; // Adobe XD
import react from "../../assets/skills/14react.png";
import js from "../../assets/skills/13js.png";
import node from "../../assets/skills/15node.png";
import html from "../../assets/skills/11html.png";
import css from "../../assets/skills/12css.png";
// Optional extras you can add later:
// import docker from "./assets/skills/docker.png";
// import git from "./assets/skills/git.png";
// etc.

const Skills = ({ isDarkMode, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState("design");

  const designSkills = [
    { name: "Figma", icon: figma },
    { name: "After Effects", icon: ae },
    { name: "Photoshop", icon: ps },
    { name: "Illustrator", icon: ai },
    { name: "Premiere Pro", icon: pr },
    { name: "InDesign", icon: id },
    { name: "PowerPoint", icon: ppt },
    { name: "Adobe XD", icon: da },
  ];

  const techSkills = [
    { name: "HTML", icon: html },
    { name: "CSS", icon: css },
    { name: "JavaScript", icon: js },
    { name: "React", icon: react },

    { name: "Node.js", icon: node },
    // Add more when you get their icons:
    // { name: "TypeScript", icon: ts },
    // { name: "Next.js", icon: nextjs },
    // { name: "Git", icon: git },
    // { name: "Docker", icon: docker },
    // { name: "Firebase", icon: firebase },
  ];

  const skills = activeTab === "design" ? designSkills : techSkills;

  return (
    <section
      style={{
        padding: "50px 24px",
        background: "var(--bg-solid)",
        minHeight: "70vh",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Line */}
      <div
        style={{
          width: "100px",
          height: "2px",
          background: "var(--gradient)",
          margin: "0 auto 4rem",
          borderRadius: "2px",
        }}
      />

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
      >
        <h2
          style={{
            fontSize: "56px",
            fontWeight: "800",
            marginBottom: "60px",
            background: "var(--gradient)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Skills
        </h2>

        {/* Toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "80px",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "var(--gradient)",
              borderRadius: "50px",
              padding: "8px",
              display: "inline-flex",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                width: "120px",
                height: "48px",
                background: "rgb(166, 87, 245)",
                borderRadius: "50px",
                boxShadow: "0 8px 20px rgba(167, 139, 250, 0.5)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform:
                  activeTab === "tech" ? "translateX(120px)" : "translateX(0)",
              }}
            />

            <button
              onClick={() => setActiveTab("design")}
              style={{
                position: "relative",
                zIndex: 10,
                width: "120px",
                padding: "14px 0",
                fontSize: "15px",
                fontWeight: "600",
                color: activeTab === "design" ? "white" : "var(--accent)",
                background: "transparent",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
            >
              Design
            </button>

            <button
              onClick={() => setActiveTab("tech")}
              style={{
                position: "relative",
                zIndex: 10,
                width: "120px",
                padding: "14px 0",
                fontSize: "15px",
                fontWeight: "600",
                color: activeTab === "tech" ? "white" : "var(--accent)",
                background: "transparent",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
            >
              Tech
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
            gap: "32px",
            maxWidth: "1000px",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          {skills.map((skill, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                const icon = e.currentTarget.querySelector(".skill-icon");
                if (icon) {
                  icon.style.transform = "translateY(-12px) scale(1.15)";
                  icon.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                const icon = e.currentTarget.querySelector(".skill-icon");
                if (icon) {
                  icon.style.transform = "translateY(0) scale(1)";
                  icon.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
                }
              }}
            >
              <div
                className="skill-icon"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "24px",
                  background: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  padding: "8px",
                }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  style={{
                    width: "60%",
                    height: "60%",
                    objectFit: "contain",
                    //borderRadius: "16px",
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Line */}
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

export default Skills;
