"use client";

import { motion } from "framer-motion";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navigation = () => {
  useScrollTo();
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [logoData, setLogoData] = useState({
    text: "Portfolio",
    colors: {
      start: "#007bff",
      end: "#00ff88"
    }
  });
  
  const navItems = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // For contact section, check if it's in the viewport
          if (section === "contact") {
            return rect.top <= windowHeight * 0.75;
          }
          
          // For other sections, use the standard threshold
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      // If we're at the bottom of the page, set contact as active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection("contact");
      } else {
        setActiveSection(currentSection || "");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar
        bg={scrolled ? "dark" : "transparent"}
        variant="dark"
        expand="lg"
        fixed="top"
        className={`transition-all duration-300 ${scrolled ? "bg-opacity-75 backdrop-blur-sm shadow-lg" : ""}`}
      >
        <Container>
          <Link href="/" className="text-decoration-none">
            <Navbar.Brand 
              className="fw-bold fs-4"
              style={{
                background: `linear-gradient(45deg, ${logoData.colors.start}, ${logoData.colors.end})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              {logoData.text}
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <Nav.Link
                    key={item.name}
                    href={item.href}
                    className={`position-relative px-3 mx-2 ${isActive ? "text-primary" : "text-light"}`}
                    style={{
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="position-absolute bottom-0 start-0 w-100"
                        style={{
                          height: "2px",
                          background: "linear-gradient(45deg, #007bff, #00ff88)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Navigation; 