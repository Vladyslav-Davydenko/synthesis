export const DefenseInDepth = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Defense-in-Depth Strategy</h1>
    <p className="mb-4">
      Defense-in-Depth is a comprehensive security strategy that implements
      multiple layers of protection throughout a system. For AI fraud detection
      integration, this approach is particularly important given the high-value
      nature of financial transactions and the diverse attack vectors.
    </p>
    <p className="mb-4">
      In case of the development, 7 layers of security can be implemented:
    </p>
    <ul className="list-disc pl-6 mb-6">
      <li>
        Input Validation: Validates and normalizes all input data to prevent
        manipulation attacks.
      </li>
      <li>
        Context-Based Checks: Performs checks at external factors and
        relationships between data elements
      </li>
      <li>
        Primary Fraud Detection: Calls the main AI fraud detection service with
        proper rate limiting and authentication.
      </li>
      <li>
        Fallback Services: Implements multiple fallback options if the primary
        service fails.
      </li>
      <li>
        Response Handling: Processes verified results with minimal information
        disclosure.
      </li>
      <li>Logging: Records all transaction processing for audit purposes.</li>
      <li>
        Behavior Monitoring: Tracks transaction patterns for anomaly detection.
      </li>
    </ul>
    <p className="mb-4">
      A comprehensive Defense-in-Depth strategy for fraud detection integration
      should also include:
    </p>
    <h2 className="text-2xl font-bold mt-6 mb-3">
      1. Network-Level Protection
    </h2>
    <ul className="list-disc pl-6 mb-4">
      <li>Implement TLS for all API communications</li>
      <li>Use IP allowlisting for service-to-service communication</li>
      <li>
        Deploy Web Application Firewalls (WAF) to filter malicious traffic
      </li>
    </ul>
    <h2 className="text-2xl font-bold mt-6 mb-3">
      2. Authentication and Authorization
    </h2>
    <ul className="list-disc pl-6 mb-4">
      <li>Implement mutual TLS (mTLS) for service authentication</li>
      <li>Use short-lived, scoped API tokens for each request</li>
      <li>Implement proper RBAC for administrative functions</li>
      <li>Require multi-factor authentication for configuration changes</li>
    </ul>
    <h2 className="text-2xl font-bold mt-6 mb-3">3. Data Protection</h2>
    <ul className="list-disc pl-6 mb-4">
      <li>Encrypt sensitive data at rest and in transit</li>
      <li>Implement data minimization practices</li>
      <li>Use secure key management solutions</li>
      <li>Implement proper data retention and deletion policies</li>
    </ul>
    <h2 className="text-2xl font-bold mt-6 mb-3">4. Operational Security</h2>
    <ul className="list-disc pl-6 mb-4">
      <li>Implement secure CI/CD pipelines with automated security testing</li>
      <li>Conduct regular security reviews of configuration changes</li>
      <li>Develop and practice incident response procedures</li>
      <li>Maintain a vulnerability management program</li>
    </ul>
    <p className="mb-4">
      Applying these multiple layers of security controls, organizations can
      significantly reduce the risk of successful attacks against their fraud
      detection integration. Even if one layer fails, the others continue to
      provide protection, making it substantially more difficult for attackers
      to compromise the system.
    </p>
  </div>
);
