import React, { useState } from "react";

const Skills = ({ isDarkMode, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState("design");

  const designSkills = [
    { name: "Figma", isFigma: true },
    { name: "After Effects", short: "Ae", color: "#9966FF" },
    { name: "Photoshop", short: "Ps", color: "#31C5E0" },
    { name: "Illustrator", short: "Ai", color: "#FF9A00" },
    { name: "Premiere Pro", short: "Pr", color: "#EA77FF" },
    { name: "InDesign", short: "Id", color: "#FF5276" },
    { name: "PowerPoint", short: "Pp", color: "#D43F2A" },
    { name: "XD", short: "Xd", color: "#FF2BC2" },
  ];

  const techSkills = [
    { name: "React", short: "React", color: "#61DAFB" },
    { name: "JavaScript", short: "JS", color: "#F7DF1E" },
    { name: "TypeScript", short: "TS", color: "#3178C6" },
    { name: "Next.js", short: "Next", color: "#FFFFFF" },
    { name: "Node.js", short: "Node", color: "#8CC84B" },
    { name: "Git", short: "Git", color: "#F05032" },
    { name: "Docker", short: "Docker", color: "#2496ED" },
    { name: "Firebase", short: "Fire", color: "#FFCA28" },
  ];

  const skills = activeTab === "design" ? designSkills : techSkills;

  return (
    <section
      style={{
        padding: "100px 24px",
        //background: "#0f172a",
        background: "var(--bg-solid)",
        minHeight: "100vh",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
      >
        <h2
          style={{
            fontSize: "56px",
            fontWeight: "800",
            color: "white",
            marginBottom: "60px",
            background: "var(--gradient)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Skills
        </h2>

        {/* Perfectly Centered Toggle - Fixed! */}
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
              //background: "#1e293b",
              background: "var(--gradient)",

              borderRadius: "50px",
              padding: "8px",
              display: "inline-flex",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* Moving Purple Pill - Perfectly Aligned */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                width: "120px",
                height: "48px",
                background:
                  "linear-gradient(135deg,rgb(166, 87, 245), rgb(166, 87, 245)",
                //background: "var(--gradient)",
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
                //color: activeTab === "tech" ? "white" : "#94a3b8",
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

        {/* Skills Grid - Responsive & Centered */}
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
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: skill.color || "#e2e8f0",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                }}
              >
                {skill.isFigma ? (
                  <div
                    style={{
                      position: "relative",
                      width: "48px",
                      height: "48px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "24px",
                        height: "24px",
                        background: "#f97316",
                        borderRadius: "12px 0 0 0",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "24px",
                        height: "24px",
                        background: "#a78bfa",
                        borderRadius: "0 12px 0 0",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "24px",
                        height: "24px",
                        background: "#f43f5e",
                        borderRadius: "0 0 0 12px",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: "24px",
                        height: "24px",
                        background: "#06b6d4",
                        borderRadius: "0 0 12px 0",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "24px",
                        height: "24px",
                        background: "#10b981",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                ) : (
                  skill.short
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
