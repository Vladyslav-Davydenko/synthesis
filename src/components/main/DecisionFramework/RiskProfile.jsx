export const RiskProfile = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Risk Profile Determination</h1>
    <p className="mb-4">
      The first step in applying the framework is to assess the organisation's
      risk profile based on 2 main factors:
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li className="mb-2">
        <strong>Transaction Characteristics:</strong>
        <ol className="list-decimal pl-6 mt-1">
          <li>Volume: The number of transactions per day</li>
          <li>Value: The average transaction amount</li>
        </ol>
      </li>
      <li className="mb-2">
        <strong>Regulatory Requirements:</strong>
        <ol className="list-decimal pl-6 mt-1">
          <li>Payments: The payment card handling (PCI DSS applicability)</li>
          <li>
            Personal Data: The personal data processing (GDPR, CCPA, etc.)
          </li>
        </ol>
      </li>
    </ul>
    <h2 className="text-2xl font-bold mt-6 mb-4">Risk Classification Matrix</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Factor</th>
            <th className="border px-4 py-2">Low Risk</th>
            <th className="border px-4 py-2">Medium Risk</th>
            <th className="border px-4 py-2">High Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Volume</td>
            <td className="border px-4 py-2">&lt; 100 req / day</td>
            <td className="border px-4 py-2">100 – 10,000 req / day</td>
            <td className="border px-4 py-2">&gt; 10,000 req / day</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Value</td>
            <td className="border px-4 py-2">&lt; $100</td>
            <td className="border px-4 py-2">$100 – $1,000</td>
            <td className="border px-4 py-2">&gt; $1,000</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Payments</td>
            <td className="border px-4 py-2">Third-party only</td>
            <td className="border px-4 py-2">Mixed approach</td>
            <td className="border px-4 py-2">Self-processing</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Personal Data</td>
            <td className="border px-4 py-2">Minimal</td>
            <td className="border px-4 py-2">Moderate</td>
            <td className="border px-4 py-2">Extensive</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="mb-4">
      Organisations must evaluate their risk profile based on the highest risk
      level they encounter in any critical category.
    </p>
  </div>
);
