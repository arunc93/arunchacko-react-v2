import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceCollide,
} from "d3-force";

// We use forwardRef + useImperativeHandle so App.jsx can scroll to this section
const Intro02 = forwardRef(({ isDarkMode, onViewProjects }, ref) => {
  const sectionRef = useRef(null);

  // Expose the section ref to parent (App.jsx) so it can scroll to it
  useImperativeHandle(ref, () => ({
    scrollIntoView: (options) => {
      sectionRef.current?.scrollIntoView(options);
    },
    getElement: () => sectionRef.current,
  }));

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const svgRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const simulationRef = useRef(null);
  const draggedNodeRef = useRef(null);

  // === HANDLE WINDOW RESIZE ===
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === GENERATE NETWORK GRAPH ===
  useEffect(() => {
    const generateNetwork = () => {
      const newNodes = [];
      const newLinks = [];
      const centerX = windowWidth / 2;
      const centerY = window.innerHeight / 2 - 100;

      const rows = [
        { y: centerY - 180, count: 9, spread: 500 },
        { y: centerY - 120, count: 11, spread: 580 },
        { y: centerY - 60, count: 10, spread: 620 },
        { y: centerY + 10, count: 12, spread: 680 },
        { y: centerY + 90, count: 10, spread: 600 },
        { y: centerY + 170, count: 8, spread: 480 },
        { y: centerY + 260, count: 5, spread: 300 },
        { y: centerY + 340, count: 3, spread: 150 },
        { y: centerY + 400, count: 1, spread: 0 },
      ];

      let id = 0;
      rows.forEach((row) => {
        for (let i = 0; i < row.count; i++) {
          const offset =
            row.count > 1 ? (i / (row.count - 1) - 0.5) * row.spread : 0;
          newNodes.push({
            id: id++,
            x: centerX + offset + (Math.random() - 0.5) * 80,
            y: row.y + (Math.random() - 0.5) * 40,
            fx: null,
            fy: null,
          });
        }
      });

      // Connect rows
      let nodeIndex = 0;
      for (let r = 0; r < rows.length - 1; r++) {
        const currentRowCount = rows[r].count;
        const nextRowCount = rows[r + 1].count;

        for (let i = 0; i < currentRowCount; i++) {
          const currentNode = nodeIndex + i;
          const targets =
            nextRowCount > currentRowCount
              ? [
                  Math.floor((i * nextRowCount) / currentRowCount),
                  Math.ceil((i * nextRowCount) / currentRowCount),
                ]
              : [i % nextRowCount, (i + 1) % nextRowCount];

          targets.forEach((t) => {
            if (t < nextRowCount) {
              newLinks.push({
                source: currentNode,
                target: nodeIndex + currentRowCount + t,
                strength: 0.7,
              });
            }
          });
        }
        nodeIndex += currentRowCount;
      }

      setNodes(newNodes);
      setLinks(newLinks);
    };

    generateNetwork();
  }, [windowWidth]);

  // === RUN D3 FORCE SIMULATION ===
  useEffect(() => {
    if (nodes.length === 0) return;

    const width = windowWidth;
    const height = window.innerHeight;

    simulationRef.current = forceSimulation(nodes)
      .force(
        "link",
        forceLink(links)
          .distance(10)
          .strength((l) => l.strength || 0.7)
      )
      .force("charge", forceManyBody().strength(-40))
      .force("collision", forceCollide().radius(26))
      .force("center", forceCenter(width * 0.5, height * 0.75))
      .velocityDecay(0.99)
      .on("tick", () => setNodes((nodes) => [...nodes]));

    return () => simulationRef.current?.stop();
  }, [nodes, links, windowWidth]);

  // === PERFECT DRAG BEHAVIOR (Mouse + Touch) ===
  const handleMouseDown = useCallback(
    (node) => (e) => {
      e.stopPropagation();
      if (e.type !== "touchstart") e.preventDefault();

      const svg = svgRef.current;
      if (!svg) return;

      const point = svg.createSVGPoint();
      const getPointerPos = (ev) => {
        const x = ev.touches ? ev.touches[0].clientX : ev.clientX;
        const y = ev.touches ? ev.touches[0].clientY : ev.clientY;
        point.x = x;
        point.y = y;
        return point.matrixTransform(svg.getScreenCTM().inverse());
      };

      const { x, y } = getPointerPos(e);
      node.fx = x;
      node.fy = y;
      draggedNodeRef.current = node;
      simulationRef.current?.alpha(1).restart();

      const handleMove = (moveE) => {
        if (!draggedNodeRef.current) return;
        if (moveE.touches) moveE.preventDefault();
        const pos = getPointerPos(moveE);
        draggedNodeRef.current.fx = pos.x;
        draggedNodeRef.current.fy = pos.y;
        simulationRef.current?.alpha(0.3).restart();
      };

      const handleUp = () => {
        if (draggedNodeRef.current) {
          draggedNodeRef.current.fx = null;
          draggedNodeRef.current.fy = null;
          draggedNodeRef.current = null;
        }
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleUp);
        window.removeEventListener("touchcancel", handleUp);
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleUp);
      window.addEventListener("touchcancel", handleUp);
    },
    []
  );

  // === ROTATING WORD COMPONENT ===
  const RotatingWord = ({ word, index, total }) => {
    const currentIndex = Math.floor(Date.now() / 3000) % total;
    if (index !== currentIndex) return null;

    return (
      <span
        style={{
          fontWeight: "700",
          background: "var(--gradient)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          display: "inline-block",
          whiteSpace: "nowrap",
          paddingRight: "0.15em",
        }}
      >
        {word}
      </span>
    );
  };

  const isMobile = windowWidth < 768;

  return (
    <section
      ref={sectionRef} // This is what allows smooth scroll from navbar
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1.5rem",
        background: "var(--bg-solid)",
        overflow: "hidden",
        scrollMarginTop: "90px", // Prevents navbar from covering content
      }}
    >
      {/* === INTERACTIVE NODE BACKGROUND === */}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.18,
          touchAction: "none",
        }}
      >
        <defs>
          <linearGradient
            id="gradient-line"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Links */}
        {links.map((link, i) => {
          const source =
            typeof link.source === "object" ? link.source : nodes[link.source];
          const target =
            typeof link.target === "object" ? link.target : nodes[link.target];
          if (!source || !target) return null;

          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="url(#gradient-line)"
              strokeWidth="1.2"
              opacity="0.6"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="6"
            fill="#8b5cf6"
            opacity="0.7"
            stroke="#c4b5fd"
            strokeWidth="1.5"
            style={{
              pointerEvents: "all",
              cursor: "grab",
              touchAction: "none",
            }}
            onMouseDown={handleMouseDown(node)}
            onTouchStart={handleMouseDown(node)}
          />
        ))}
      </svg>

      {/* === MAIN CONTENT === */}
      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          padding: "2rem 0",
        }}
      >
        <p
          style={{
            fontSize: isMobile ? "1.9rem" : "2.6rem",
            fontWeight: "700",
            color: isDarkMode ? "#ddd6fe" : "#6d28d9",
            margin: "0 0 0.4rem 0",
            letterSpacing: "0.8px",
          }}
        >
          I'm Arun
        </p>
        <h1
          style={{
            fontSize: isMobile ? "3.4rem" : "4.6rem",
            fontWeight: "900",
            margin: "0.6rem 0 1.8rem",
            lineHeight: "1.05",
            background: "var(--gradient)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "-1.5px",
          }}
        >
          Visual Designer & Developer
        </h1>

        <div
          style={{
            fontSize: isMobile ? "1.25rem" : "1.45rem",
            lineHeight: "1.8",
            color: isDarkMode ? "#cbd5e1" : "#475569",
            maxWidth: "740px",
            margin: "0 auto 3.5rem",
            opacity: 0.95,
            minHeight: "3em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35em",
          }}
        >
          <span style={{ fontWeight: "600" }}>I create</span>

          <span
            style={{
              position: "relative",
              display: "inline-flex",
              height: "1.6em",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {[
              "videos",
              "websites",
              "apps",
              "brands",
              "digital-experiences",
            ].map((word, index) => (
              <RotatingWord key={index} word={word} index={index} total={5} />
            ))}
          </span>

          <span style={{ marginLeft: "-0.4em" }}>.</span>
        </div>

        {/* === VIEW PROJECTS BUTTON – Now uses same smooth scroll === */}
        <button
          onClick={() => onViewProjects?.()}
          style={{
            padding: "1.2rem 3.2rem",
            fontSize: "1.2rem",
            fontWeight: "600",
            color: "white",
            background: "var(--gradient)",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "all 0.4s ease",
            boxShadow: "0 14px 40px rgba(109, 40, 217, 0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow =
              "0 24px 50px rgba(109, 40, 217, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 14px 40px rgba(109, 40, 217, 0.4)";
          }}
        >
          View Projects
        </button>
      </main>
    </section>
  );
});

Intro02.displayName = "Intro02"; // For React devtools

export default Intro02;
