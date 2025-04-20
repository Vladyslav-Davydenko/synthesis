import CodeBlock from "../../codeBlock";
import {
  typescriptExamplesDataIntegrity,
  typescriptExamplesDataTransmission,
  typescriptExamplesAccessControl,
  typescriptExamplesMonitoringDataPipeline,
  typescriptExamplesSanitisation,
  cicdExamplesSAST,
} from "../../../code";

export const DataPipelineSecurity = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Secure Data Pipeline Implementation
      </h1>
      <p className="mb-4">
        As developers integrating third-party fraud detection services into
        e-commerce platforms, you hold a critical responsibility for data
        security. While the AI fraud detection system may be a "black box," you
        control how data flows to and from these services. Here's what you need
        to know:
      </p>
      <p className="mb-4">
        When working with third-party fraud detection services, remember that
        you're still responsible for:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>The security of customer data before it reaches the service</li>
        <li>The integrity of the data pipeline</li>
        <li>How you handle and store the responses</li>
        <li>Who has access to fraud detection capabilities</li>
        <li>Monitoring the entire system for suspicious activity</li>
      </ul>
      <p className="mb-4">
        Even though you can't control how the fraud detection AI works
        internally, you can significantly reduce your attack surface by
        implementing proper security controls around it.
      </p>
      <h3 className="text-xl font-bold mt-6 mb-3">
        Data Privacy and Compliance Considerations
      </h3>
      <p className="mb-4">
        Before sending any transaction data to a fraud detection service, always
        sanitise it to ensure compliance with regulations like GDPR and PCI-DSS:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Never send complete payment card data - it violates PCI-DSS
          requirements
        </li>
        <li>
          Pseudonymize personal identifiers when possible - hash or tokenize
          email addresses and other PII
        </li>
        <li>
          Send only the minimum data needed for fraud detection to work
          effectively
        </li>
        <li>Document your compliance measures for auditing purposes</li>
      </ul>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <CodeBlock code={typescriptExamplesSanitisation} />
      </div>
      <p className="text-sm text-gray-700 mt-2">
        Before sending transaction data, remove full card numbers, CVVs, and
        other sensitive PII. Only send the last 4 digits of cards when
        necessary, and consider hashing identifiers like email addresses.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">
        Implementing Data Integrity Controls
      </h3>
      <p className="mb-4">
        Data integrity ensures that information isn't altered during
        transmission or processing:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Calculate checksums or hashes before sending data</li>
        <li>Use digital signatures to authenticate data sources</li>
        <li>Implement non-repudiation mechanisms</li>
        <li>Keep cryptographic keys secure and rotate them regularly</li>
        <li>Log hash values as part of your audit trail</li>
      </ul>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <CodeBlock code={typescriptExamplesDataIntegrity} />
      </div>
      <p className="text-sm text-gray-700 mt-2">
        Add a checksum to your payload before sending it to the fraud service,
        then verify the integrity of responses by checking digital signatures or
        checksums on received data.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">
        Configuring Secure Data Transmission
      </h3>
      <p className="mb-4">
        Always protect data in transit with proper encryption:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Enforce TLS 1.2 or higher for all API connections</li>
        <li>Implement certificate pinning for third-party services</li>
        <li>Use strong cipher suites and disable deprecated protocols</li>
        <li>Validate server certificates properly</li>
        <li>
          Consider using VPNs or dedicated connections for highly sensitive
          environments
        </li>
      </ul>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <CodeBlock code={typescriptExamplesDataTransmission} />
      </div>
      <p className="text-sm text-gray-700 mt-2">
        Configure your HTTP clients to use TLS 1.2+, verify certificates, and
        possibly implement certificate pinning to prevent man-in-the-middle
        attacks when communicating with fraud detection services.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Managing Access Control</h3>
      <p className="mb-4">
        Restrict access to fraud detection capabilities based on legitimate
        need:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Implement the principle of least privilege</li>
        <li>
          Create separate roles for viewing reports versus modifying rules
        </li>
        <li>
          Use fine-grained permissions rather than broad role-based access
        </li>
        <li>
          Implement proper authentication for all access to fraud detection data
        </li>
        <li>Log all access attempts, both successful and failed</li>
        <li>
          Regularly audit access patterns to detect potential insider threats
        </li>
      </ul>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <CodeBlock code={typescriptExamplesAccessControl} />
      </div>
      <p className="text-sm text-gray-700 mt-2">
        Create specific roles like "Fraud Analyst" with permissions to review
        flagged transactions, while "Customer Support" might only see the final
        decision without detailed risk factors.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">
        Setting Up Effective Monitoring
      </h3>
      <p className="mb-4">Proactive monitoring helps detect attacks early:</p>
      <ul className="list-disc pl-6 mb-6">
        <li>Establish baselines for normal fraud detection patterns</li>
        <li>
          Monitor approval/denial rates to detect potential system manipulation
        </li>
        <li>Set up alerts for unusual transaction volumes or patterns</li>
        <li>
          Track latency and response times as unusual delays could indicate an
          attack
        </li>
        <li>Log all interactions with the fraud detection service</li>
        <li>Create dashboards for real-time visibility</li>
      </ul>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <CodeBlock code={typescriptExamplesMonitoringDataPipeline} />
      </div>
      <p className="text-sm text-gray-700 mt-2">
        Track metrics like approval rate, average risk scores, and processing
        times. Alert security teams when these metrics deviate significantly
        from established baselines.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">
        Best Practices for Response Handling
      </h3>
      <p className="mb-4">
        How you handle fraud detection responses is critical for security:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Normalise response times to prevent timing-based information leakage
        </li>
        <li>
          Mask high-confidence fraud decisions from external systems when
          appropriate
        </li>
        <li>Provide different levels of detail based on user roles</li>
        <li>
          Never expose raw confidence scores or detailed decision factors to
          customers
        </li>
        <li>
          Log complete responses internally but limit what's returned to clients
        </li>
        <li>Implement graceful fallback strategies</li>
      </ul>
      <h3 className="text-xl font-bold mt-6 mb-3">
        Secure CI/CD Pipeline Integration
      </h3>
      <p className="mb-4">
        Your CI/CD pipeline plays a critical role in maintaining security
        throughout the development lifecycle:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Implement automated security scanning for all code that interacts with
          fraud detection systems
        </li>
        <li>
          Enforce security checks as part of your build and deployment process
        </li>
        <li>
          Secure your CI/CD environments and credentials with the same rigor as
          production
        </li>
        <li>
          Scan dependencies for vulnerabilities before deploying fraud detection
          integrations
        </li>
        <li>
          Implement infrastructure-as-code with security configurations
          version-controlled
        </li>
        <li>Automate compliance verification in pre-production environments</li>
      </ul>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <CodeBlock code={cicdExamplesSAST} />
      </div>
      <p className="text-sm text-gray-700 mt-2">
        Configure your CI pipeline to run SAST tools that specifically check for
        data leakage in your fraud detection integration. Implement automated
        tests that verify your response sanitization is working correctly before
        allowing deployment to production.
      </p>

      <p className="mb-4">
        Remember that secure deployment is as important as secure code. Your
        CI/CD pipeline should:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Validate security configurations before deployment</li>
        <li>
          Ensure secrets like API keys for fraud services are properly managed
        </li>
        <li>Include post-deployment security verification</li>
        <li>Support easy rollback if security issues are detected</li>
        <li>Log all deployments for audit trail purposes</li>
      </ul>
      <h3 className="text-xl font-bold mt-6 mb-3">
        Common Security Pitfalls to Avoid
      </h3>
      <ul className="list-disc pl-6 mb-6">
        <li>Sending unfiltered data directly to fraud services</li>
        <li>
          Storing raw fraud detection results in client-accessible storage
        </li>
        <li>Logging sensitive fraud details in accessible locations</li>
        <li>
          Implementing inconsistent error handling that reveals system behavior
        </li>
        <li>Creating backdoor access to fraud systems</li>
        <li>Neglecting to update security configurations</li>
      </ul>
    </div>
  );
};
