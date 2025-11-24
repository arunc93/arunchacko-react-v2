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
        {/* Title */}
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

        {/* Projects List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10rem" }}>
          {projects.map((project, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: windowWidth <= 900 ? "1fr" : "1fr 1fr",
                gap: windowWidth <= 900 ? "3rem" : "6rem",
                alignItems: "center", // This is the key fix!
                minHeight: windowWidth <= 900 ? "auto" : "500px", // Consistent height
              }}
            >
              {/* Image */}
              <div
                style={{
                  order: index % 2 === 1 && windowWidth > 900 ? 2 : 1,
                  justifySelf:
                    windowWidth <= 900
                      ? "center"
                      : index % 2 === 1
                      ? "start"
                      : "end",
                }}
              >
                <div
                  style={{
                    width: windowWidth <= 900 ? "90%" : "500px",
                    height: "340px",
                    background: "#0f172a",
                    borderRadius: "28px",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                    border: "1px solid rgba(139,92,246,0.15)",
                    backgroundImage: `ur[](https://source.unsplash.com/random/800x600?project,screen,${index})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.15), transparent 70%)",
                    }}
                  />
                </div>
              </div>

              {/* Text Content */}
              <div
                style={{
                  order: index % 2 === 1 && windowWidth > 900 ? 1 : 2,
                  maxWidth: "540px",
                  padding: windowWidth <= 900 ? "0 1rem" : 0,
                  justifySelf:
                    windowWidth <= 900
                      ? "center"
                      : index % 2 === 1
                      ? "end"
                      : "start",
                }}
              >
                {/* Tags */}
                <div
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    gap: "0.8rem",
                    flexWrap: "wrap",
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.5rem 1.1rem",
                        borderRadius: "30px",
                        border: `1px solid ${
                          isDarkMode
                            ? "rgba(139,92,246,0.4)"
                            : "rgba(109,40,217,0.3)"
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
                    fontSize: "2.4rem",
                    fontWeight: 700,
                    margin: "0.5rem 0 0.3rem",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    opacity: 0.7,
                    marginBottom: "1.2rem",
                  }}
                >
                  {project.date}
                </p>

                <p
                  style={{
                    fontSize: "1.15rem",
                    lineHeight: "1.75",
                    margin: "1.5rem 0",
                    opacity: 0.9,
                  }}
                >
                  {project.desc}
                </p>

                <p
                  style={{
                    fontSize: "0.95rem",
                    opacity: 0.7,
                    margin: "1.2rem 0 2rem",
                  }}
                >
                  Technologies:{" "}
                  <strong style={{ color: "var(--accent)" }}>
                    {project.tech}
                  </strong>
                </p>

                {/* CTA Button */}
                <button
                  style={{
                    padding: "0.9rem 2.4rem",
                    fontSize: "1.1rem",
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
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow =
                      "0 15px 35px rgba(109,40,217,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 10px 30px rgba(109,40,217,0.3)";
                  }}
                >
                  See more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
