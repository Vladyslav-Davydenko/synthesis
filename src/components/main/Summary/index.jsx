export const Summary = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Summary: Securing Fraud Detection in E-commerce
      </h1>
      <p className="mb-6">
        This practical guide provides developers with comprehensive strategies
        for implementing secure fraud detection integration in e-commerce
        systems. The guide addresses critical security aspects that must be
        maintained when working with third-party AI fraud detection services.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Key Components Covered</h3>

      <div className="mb-6">
        <p className="font-semibold mb-2">Request and Response Handling</p>
        <p className="mb-3">
          The guide details how to properly handle data flowing to and from
          fraud detection services, including techniques for sanitizing
          transaction data, implementing decision confidence filtering, and
          context-based response transformation. The focus is on preventing
          information leakage that could facilitate evasion attacks while
          ensuring that different users receive appropriate levels of
          information based on their role.
        </p>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">Secure Data Pipeline Construction</p>
        <p className="mb-3">
          A robust framework is provided for building secure data pipelines that
          connect to fraud detection services. This includes implementing data
          privacy and compliance checks, ensuring data integrity through
          cryptographic controls, configuring secure data transmission with
          proper TLS implementation, managing access through role-based
          controls, and comprehensive monitoring of the entire pipeline.
        </p>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">CI/CD Security Integration</p>
        <p className="mb-3">
          The guide explains how to incorporate security into the continuous
          integration and continuous deployment pipeline, including automated
          security scanning, dependency checking, and deployment verification.
          This ensures that security is built into the development process
          rather than added as an afterthought.
        </p>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">Monitoring and Detection Systems</p>
        <p className="mb-3">
          Detailed approaches for implementing behavioral analytics and model
          performance monitoring are provided. The guide covers transaction
          pattern monitoring, API usage analysis, user behavior anomaly
          detection, and decision distribution tracking. Implementation
          considerations include minimizing alert fatigue, implementing
          automated responses, maintaining audit trails, and integrating with
          security operations.
        </p>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3">Practical Implementation</h3>
      <p className="mb-4">
        Throughout the guide, practical code examples demonstrate how to
        implement these security controls in a real-world environment. The
        examples focus on TypeScript implementations that can be adapted to
        specific organizational requirements.
      </p>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="mb-2">
          By following this guide, developers can significantly reduce the
          attack surface of their fraud detection integration while maintaining
          clear separation of responsibilities between their application and
          third-party services. The approach acknowledges that while developers
          cannot control the internal workings of "black box" AI systems, they
          can implement comprehensive security controls around the data
          pipelines that connect to these systems.
        </p>
      </div>

      <p className="mb-4">
        This holistic security approach addresses the unique challenges of
        integrating third-party fraud detection services in e-commerce
        applications and provides a foundation for maintaining security as these
        integrations evolve.
      </p>

      <div className="flex justify-center mt-8 mb-4">
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-3 bg-gray-100">
                Security Component
              </th>
              <th className="border border-gray-300 p-3 bg-gray-100">
                Key Benefits
              </th>
              <th className="border border-gray-300 p-3 bg-gray-100">
                Implementation Priority
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-3">
                Request/Response Handling
              </td>
              <td className="border border-gray-300 p-3">
                Prevents information leakage and model inference
              </td>
              <td className="border border-gray-300 p-3">High</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">
                Secure Data Pipeline
              </td>
              <td className="border border-gray-300 p-3">
                Ensures data integrity and privacy compliance
              </td>
              <td className="border border-gray-300 p-3">High</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">CI/CD Security</td>
              <td className="border border-gray-300 p-3">
                Prevents security regression during deployment
              </td>
              <td className="border border-gray-300 p-3">Medium</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3">Monitoring Systems</td>
              <td className="border border-gray-300 p-3">
                Detects attacks and anomalies in real-time
              </td>
              <td className="border border-gray-300 p-3">Medium</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-center italic">
        This guide represents best practices for securing fraud detection
        integrations as of 2025.
      </p>
    </div>
  );
};
