import CodeBlock from "../../codeBlock";
import {
  typescriptExampleGeographicConsistency,
  typescriptExampleDistanceBased,
  typescriptExampleTemporalValidation,
  typescriptExampleDeviceConsistency,
} from "../../../code";

export const ContextualValidation = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contextual Validation</h1>
      <p className="mb-4">
        While individual field normalization is essential, contextual validation
        examines relationships between different data elements to detect
        inconsistencies that might indicate fraud. This approach is particularly
        effective against sophisticated evasion attacks that use valid
        individual values in implausible combinations.
      </p>
      <p className="mb-4">
        Geographic Consistency is one of the most important contextual
        validations is ensuring geographic coherence across different elements:
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleGeographicConsistency} />
      </div>
      <p className="mb-4">
        A more advanced approach is to validate distance-based plausibility. For
        example, if a customer makes purchases from IP addresses thousands of
        miles apart within minutes:
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleDistanceBased} />
      </div>
      <p className="mb-4">
        The limitation of geographic validation is that legitimate customers do
        travel, use VPNs, or make purchases for people in other countries.
        Overly strict geographic rules may lead to high false positive rates.
      </p>
      <h3 className="text-xl font-bold mt-6 mb-3">Transaction Amounts:</h3>
      <p className="mb-4">
        Temporal validation checks whether time-related aspects of transactions
        are plausible:
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleTemporalValidation} />
      </div>
      <p className="mb-4">
        A limitation is that some legitimate shopping behaviors can trigger
        these rules, such as midnight sales events or a customer making multiple
        purchases in quick succession.
      </p>
      <h3 className="text-xl font-bold mt-6 mb-3">
        {" "}
        Device-Payment Consistency:
      </h3>
      <p className="mb-4">
        Validating the relationship between devices and payment methods:
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExampleDeviceConsistency} />
      </div>
      <p className="mb-4">
        A limitation is distinguishing between legitimate device upgrades and
        potential account takeovers, as many customers naturally use new devices
        with existing payment methods.
      </p>
      <h3 className="text-xl font-bold mt-6 mb-3">
        Limitations of Contextual Validation::
      </h3>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Data Availability:</strong> Contextual validation requires
          historical data, which isn't available for new customers or guest
          checkouts.
        </li>
        <li>
          <strong>Changing Behavior:</strong> Legitimate customer behavior
          changes over time, which can trigger false positives if thresholds are
          too rigid.
        </li>
        <li>
          <strong>Privacy Concerns:</strong> Extensive contextual validation
          requires storing and analysing customer behavior, which raises privacy
          and compliance issues.
        </li>
        <li>
          <strong>Performance Impact:</strong> Complex contextual checks across
          multiple data points can introduce latency in transaction processing.
        </li>
        <li>
          <strong>Adaptation Gap:</strong> Sophisticated fraudsters may
          gradually change behavior to establish a "normal" pattern before
          committing larger fraud.
        </li>
      </ul>
      <h3 className="text-xl font-bold mt-6 mb-3">
        Implementation Considerations:
      </h3>
      <p className="mb-4">
        For effective contextual validation in e-commerce fraud detection:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Use only structured data instead of plain strings for validation
        </li>
        <li>
          Use tiered validation, with stricter rules for higher-risk
          transactions
        </li>
        <li>
          Combine multiple contextual signals rather than relying on any single
          factor
        </li>
        <li>
          Implement adjustable thresholds based on customer tenure and
          transaction history
        </li>
        <li>
          Balance false positives against security by calibrating validation
          strictness
        </li>
        <li>
          Document validation logic clearly to support fraud investigation and
          compliance requirements
        </li>
      </ul>
      <p className="mb-4">
        Contextual validation represents a critical second layer of defense
        after feature normalization, detecting sophisticated fraud attempts that
        might pass individual field validation but create implausible patterns
        when viewed holistically.
      </p>
    </div>
  );
};
