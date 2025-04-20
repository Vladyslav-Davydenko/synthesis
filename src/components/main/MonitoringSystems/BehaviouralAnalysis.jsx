import CodeBlock from "../../codeBlock/";
import {
  typescriptExampleBehaviouralAnalysisTransationPatterns,
  typescriptExampleBehaviouralAnalysisApiUsage,
} from "../../../code";

export const BehaviouralAnalysis = () => {
  return (
    <>
      <h3 className="text-xl font-bold mt-6 mb-3">Behavioral Analytics</h3>
      <p className="mb-4">
        Unlike traditional security monitoring that focuses on technical
        indicators, fraud detection systems require sophisticated behavioral
        analysis:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>Transaction Pattern Monitoring:</strong> Detect unusual
          patterns in transaction flow that might indicate attack attempts,
          systematic probing, or coordinated fraud campaigns
        </li>
        <li>
          <strong>API Usage Analysis:</strong> Monitor API usage patterns to
          detect extraction or probing attempts by analyzing parameter
          variations and sequence patterns
        </li>
        <li>
          <strong>User Behavior Anomalies:</strong> Track changes in user
          behavior that might indicate account takeover or manipulation of fraud
          feedback systems
        </li>
      </ul>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <CodeBlock
          code={typescriptExampleBehaviouralAnalysisTransationPatterns}
        />
      </div>

      <p className="mb-4">
        The main challenge with behavioral analysis is establishing accurate
        baselines of normal behavior. This process requires:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Specialized data science expertise for creating effective baseline
          models
        </li>
        <li>Substantial data storage and processing infrastructure</li>
        <li>Ongoing maintenance and tuning to reduce false positives</li>
        <li>Gradual implementation phases to manage development complexity</li>
      </ul>

      <p className="mb-4">
        A pragmatic approach is to begin with focused monitoring of high-risk
        areas (such as high-value transactions or administrative API endpoints)
        rather than attempting comprehensive coverage immediately.
      </p>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <CodeBlock code={typescriptExampleBehaviouralAnalysisApiUsage} />
      </div>
    </>
  );
};
