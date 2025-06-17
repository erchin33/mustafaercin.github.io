"use client";

import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  description: string;
  location: string;
}

export default function WorkExperience() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.workExperience) {
        setExperiences(data.workExperience);
      }
    }
  }, []);

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="section-title mb-4">Work Experience</h2>
          <div className="timeline-container position-relative">
            {/* Timeline line */}
            <div 
              className="timeline-line position-absolute"
              style={{
                left: "50%",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "linear-gradient(180deg, var(--bs-primary) 0%, var(--bs-primary) 100%)",
                transform: "translateX(-50%)"
              }}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="timeline-item mb-5 position-relative"
                style={{
                  marginLeft: index % 2 === 0 ? "0" : "50%",
                  marginRight: index % 2 === 0 ? "50%" : "0",
                  paddingLeft: index % 2 === 0 ? "0" : "3rem",
                  paddingRight: index % 2 === 0 ? "3rem" : "0"
                }}
              >
                {/* Timeline dot */}
                <div 
                  className="timeline-dot position-absolute"
                  style={{
                    left: index % 2 === 0 ? "calc(100% + 1.5rem)" : "-1.5rem",
                    top: "1.5rem",
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "50%",
                    background: "var(--bs-primary)",
                    border: "2px solid var(--bs-dark)",
                    zIndex: 1
                  }}
                />

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="timeline-content bg-dark text-light rounded-4 p-4 shadow-lg"
                  style={{
                    position: "relative",
                    zIndex: 0
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h3 className="h5 mb-2 text-gradient">{exp.position}</h3>
                      <h4 className="h6 mb-2">{exp.company}</h4>
                    </div>
                    <span className="badge bg-primary rounded-pill" style={{ color: "#ffffff" }}>{exp.duration}</span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-muted mb-2">
                      <i className="bi bi-geo-alt me-2"></i>
                      {exp.location}
                    </p>
                  </div>
                  
                  <p className="mb-0">{exp.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      <style jsx>{`
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2rem;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background: var(--bs-primary);
          border-radius: 2px;
        }

        .timeline-container {
          padding: 2rem 0;
        }
        
        .timeline-content {
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .timeline-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 0.5rem;
          padding: 1px;
          background: linear-gradient(45deg, var(--bs-primary), transparent);
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        
        @media (max-width: 768px) {
          .timeline-line {
            left: 1.5rem !important;
          }
          
          .timeline-item {
            margin-left: 3rem !important;
            margin-right: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          
          .timeline-dot {
            left: -1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
} 