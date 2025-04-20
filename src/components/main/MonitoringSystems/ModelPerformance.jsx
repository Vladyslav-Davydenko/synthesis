import CodeBlock from "../../codeBlock";
import { typescriptExampleModelPerformance } from "../../../code";

export const ModelPerformance = () => {
  return (
    <>
      <h3 className="text-xl font-bold mt-6 mb-3">
        Model Performance Monitoring
      </h3>
      <p className="mb-4">
        Even though AI services implement their own model performance
        monitoring, developers should add an additional layer to monitor the AI
        system:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>Decision Distribution Tracking:</strong> Monitor the
          distribution of fraud decisions (approve/review/deny) over time to
          detect sudden shifts that might indicate poisoning or evasion attacks
        </li>
        <li>
          <strong>False Positive/Negative Analysis:</strong> Track false
          positive and false negative rates through confirmation feedback loops
          to identify potential degradation in detection accuracy
        </li>
      </ul>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <CodeBlock code={typescriptExampleModelPerformance} />
      </div>
    </>
  );
};
