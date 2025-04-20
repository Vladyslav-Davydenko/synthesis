import CodeBlock from "../../codeBlock";
import {
  typescriptExampleClassSeparation,
  typescriptExampleInteraction,
} from "../../../code";

export const SeparationOfConcerns = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Separation of Concerns</h1>
      <p className="mb-4">
        Separation of concerns is a fundamental architectural principle that
        divides a system into distinct components, each responsible for a
        specific aspect of functionality. When integrating AI-powered fraud
        detection systems, this principle is crucial for maintaining security
        boundaries and limiting the impact of potential breaches.
      </p>
      <p className="mb-4">Each class has a single responsibility:</p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleClassSeparation} />
      </div>
      <p className="mb-4">
        Here is the example of their interaction inside the main class:
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleInteraction} />
      </div>
      <p className="mb-4">
        The separation of concerns principle can be extended further through{" "}
        <a
          href="https://learn.microsoft.com/en-us/azure/architecture/microservices/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          microservices architecture
        </a>
        . Components aren't just separate classes within an application but
        completely independent services that communicate through APIs.
      </p>
      <div className="mb-6 flex justify-center items-center">
        <img
          src="/images/microservices-logical.png"
          alt="Separation of Concerns"
        />
      </div>
      <p className="mb-4">
        Each service maintains its own data store and can be independently
        secured, scaled, and updated. This approach creates stronger security
        boundaries than logical separation alone, as each service operates in
        its own isolated environment with strictly controlled interfaces.
      </p>
      <p className="mb-4">
        While more complex to implement than simple component isolation,
        microservices architecture is worth considering for large-scale
        e-commerce platforms where the security benefits of complete isolation
        between fraud detection and payment processing justify the operational
        overhead.
      </p>
    </div>
  );
};
