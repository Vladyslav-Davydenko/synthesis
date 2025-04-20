import CodeBlock from "../../codeBlock";
import {
  typescriptExamplesContextBasedResponse,
  typescriptExamplesResponseNormalisation,
  typescriptExamplesDecisionMasking,
} from "../../../code";

export const ResponseHdnling = () => {
  const typeExample = `// Types for fraud detection responses
interface RawFraudDetectionResponse {
  transactionId: string;
  decision: 'APPROVE' | 'REVIEW' | 'DENY';
  riskScore: number;          // 0-100 score
  confidenceLevel: number;    // 0-1 probability
  triggeringFactors: string[];
  ruleIds: string[];
  modelVersion: string;
  evaluationTime: number;     // ms to evaluate
}

// Safe external response
interface SafeFraudResponse {
  transactionId: string;
  decision: 'APPROVE' | 'REVIEW' | 'DENY';
}`;
  const basicResponseSanitisation = `
class FraudResponseSanitizer {
  /**
   * Sanitizes third-party response to prevent information leakage
   */
  sanitize(rawResponse: RawFraudDetectionResponse): SafeFraudResponse {
    // Return only essential information, stripping out sensitive data
    return {
      transactionId: rawResponse.transactionId,
      decision: rawResponse.decision
    };
  }
}
`;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Response Handling</h1>
      <p className="mb-4">
        It is very crucial to handle API responses from fraud detection services
        correctly. Because each response can contain different sensitive
        information, it is important to understand the different types of
        responses and how to handle them appropriately. Additionally, these
        responses can differ based on the type of fraud detection service being
        used.
      </p>
      <p className="mb-4">
        Firstly it is required to define the expected response format.
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typeExample} />
      </div>
      <p className="mb-4">
        And then provide a basic response sanitisation function to ensure the
        response is safe to use.
      </p>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={basicResponseSanitisation} />
      </div>
      <h3 className="text-xl font-bold mt-6 mb-3">
        Advanced Response Handling Techniques:
      </h3>
      <p className="mb-4">
        Also there are some advanced techniques that can be used to handle
        responses from fraud detection services.
      </p>
      <h4 className="text-lg font-semibold mt-4 mb-2">
        Context-Based Response Transformation
      </h4>
      <p className="mb-4">
        Provides different levels of information based on who is consuming the
        response. Balances security needs with operational requirements by
        adapting information disclosure based on legitimate need-to-know
        principles. How it works:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Transforms the same raw fraud detection result into different formats
          based on the context
        </li>
        <li>Uses user-friendly language for customer-facing responses</li>
        <li>
          Provides more technical details for internal teams without exposing
          model internals
        </li>
        <li>
          Groups specific fraud triggers into general categories when
          information must be shared
        </li>
      </ul>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExamplesContextBasedResponse} />
      </div>
      <h4 className="text-lg font-semibold mt-4 mb-2">
        Response Normalization Technique
      </h4>
      <p className="mb-4">
        Prevents attackers from gathering intelligence about your fraud
        detection system through timing or response pattern analysis. Attackers
        can't determine which transactions trigger deeper analysis or specific
        rules based on response characteristics. How it works:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Standardizes response timing by adding calculated delays so all
          responses take the same amount of time (e.g., 300ms), regardless of
          actual processing complexity
        </li>
        <li>
          Ensures consistent response structure and size across all decision
          types (approve/review/deny)
        </li>
        <li>
          Adds minor random variations (jitter) to prevent exact pattern
          recognition
        </li>
      </ul>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExamplesResponseNormalisation} />
      </div>
      <h4 className="text-lg font-semibold mt-4 mb-2">
        Decision Masking for High-Risk Transactions
      </h4>
      <p className="mb-4">
        Conceals high-confidence fraud detection to prevent fraudsters from
        learning what triggers denials. It prevents fraudsters from learning
        what specific patterns trigger immediate denials, making it harder to
        circumvent your detection system. How it works:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          For transactions with very high fraud confidence scores, returns a
          "review" decision instead of an outright "deny"
        </li>
        <li>Routes these masked decisions to special handling internally</li>
        <li>
          Maintains different external vs. internal status for certain high-risk
          transactions
        </li>
      </ul>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <CodeBlock code={typescriptExamplesDecisionMasking} />
      </div>
      <h3 className="text-xl font-bold mt-6 mb-3">
        Response Handling Best Practices:
      </h3>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Never Return Raw Scores:</strong> Avoid returning raw risk
          scores or confidence levels that could help attackers calibrate their
          attacks.
        </li>
        <li>
          <strong>Use Consistent Response Times:</strong> Normalize response
          times to prevent timing attacks that could reveal which transactions
          trigger deeper analysis.
        </li>
        <li>
          <strong>Implement Jitter:</strong> Add small random variations to
          response formats and timings to prevent pattern recognition.
        </li>
        <li>
          <strong>Layer Your Response Handling:</strong> Process responses
          through multiple layers of security controls before returning to
          clients.
        </li>
        <li>
          <strong>Log Before Sanitizing:</strong> Always log the complete
          response internally before sanitizing for external use.
        </li>
        <li>
          <strong>Use Generic Error Categories:</strong> Group specific fraud
          triggers into general categories when providing feedback.
        </li>
        <li>
          <strong>Implement Response Signing:</strong> Use HMAC or similar
          techniques to ensure response integrity between services.
        </li>
        <li>
          <strong>Rotate Response Formats:</strong> Periodically change response
          formats to prevent pattern learning.
        </li>
        <li>
          <strong>Use Secure Headers:</strong> Implement security headers like
          Cache-Control to prevent response caching.
        </li>
        <li>
          <strong>Monitor Response Patterns:</strong> Set up analytics to detect
          if certain responses are being targeted disproportionately.
        </li>
      </ul>
      <p className="mb-4">
        By implementing these response handling techniques, you can ensure that
        your e-commerce platform's fraud detection system remains effective
        while preventing information leakage that could be exploited by
        attackers.
      </p>
    </div>
  );
};
