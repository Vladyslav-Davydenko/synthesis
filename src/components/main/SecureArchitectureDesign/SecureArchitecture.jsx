import { DefenseInDepth } from "./DefenseInDepth";
import { FallbackMechanism } from "./FallbackMechanism";
import { SeparationOfConcerns } from "./SeparationOfConcerns";

export const SecureArchitecture = () => (
  <>
    <div>
      <h1 className="text-3xl font-bold mb-6">Secure Architecture Design</h1>
      <p className="mb-4">
        The following sections present code examples and implementation guidance
        for the fundamental security architecture concepts in AI fraud detection
        integration presented in Chapter 5.1 of the main thesis.
      </p>
    </div>
    <DefenseInDepth />
    <FallbackMechanism />
    <SeparationOfConcerns />
  </>
);
