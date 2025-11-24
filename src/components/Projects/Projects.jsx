import React, { useState, useEffect } from "react";

const Projects = ({ isDarkMode }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 1000;

  const projects = [
    {
      title: "Online Cinema",
      date: "September 2023",
      tags: ["Design", "Web"],
      desc: "A feature-rich platform for streaming movies and TV shows. Includes user authentication, personalized recommendations, watchlists, and responsive design.",
      tech: "React, Node.js, MongoDB",
    },
    {
      title: "E-Shop",
      date: "August 2024",
      tags: ["E-commerce", "Tech"],
      desc: "A modern online shop for electronic devices with clean UI and secure payment integration. Features include advanced product filtering, dynamic cart updates, and admin dashboard.",
      tech: "Next.js, Tailwind CSS, Stripe API",
    },
    {
      title: "Games Forum",
      date: "December 2024",
      tags: ["Games", "Social Media"],
      desc: "A community-driven forum for gamers to discuss, share, and connect. Includes real-time chat, post moderation, and a ranking system to highlight active contributors.",
      tech: "Angular, Firebase, WebSocket",
    },
  ];

  return (
    <section
      style={{
        padding: "120px 5%",
        background: "var(--bg-solid)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "3.2rem",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "6rem",
            background: "var(--gradient)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Projects
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10rem" }}>
          {projects.map((project, index) => {
            const imageOnLeft = index % 2 === 0;

            return (
              <div key={index}>
                {/* MOBILE: Image on top, full width */}
                {isMobile && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "3.5rem",
                      alignItems: "center",
                    }}
                  >
                    <ImagePlaceholder />
                    <TextContent
                      project={project}
                      isMobile={true}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                )}

                {/* DESKTOP: Alternating layout */}
                {!isMobile && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "540px 1fr",
                      gap: "6rem",
                      alignItems: "center",
                      direction: imageOnLeft ? "ltr" : "rtl", // This is the magic
                    }}
                  >
                    <ImagePlaceholder />
                    <TextContent
                      project={project}
                      isMobile={false}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Reusable Image Placeholder
const ImagePlaceholder = () => (
  <div
    style={{
      width: "100%",
      height: "360px",
      background: "#0f172a",
      borderRadius: "32px",
      boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
      border: "1px solid rgba(139,92,246,0.2)",
      position: "relative",
      overflow: "hidden",
      // Uncomment when ready:
      // backgroundImage: `url(/images/projects/your-image.jpg)`,
      // backgroundSize: "cover",
      // backgroundPosition: "center",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.28) 0%, transparent 60%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.08)",
        fontSize: "4.5rem",
        fontWeight: "bold",
        letterSpacing: "8px",
      }}
    >
      PROJECT
    </div>
  </div>
);

// Reusable Text Content
const TextContent = ({ project, isMobile, isDarkMode }) => (
  <div
    style={{
      maxWidth: "560px",
      textAlign: isMobile ? "center" : "left",
      padding: isMobile ? "0 1rem" : 0,
    }}
  >
    <div
      style={{
        marginBottom: "1rem",
        display: "flex",
        gap: "0.8rem",
        flexWrap: "wrap",
        justifyContent: isMobile ? "center" : "flex-start",
      }}
    >
      {project.tags.map((tag) => (
        <span
          key={tag}
          style={{
            fontSize: "0.85rem",
            padding: "0.5rem 1.2rem",
            borderRadius: "30px",
            border: `1px solid ${
              isDarkMode ? "rgba(139,92,246,0.4)" : "rgba(109,40,217,0.3)"
            }`,
            background: isDarkMode
              ? "rgba(139,92,246,0.1)"
              : "rgba(109,40,217,0.05)",
            color: "var(--text)",
            fontWeight: 500,
          }}
        >
          {tag}
        </span>
      ))}
    </div>

    <h3
      style={{
        fontSize: "2.6rem",
        fontWeight: 700,
        margin: "0.5rem 0 0.4rem",
        lineHeight: 1.1,
      }}
    >
      {project.title}
    </h3>
    <p style={{ fontSize: "1rem", opacity: 0.7, marginBottom: "1.4rem" }}>
      {project.date}
    </p>
    <p
      style={{
        fontSize: "1.18rem",
        lineHeight: "1.8",
        margin: "1.6rem 0",
        opacity: 0.92,
      }}
    >
      {project.desc}
    </p>
    <p
      style={{ fontSize: "0.98rem", opacity: 0.75, margin: "1.4rem 0 2.2rem" }}
    >
      Technologies:{" "}
      <strong style={{ color: "var(--accent)" }}>{project.tech}</strong>
    </p>

    <button
      style={{
        padding: "0.95rem 2.6rem",
        fontSize: "1.12rem",
        fontWeight: 600,
        border: "none",
        borderRadius: "50px",
        background: "var(--gradient)",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 10px 30px rgba(109,40,217,0.3)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-5px)";
        e.target.style.boxShadow = "0 18px 40px rgba(109,40,217,0.4)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 10px 30px rgba(109,40,217,0.3)";
      }}
    >
      See more
    </button>
  </div>
);

export default Projects;
