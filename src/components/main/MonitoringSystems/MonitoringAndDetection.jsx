import CodeBlock from "../../codeBlock";
import { BehaviouralAnalysis } from "./BehaviouralAnalysis";
import { ModelPerformance } from "./ModelPerformance";
import { typescriptExampleAutomatedResponse } from "../../../code";

export const MonitoringAndDetection = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Monitoring and Detection Systems
      </h1>
      <p className="mb-4">
        Monitoring and detection systems serve as the last line of defense
        against attackers when all other preventive measures fail. Following
        NIST SP 800-137 and ISO 27001 Annex A.12.4 guidelines, these systems
        provide continuous surveillance and early warning capabilities specific
        to e-commerce fraud detection threats.
      </p>

      <BehaviouralAnalysis />

      <ModelPerformance />
      <h3 className="text-xl font-bold mt-6 mb-3">
        Implementation Considerations
      </h3>
      <p className="mb-4">
        Effective monitoring for e-commerce fraud detection integration should
        address these key considerations:
      </p>

      <div className="mb-6">
        <p className="font-semibold mb-2">Minimize Alert Fatigue</p>
        <p className="mb-2">
          Implement strategies to reduce alert noise and focus on high-priority
          issues:
        </p>
        <ul className="list-disc pl-6">
          <li>Use correlation rules to group related alerts</li>
          <li>Implement tiered alerting with different severity levels</li>
          <li>Tune thresholds based on historical data</li>
          <li>Aggregate similar alerts to reduce volume</li>
        </ul>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">Implement Automated Responses</p>
        <p className="mb-2">
          Create automated remediation actions for common security events:
        </p>
        <div className="bg-gray-100 p-4 rounded-md mt-2">
          <CodeBlock code={typescriptExampleAutomatedResponse} />
        </div>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">Maintain Audit Trails</p>
        <p className="mb-2">
          Comprehensive logging is essential for forensic analysis and
          compliance:
        </p>
        <ul className="list-disc pl-6">
          <li>Log all fraud detection decisions with relevant metadata</li>
          <li>Maintain immutable logs for security-relevant events</li>
          <li>Include contextual information in logs for better analysis</li>
          <li>Ensure log retention periods meet compliance requirements</li>
          <li>Implement secure log storage with access controls</li>
        </ul>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">Integrate with Security Operations</p>
        <p className="mb-2">
          Connect fraud monitoring with broader security operations:
        </p>
        <ul className="list-disc pl-6">
          <li>Feed fraud alerts into centralized SIEM platforms</li>
          <li>Establish clear escalation paths for security incidents</li>
          <li>Create playbooks for fraud-specific security scenarios</li>
          <li>
            Conduct joint security exercises with fraud and security teams
          </li>
          <li>Share threat intelligence across teams</li>
        </ul>
      </div>

      <p className="mb-4">
        By implementing robust monitoring systems that address both technical
        and behavioral aspects of fraud detection, developers can detect and
        respond to attacks that bypass preventive measures. This approach
        completes the security lifecycle by providing visibility into potential
        security incidents and enabling rapid response.
      </p>
    </div>
  );
};
