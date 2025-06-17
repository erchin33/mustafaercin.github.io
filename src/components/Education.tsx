"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

interface Education {
  school: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  description: string;
}

export default function Education() {
  const [education, setEducation] = useState<Education[]>([
    {
      school: "Anadolu University",
      degree: "Bachelor's",
      field: "Game Design",
      duration: "2016 - 2020",
      location: "Eskişehir, Turkey",
      description: "Graduated with honors, focusing on game mechanics, level design, and user experience."
    }
  ]);

  if (education.length === 0) return null;

  return (
    <section id="education" className="py-4">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="section-title mb-4">Education</h2>
          <Row className="justify-content-center g-4">
            {education.map((edu, index) => (
              <Col key={index} md={8} lg={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="education-card h-100">
                    <div className="card-header">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h3 className="h6 mb-1 text-gradient">{edu.degree}</h3>
                          <h4 className="small mb-0 text-muted">{edu.school}</h4>
                        </div>
                        <span className="badge bg-primary rounded-pill" style={{ color: "#ffffff", fontSize: "0.75rem" }}>{edu.duration}</span>
                      </div>
                    </div>
                    
                    <div className="card-body">
                      <div className="info-row mb-2">
                        <i className="bi bi-book me-2 text-primary"></i>
                        <span className="small">{edu.field}</span>
                      </div>
                      <div className="info-row mb-3">
                        <i className="bi bi-geo-alt me-2 text-primary"></i>
                        <span className="small">{edu.location}</span>
                      </div>
                      <p className="mb-0 small">{edu.description}</p>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
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

        .education-card {
          background: rgba(33, 37, 41, 0.7);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
          max-width: 800px;
          margin: 0 auto;
        }

        .education-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border-color: var(--bs-primary);
        }

        .card-header {
          padding: 1.25rem;
          background: linear-gradient(45deg, rgba(var(--bs-primary-rgb), 0.1), transparent);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-body {
          padding: 1.25rem;
        }

        .info-row {
          display: flex;
          align-items: center;
          color: var(--bs-light);
        }

        .info-row i {
          font-size: 1rem;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .education-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
} 