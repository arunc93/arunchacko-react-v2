import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const blogPosts = [
  {
    id: "placeholder-blog-01",
    title: "Placeholder Blog Title 01",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "13 May 2026",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-02",
    title: "Placeholder Blog Title 02",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "07 May 2026",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-03",
    title: "Placeholder Blog Title 03",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "30 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-04",
    title: "Placeholder Blog Title 04",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "24 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-05",
    title: "Placeholder Blog Title 05",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "18 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-06",
    title: "Placeholder Blog Title 06",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "11 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-07",
    title: "Placeholder Blog Title 07",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "04 Apr 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-08",
    title: "Placeholder Blog Title 08",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "28 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-09",
    title: "Placeholder Blog Title 09",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "21 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-10",
    title: "Placeholder Blog Title 10",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "14 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-11",
    title: "Placeholder Blog Title 11",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "07 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
  {
    id: "placeholder-blog-12",
    title: "Placeholder Blog Title 12",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder blog summary content.",
    date: "01 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis, massa id pretium vehicula, mauris dolor malesuada velit, at pretium urna magna in lacus.",
      "Suspendisse potenti. Integer ultricies tincidunt sem, non pretium elit pretium non. Nunc pellentesque, sapien et faucibus auctor, velit libero bibendum lorem, vel gravida turpis ipsum id nisi.",
      "Phasellus tincidunt ante a faucibus placerat. Pellentesque vitae justo ut sem feugiat varius sed vitae mauris. Proin tristique augue vel velit dapibus, quis pulvinar sem pulvinar.",
    ],
  },
];

const Blogs = ({ isDarkMode }) => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const selectedPost = blogPosts.find((post) => post.id === blogId);
  const [isBackButtonHovered, setIsBackButtonHovered] = useState(false);

  if (blogId && selectedPost) {
    return (
      <section
        style={{
          minHeight: "100vh",
          padding: "120px 6% 80px",
          background: "var(--bg-solid)",
          color: "var(--text)",
        }}
      >
        <article style={{ maxWidth: "860px", margin: "0 auto" }}>
          <button
            onClick={() => navigate("/blogs")}
            onMouseEnter={() => setIsBackButtonHovered(true)}
            onMouseLeave={() => setIsBackButtonHovered(false)}
            style={{
              marginBottom: "1.4rem",
              padding: "0.55rem 1.05rem",
              borderRadius: "999px",
              border: isBackButtonHovered
                ? "1px solid transparent"
                : "1px solid rgba(148, 163, 184, 0.35)",
              background: isBackButtonHovered ? "var(--gradient)" : "transparent",
              color: isBackButtonHovered ? "#ffffff" : "var(--text)",
              cursor: "pointer",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              transition:
                "all 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
              transform: isBackButtonHovered ? "translateY(-2px)" : "translateY(0)",
              boxShadow: isBackButtonHovered
                ? "0 10px 25px rgba(109, 40, 217, 0.28)"
                : "none",
            }}
          >
            <span aria-hidden="true">←</span>
            Back to Blogs
          </button>
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            style={{
              width: "100%",
              maxHeight: "460px",
              objectFit: "cover",
              borderRadius: "18px",
              border: "1px solid rgba(148, 163, 184, 0.25)",
              marginBottom: "2rem",
            }}
          />
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.2,
              margin: 0,
              marginBottom: "0.85rem",
            }}
          >
            {selectedPost.title}
          </h1>
          <p
            style={{
              marginTop: 0,
              marginBottom: "2rem",
              fontWeight: 600,
              opacity: 0.75,
            }}
          >
            {selectedPost.date}
          </p>
          <div style={{ fontSize: "1.14rem", lineHeight: 1.9 }}>
            {selectedPost.content.map((paragraph, index) => (
              <p key={`${selectedPost.id}-p-${index}`} style={{ marginBottom: "1.5rem" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </section>
    );
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "140px 6% 80px",
        background: "var(--bg-solid)",
        color: "var(--text)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            marginBottom: "1rem",
            background: "var(--gradient)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Blog
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            maxWidth: "750px",
            marginBottom: "2.5rem",
            opacity: 0.9,
          }}
        >
          A collection of ideas, insights, and experiences from my development
          journey. New articles will be added here.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blogs/${post.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                borderRadius: "18px",
                overflow: "hidden",
                background: isDarkMode
                  ? "rgba(30, 41, 59, 0.72)"
                  : "rgba(255, 255, 255, 0.96)",
                boxShadow: isDarkMode
                  ? "0 10px 30px rgba(15, 23, 42, 0.35)"
                  : "0 10px 30px rgba(15, 23, 42, 0.08)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                display: "block",
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: "100%",
                  height: "210px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div
                style={{
                  padding: "1.6rem 1.6rem 1.4rem",
                  minHeight: "220px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "1rem",
                    fontSize: "1.5rem",
                    lineHeight: 1.22,
                    letterSpacing: "-0.2px",
                    color: "var(--text)",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    lineHeight: 1.65,
                    opacity: 0.78,
                    color: "var(--text)",
                  }}
                >
                  {post.excerpt}
                </p>
                <p
                  style={{
                    margin: "auto 0 0",
                    paddingTop: "1.6rem",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    opacity: 0.7,
                    color: "var(--text)",
                  }}
                >
                  {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
