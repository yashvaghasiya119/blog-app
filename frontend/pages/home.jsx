import React, { useEffect } from "react";
import "./style/home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "../componets/navbar";

export function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="home">
        <header className="hero" data-aos="fade-down">
          <h1>Welcome to My Blog</h1>
          <p>
            Insights, stories, and tutorials from the world of web development.
          </p>
          <button className="read-btn">Read Latest Posts</button>
        </header>

        <section className="features">
          <h2 data-aos="fade-up">Featured Posts</h2>
          <div className="post-list">
            <div className="post-card" data-aos="zoom-in-up">
              <h3>Getting Started with React</h3>
              <p>
                Learn how to set up your first React project and build components.
              </p>
              <button>Read More</button>
            </div>
            <div className="post-card" data-aos="zoom-in-up" data-aos-delay="100">
              <h3>Why JavaScript is Awesome</h3>
              <p>
                Understand the power and flexibility of JavaScript for web apps.
              </p>
              <button>Read More</button>
            </div>
            <div className="post-card" data-aos="zoom-in-up" data-aos-delay="200">
              <h3>Top 10 VS Code Extensions</h3>
              <p>
                Boost your productivity with these must-have extensions for coding.
              </p>
              <button>Read More</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
