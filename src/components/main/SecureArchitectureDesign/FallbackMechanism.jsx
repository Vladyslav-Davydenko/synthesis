import CodeBlock from "../../codeBlock/";
import { typescriptExampleFallbackMechanism } from "../../../code";

export const FallbackMechanism = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Fallback Mechanism</h1>
      <p className="mb-4">
        A robust fallback system provides resiliency when the primary fraud
        detection service is unavailable:
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleFallbackMechanism} />
      </div>
      <p className="mb-4">Key security benefits:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Defense-in-depth approach with multiple fallback layers</li>
        <li>Alert mechanisms for service degradation</li>
        <li>Transaction processing continuity even during service outages</li>
      </ul>
    </div>
  );
};
