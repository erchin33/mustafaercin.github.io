"use client";

import { Container } from "react-bootstrap";

interface FooterProps {
  copyrightText: string;
}

export default function Footer({ copyrightText }: FooterProps) {
  return (
    <footer className="py-4 text-center">
      <p className="mb-0">{copyrightText}</p>
    </footer>
  );
} 