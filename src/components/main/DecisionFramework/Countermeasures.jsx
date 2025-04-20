export const Countermeasures = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Countermeasures Selection</h1>
    <p className="mb-4">
      The following decision matrix maps attack vectors to recommended
      countermeasures based on organisational risk level:
    </p>
    <h2 className="text-2xl font-bold mt-6 mb-4">
      Mapping Between Organisation Risk Level and Recommended Countermeasures
    </h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Countermeasures</th>
            <th className="border px-4 py-2">Low Risk</th>
            <th className="border px-4 py-2">Medium Risk</th>
            <th className="border px-4 py-2">High Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50">
            <td className="border px-4 py-2 font-bold" colSpan="4">
              Secure Architecture Design
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Defense-in-Depth Strategy</td>
            <td className="border px-4 py-2">Basic</td>
            <td className="border px-4 py-2">Enhanced</td>
            <td className="border px-4 py-2">Comprehensive</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Fallback Mechanism</td>
            <td className="border px-4 py-2">Optional</td>
            <td className="border px-4 py-2">Basic</td>
            <td className="border px-4 py-2">Comprehensive</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Separation of Concerns</td>
            <td className="border px-4 py-2">+</td>
            <td className="border px-4 py-2">+</td>
            <td className="border px-4 py-2">+</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-4 py-2 font-bold" colSpan="4">
              Input Validation
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Normalised Feature Processing</td>
            <td className="border px-4 py-2">Basic</td>
            <td className="border px-4 py-2">Enhanced</td>
            <td className="border px-4 py-2">Comprehensive</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Contextual Validation</td>
            <td className="border px-4 py-2">Optional</td>
            <td className="border px-4 py-2">Optional</td>
            <td className="border px-4 py-2">+</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-4 py-2 font-bold" colSpan="4">
              API Security Implementation
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Authentication & Authorisation</td>
            <td className="border px-4 py-2">Basic</td>
            <td className="border px-4 py-2">Enhanced</td>
            <td className="border px-4 py-2">Comprehensive</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Rate Limiting</td>
            <td className="border px-4 py-2">Fixed</td>
            <td className="border px-4 py-2">Adaptive</td>
            <td className="border px-4 py-2">Advanced</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Response Handling</td>
            <td className="border px-4 py-2">Basic</td>
            <td className="border px-4 py-2">Enhanced</td>
            <td className="border px-4 py-2">Comprehensive</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-4 py-2 font-bold" colSpan="4">
              Data Pipeline Security
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Integrity, Access Control</td>
            <td className="border px-4 py-2">Basic</td>
            <td className="border px-4 py-2">Enhanced</td>
            <td className="border px-4 py-2">Comprehensive</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-4 py-2 font-bold" colSpan="4">
              Monitoring Systems
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Behavioral Analysis</td>
            <td className="border px-4 py-2">Optional</td>
            <td className="border px-4 py-2">Optional</td>
            <td className="border px-4 py-2">Comprehensive</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Performance Monitoring</td>
            <td className="border px-4 py-2">Basic</td>
            <td className="border px-4 py-2">Enhanced</td>
            <td className="border px-4 py-2">Comprehensive</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="mb-4">For each level:</p>
    <ul className="list-disc pl-6 mb-4">
      <li>
        Basic: Implement fundamental controls addressing the most common
        vulnerabilities
      </li>
      <li>
        Enhanced: Add targeted protections against more sophisticated attacks
      </li>
      <li>
        Comprehensive: Implement full protection with advanced detection
        capabilities
      </li>
    </ul>
  </div>
);
