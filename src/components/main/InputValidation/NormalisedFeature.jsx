import CodeBlock from "../../codeBlock";
import {
  typescriptTransactionAmount,
  typescriptExamplePhoneNumber,
  typescriptExampleEmail,
  typescriptExampleAddress,
  typescriptExampleFingerprint,
  typescriptExampleAnomaly,
  typescriptExamplePostalCode,
  typescriptExamplePaymentCard,
} from "../../../code";

export const NormalisedFeature = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Normalised Feature Processing
        </h1>
        <p className="mb-4">
          Most importantly is to validate critical fields that fully participate
          in the transaction processing:
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Transaction Amounts:</h3>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptTransactionAmount} />
        </div>
        <p className="mb-4">
          But for better amount handling it is always better to store amount
          without any decimals meaning instead of saving everything as dollars
          save everything in cents. This approach avoids floating-point
          precision issues that can create vulnerabilities.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Phone Numbers:</h3>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptExamplePhoneNumber} />
        </div>
        <p className="mb-4">
          A limitation of this approach is that it doesn't validate if the phone
          number is actually valid for the given country code. For more robust
          validation, consider using a library like`
          <a
            href=" https://www.npmjs.com/package/libphonenumber-js"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            libphonenumber-js
          </a>
          ` which contains validation rules for phone numbers across different
          countries.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Email Addresses:</h3>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptExampleEmail} />
        </div>
        <p className="mb-4">
          Email validation can be very complex because of the wide variety of
          domains, but it is possible to prepare a set of verified domains to
          validate or use a general validation without checking the domain
          names. However, this can be not very secure, because it allows
          attackers to use temporary mails.
        </p>
        <p className="mb-4">
          Better option is additionally to use tools provided by different
          frameworks like decorators or{" "}
          <a
            href="https://www.npmjs.com/package/class-validator"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            class-validator
          </a>
          . This approach allows to validate email addresses in a more flexible
          way.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-3">Postal Codes:</h3>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptExamplePostalCode} />
        </div>
        <p className="mb-4">
          Postal codes are typically formatted differently across countries, so
          it is important to apply country-specific formatting rules.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Addresses:</h3>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptExampleAddress} />
        </div>
        <p className="mb-4">
          The address hash provides a way to compare addresses that might be
          formatted differently but represent the same location. A limitation is
          that small, insignificant differences (like "Street" vs "St.") will
          produce different hashes.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-3">
          Payment Card Validation :
        </h3>
        <p className="mb-4">
          Payment card data represents one of the most sensitive and regulated
          types of information in e-commerce systems. For small and medium-sized
          businesses, direct handling of full payment card details creates
          significant compliance burdens under PCI DSS (Payment Card Industry
          Data Security Standard) and increases security risks.
        </p>
        <h4 className="text-lg font-bold mt-6 mb-3">
          Third-Party Payment Processors:
        </h4>
        <p className="mb-4">
          For most businesses, the recommended approach is to leverage
          third-party payment processors (such as Stripe, PayPal, or Adyen) that
          handle the actual card processing, reducing both compliance scope and
          security risks. This approach offers several advantages:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>Reduced Compliance Burden:</strong> Third-party processors
            handle most PCI DSS compliance requirements
          </li>
          <li>
            <strong>Lower Security Risk:</strong> Card details are not stored in
            your systems
          </li>
          <li>
            <strong>Specialized Fraud Prevention:</strong> These providers often
            include sophisticated fraud detection tools
          </li>
          <li>
            <strong>Regular Security Updates:</strong>Payment providers
            continuously update their security measures
          </li>
        </ul>
        <p className="mb-4">
          When using third-party processors, your application typically only
          needs to handle tokenized references to payment methods rather than
          actual card details, significantly reducing your security exposure.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-3">
          Card Validation for Fraud Detection:
        </h3>
        <p className="mb-4">
          Even when using third-party processors, your fraud detection system
          may need to validate and normalize certain payment card attributes.
          Here's how to implement basic validation for the card data you might
          still handle:
        </p>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptExamplePaymentCard} />
        </div>
        <h3 className="text-xl font-bold mt-6 mb-3">
          Security Considerations for Card Validation
        </h3>
        <p className="mb-4">
          When implementing card validation even with third-party processors,
          observe these security guidelines:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>Never log full card numbers</strong> in your application,
            even when validating them
          </li>
          <li>
            <strong>Implement proper masking</strong> (e.g., "41XXXXXXXX1234")
            in any interfaces or logs
          </li>
          <li>
            <strong>Use HTTPS/TLS</strong> for all communication involving
            payment data
          </li>
          <li>
            <strong>Minimize data retention</strong> - validate and immediately
            discard sensitive data
          </li>
          <li>
            <strong>Use separate services</strong> for payment validation to
            limit exposure
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3">
          Fraud Detection with Limited Card Data
        </h3>
        <p className="mb-4">
          For fraud detection purposes, the following card attributes can be
          safely used without increasing PCI scope:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>BIN/IIN</strong> (first 6 digits) - Identifies the card
            issuer and can be used for country checking
          </li>
          <li>
            <strong>Last 4 digits</strong> - Useful for card identification
            without exposing the full number
          </li>
          <li>
            <strong>Card type</strong> - Different card types have different
            fraud patterns
          </li>
          <li>
            <strong>Issuing country</strong> - Useful for geographic consistency
            checks
          </li>
          <li>
            <strong>Card level</strong> (business, premium, standard) - May
            indicate different risk profiles
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3">
          Integration with AI Fraud Detection
        </h3>
        <p className="mb-4">
          When integrating with AI fraud detection systems, follow these
          practices for payment card data:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>Data Minimization</strong>: Only send necessary card
            attributes to the fraud detection service
          </li>
          <li>
            <strong>Consistent Formatting</strong>: Ensure card types and other
            attributes are normalized
          </li>
          <li>
            <strong>Contextual Validation</strong>: Check if the card's issuing
            country matches billing address country
          </li>
          <li>
            <strong>Anomaly Detection</strong>: Flag unusual patterns like
            multiple card attempts in quick succession
          </li>
          <li>
            <strong>Velocity Checks</strong>: Monitor the rate of new cards
            being added to an account
          </li>
        </ul>

        <p className="mb-4">
          By leveraging third-party payment processors while implementing
          appropriate validation for fraud detection purposes, businesses can
          balance security requirements with operational efficiency, all while
          maintaining compliance with applicable regulations.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-3">
          Limitations of Normalisation:
        </h3>
        <p className="mb-4">
          While normalisation is essential for preventing feature manipulation
          attacks, several limitations should be considered:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Over-normalisation:</strong> Excessive normalisation might
            remove subtle signals that are actually valuable for fraud
            detection. For example, if an attacker always uses a specific
            unusual email format, normalising it might remove this signal.
          </li>
          <li>
            <strong>Normalisation inconsistencies:</strong> If different systems
            normalise data differently, it can create blind spots at integration
            points. Ensure consistent normalisation across all components.
          </li>
          <li>
            <strong>Regional variations:</strong> What's normal in one region
            may be unusual in another. Consider region-specific normalisation
            rules for international e-commerce.
          </li>
          <li>
            <strong>Performance considerations:</strong> Complex normalisation
            can add latency to transaction processing. Balance thoroughness with
            performance requirements.
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3">Additional Approaches:</h3>
        <p className="mb-4">
          Beyond basic normalisation, consider these advanced techniques:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>Two-step validation:</strong> First normalise, then validate
            against expected patterns or ranges.
          </li>
          <li>
            <strong>Contextual normalisation:</strong> Apply different
            normalisation rules based on the transaction context (e.g., stricter
            rules for high-value transactions).
          </li>
          <li>
            <strong>Fingerprinting:</strong> Generate normalised fingerprints of
            complex data structures for comparison:
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptExampleFingerprint} />
        </div>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Anomaly-aware normalisation:</strong> Flag unusual input
            formats even after normalisation, as the format itself can be a
            signal:
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <CodeBlock code={typescriptExampleAnomaly} />
        </div>
        <p className="mb-4">
          Properly normalised data forms the foundation of effective fraud
          detection, as it ensures that the AI system receives consistent inputs
          regardless of how attackers might try to manipulate feature
          representation.
        </p>
      </div>
    </>
  );
};
