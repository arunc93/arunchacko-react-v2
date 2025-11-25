import React, { useState, useEffect } from "react";

const Navbar = ({ isDarkMode, toggleTheme, scrollToSection, sections }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  // === HANDLE RESIZE & AUTO-CLOSE MOBILE MENU ON DESKTOP ===
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 750;
      setIsMobile(mobile);
      if (!mobile && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // === NAV ITEMS CONFIG (Maps label → ref) ===
  const navItems = [
    { label: "Home", ref: sections.homeRef },
    { label: "Projects", ref: sections.projectsRef },
    { label: "About", ref: sections.aboutRef },
    { label: "Contact", ref: sections.contactRef },
  ];

  // === HANDLE NAV CLICK (Scroll + Close mobile menu) ===
  const handleNavClick = (ref) => {
    scrollToSection(ref);
    if (isMobile) setMenuOpen(false);
  };

  return (
    <>
      {/* === ANIMATIONS & HOVER STYLES === */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
          font-size: inherit;
          font-family: inherit;
        }
        .nav-link:hover {
          color: var(--accent) !important;
          transform: translateY(-2px);
        }
        .nav-link::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -6px;
          left: 50%;
          background: var(--accent);
          transition: all 0.4s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .hamburger span {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }
      `}</style>

      {/* === MAIN NAVBAR (Fixed at top) === */}
      <nav
        style={{
          background: isDarkMode
            ? "rgba(15, 23, 42, 0.98)"
            : "rgba(255, 255, 255, 0.98)",
          WebkitBackdropFilter: "blur(16px)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid var(--border)`,
          padding: "1.2rem 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          fontFamily: `'Inter', system-ui, sans-serif`,
          color: "var(--text)",
          boxShadow: "var(--shadow)",
        }}
      >
        {/* === LOGO / NAME === */}
        <div
          style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            background: "var(--gradient)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          Arun Chacko
        </div>

        {/* === DESKTOP NAV LINKS === */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.ref)}
                className="nav-link"
                style={{
                  color: "var(--text)",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </button>
            ))}

            {/* === DARK MODE TOGGLE === */}
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.65rem",
                cursor: "pointer",
                padding: "8px",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
                filter: isDarkMode ? "none" : "brightness(0.9)",
                transition: "all 0.3s ease",
              }}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? "☀" : "☾"}
            </button>
          </div>
        )}

        {/* === MOBILE: TOGGLE + HAMBURGER === */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.65rem",
                cursor: "pointer",
                padding: "8px",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
                filter: isDarkMode ? "none" : "brightness(0.9)",
                transition: "all 0.3s ease",
              }}
            >
              {isDarkMode ? "☀" : "☾"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`hamburger ${menuOpen ? "open" : ""}`}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
              }}
            >
              <span style={lineStyle(isDarkMode)} />
              <span style={{ ...lineStyle(isDarkMode), margin: "7px 0" }} />
              <span style={lineStyle(isDarkMode)} />
            </button>
          </div>
        )}

        {/* === MOBILE MENU (Dropdown) === */}
        {isMobile && menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: isDarkMode
                ? "rgba(15, 23, 42, 0.98)"
                : "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              padding: "2.5rem 6%",
              borderTop: `1px solid var(--border)`,
              boxShadow:
                "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
              animation: "slideDown 0.4s ease-out",
              zIndex: 999,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              {navItems.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.ref)}
                  style={{
                    color: "var(--text)",
                    background: "none",
                    border: "none",
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    opacity: 0,
                    animation: `slideDown 0.4s ease-out ${
                      i * 0.1 + 0.2
                    }s forwards`,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

// === HAMBURGER LINE STYLES ===
const lineStyle = (isDarkMode) => ({
  display: "block",
  width: "30px",
  height: "3px",
  background: isDarkMode ? "#e2e8f0" : "#4c1d95",
  borderRadius: "3px",
});

export default Navbar;
