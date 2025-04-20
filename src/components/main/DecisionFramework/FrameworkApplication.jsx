export const FrameworkApplication = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Framework Application Example</h1>
    <p className="mb-4">
      To illustrate the application of this framework, consider an e-commerce
      marketplace with:
    </p>
    <ul className="list-disc pl-6 mb-6">
      <li>1,000 transactions per day (Medium Risk)</li>
      <li>Average transaction value of $100 (Medium Risk)</li>
      <li>Extensive personal data processing (High Risk)</li>
      <li>Third-party payment processing (Low Risk)</li>
    </ul>
    <p className="mb-4">
      Given the high risk factor for personal data processing, this organisation
      should follow the high-risk profile recommendations, with particular
      emphasis on:
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li>
        Comprehensive input validation and API security to prevent evasion
        attacks
      </li>
      <li>
        Enhanced data pipeline security to protect against poisoning attempts
      </li>
      <li>Comprehensive monitoring focusing on privacy protection</li>
    </ul>
    <p className="mb-4">
      This systematic approach ensures that the organisation allocates security
      resources effectively while addressing its specific risk profile and
      regulatory requirements.
    </p>
  </div>
);
