import React from "react";

// Import your icons (place them in src/assets/icons/ or public/icons/)

import behanceIcon from "../../assets/social/behance.png";
import twitterIcon from "../../assets/social/x.png";
import githubIcon from "../../assets/social/github.png";
import linkedinIcon from "../../assets/social/linkedin.png";
import youtubeIcon from "../../assets/social/youtube.png";

const HireMe = ({ isDarkMode, toggleTheme }) => {
  const socialLinks = [
    {
      name: "Behance",
      href: "https://behance.net/yourusername",
      icon: behanceIcon,
    },
    { name: "X", href: "https://x.com/yourusername", icon: twitterIcon },
    {
      name: "GitHub",
      href: "https://dribbble.com/yourusername",
      icon: githubIcon,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      icon: linkedinIcon,
    },
    { name: "YouTube", href: "https://yourportfolio.com", icon: youtubeIcon },
  ];

  return (
    <section
      style={{
        padding: "180px 24px",
        background: "var(--bg-solid)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
      >
        {/* ... your heading, subtext, and button remain unchanged ... */}
        <h1
          style={{
            fontSize: "50px",
            fontWeight: "800",
            lineHeight: "1.3",
            marginBottom: "5px",
            background: "var(--gradient)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Let's do it together
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "var(--accent)",
            maxWidth: "640px",
            margin: "0 auto 48px auto",
            lineHeight: "1.6",
          }}
        >
          Looking for a dedicated, passionate professional to join your ranks?
          <br />
          Your search ends here.
        </p>

        <a
          href="mailto:hello@yourname.com"
          style={{
            display: "inline-block",
            padding: "18px 48px",
            fontSize: "18px",
            fontWeight: "600",
            color: "white",
            background: "linear-gradient(135deg, #a657f5, #7c3aed)",
            borderRadius: "60px",
            textDecoration: "none",
            boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow =
              "0 28px 56px rgba(124, 58, 237, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(124, 58, 237, 0.4)";
          }}
        >
          Hire Me
          <span
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)",
              opacity: 0,
              transition: "opacity 0.4s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
          />
        </a>

        {/* Social Icons with PNG/SVG */}
        <div
          style={{
            marginTop: "120px",
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(121, 121, 121, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(166,87,245,0.25)";
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(121, 121, 121, 0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={link.icon}
                alt={link.name}
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "contain",
                  //filter: isDarkMode ? "brightness(0) invert(1)" : "none", // optional: white in dark mode
                  filter: isDarkMode
                    ? "brightness(0.8) invert(1) grayscale(0.3)"
                    : "none",

                  transition: "filter 0.3s",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireMe;
