import { ContextualValidation } from "./ContextualValidation";
import { NormalisedFeature } from "./NormalisedFeature";

export const InputValidation = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-6">Input Validation</h1>
        <p className="mb-4">
          One of the most critical defenses against feature manipulation attacks
          is proper data validation and normalization. By standardizing inputs,
          e-commerce systems prevent attackers from exploiting variations in
          data representation to bypass fraud detection algorithms. Several key
          input fields require thorough validation:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Transactions amount</li>
          <li>Email addresses</li>
          <li>Phone numbers</li>
          <li>Postal codes</li>
          <li>Payment card information</li>
          <li>Addresses</li>
          <li>Timestamps</li>
          <li>Geographic coordinates</li>
          <li>Device identifiers</li>
        </ul>
        <p className="mb-4">
          Each of these fields should be properly validated on both sides of the
          application, frontend and backend. While frontend validation primarily
          serves as a user experience enhancement by providing immediate
          feedback, it also helps reduce the processing load by filtering out
          unintentional errors before they reach the server.
        </p>
        <p className="mb-4">
          For frontend validation, developers can implement custom logic or
          leverage specialized libraries like{" "}
          <a
            href="https://zod.dev/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {" "}
            Zod
          </a>
          , which provides type-safe validation with minimal code. On the
          backend, where security is paramount, more robust validation is
          essential. While many frameworks offer built-in validation
          capabilities, e-commerce fraud detection often requires additional
          custom validation rules tailored to specific business contexts and
          fraud patterns.
        </p>
        <p className="mb-4">
          Effective validation must balance strictness with usability - rules
          that are too restrictive may create friction for legitimate users,
          while overly permissive validation leaves systems vulnerable to
          manipulation. This validation layer serves as the foundation for the
          contextual validation we'll explore in the following section, where
          relationships between these normalized data elements are examined.
        </p>
      </div>
      <NormalisedFeature />
      <ContextualValidation />
    </>
  );
};
