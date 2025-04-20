export const AttackVector = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Attack Vector Prioritisation</h1>
    <p className="mb-4">
      Four attack vectors were chosen, analysed and proper risk levels were
      assigned: Evasion Attacks (High), Data Poisoning Attacks (Medium), Privacy
      Attacks (Medium), and Abuse Attacks (Medium). And based on the risk
      profile determined by the organisation, specific attack vectors should be
      prioritised.
    </p>
    <h2 className="text-2xl font-bold mt-6 mb-4">
      Relationship Between Risk Profile and Attack Vectors
    </h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Attack Vectors</th>
            <th className="border px-4 py-2">Low Risk</th>
            <th className="border px-4 py-2">Medium Risk</th>
            <th className="border px-4 py-2">High Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Evasion Attacks</td>
            <td className="border px-4 py-2">Medium</td>
            <td className="border px-4 py-2">High</td>
            <td className="border px-4 py-2">Critical</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Poisoning Attacks</td>
            <td className="border px-4 py-2">Very Low</td>
            <td className="border px-4 py-2">Medium</td>
            <td className="border px-4 py-2">Critical</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Privacy Attacks</td>
            <td className="border px-4 py-2">Low</td>
            <td className="border px-4 py-2">Medium</td>
            <td className="border px-4 py-2">High</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Abuse Attacks</td>
            <td className="border px-4 py-2">Low</td>
            <td className="border px-4 py-2">Medium</td>
            <td className="border px-4 py-2">Medium</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
