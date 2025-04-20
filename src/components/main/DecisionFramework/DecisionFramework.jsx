import { AttackVector } from "./AttackVector";
import { Countermeasures } from "./Countermeasures";
import { FrameworkApplication } from "./FrameworkApplication";
import { ResourceAllocation } from "./ResourceAllocation";
import { RiskProfile } from "./RiskProfile";

export const DecisionFramework = () => (
  <>
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Decision Framework for Organisations
      </h1>
      <p className="mb-4">
        The security countermeasures presented in Chapter 5 of the main thesis
        represent a comprehensive approach to securing fraud detection
        integrations. However, organisations have different risk profiles,
        resource constraints, and security needs. The decision framework was
        designed to provide a structured approach to help organisations
        determine which security measures to prioritise based on their specific
        circumstances.
      </p>
    </div>
    <RiskProfile />
    <AttackVector />
    <Countermeasures />
    <ResourceAllocation />
    <FrameworkApplication />
  </>
);
