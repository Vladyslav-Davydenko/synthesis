import { Link } from "react-router-dom";

export const Introduction = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Introduction</h1>
    <p className="mb-4">
      This practical implementation guide is a companion to the theoretical
      framework presented in the thesis "Secure Integration of AI-Powered Fraud
      Detection Systems in E-Commerce: A Security and Compliance Guide." While
      the thesis provides the conceptual foundation and security principles,
      this document offers concrete code examples, implementation patterns, and
      decision frameworks to help developers securely integrate third-party AI
      fraud detection services.
    </p>
    <h2 className="text-2xl font-bold mt-6 mb-4">How to Use The Guide</h2>
    <p className="mb-4">
      This document is structured to follow the same logical flow as the thesis,
      with each section providing practical implementation guidance for the
      corresponding theoretical concepts. Code examples are provided in
      JavaScript and TypeScript, focusing on Node.js environments which are
      commonly used in e-commerce backend applications and easy to understand
      for the wide range of developers.
    </p>
    <div>
      <h3 className="text-xl font-bold mt-6 mb-4">Table of Contents</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <Link to={"/"} className="text-blue-600 hover:underline">
            Introduction
          </Link>
        </li>
        <li>
          <Link
            to={"/decision-framework"}
            className="text-blue-600 hover:underline"
          >
            Decision Framework
          </Link>
        </li>
        <li>
          <Link
            to={"/secure-architecture"}
            className="text-blue-600 hover:underline"
          >
            Secure Architecture Design
          </Link>
        </li>
        <li>
          <Link
            to={"/input-validation"}
            className="text-blue-600 hover:underline"
          >
            Input Validation
          </Link>
        </li>
        <li>
          <Link to={"/api-security"} className="text-blue-600 hover:underline">
            API Security
          </Link>
        </li>
        <li>
          <Link to={"/data-pipeline"} className="text-blue-600 hover:underline">
            Data Pipeline Security
          </Link>
        </li>
        <li>
          <Link
            to={"/monitoring-systems"}
            className="text-blue-600 hover:underline"
          >
            Monitoring and Detection Systems
          </Link>
        </li>
        <li>
          <Link to={"/summary"} className="text-blue-600 hover:underline">
            Summary
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
