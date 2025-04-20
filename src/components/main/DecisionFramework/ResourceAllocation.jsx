export const ResourceAllocation = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Resource Allocation Guidance</h1>
    <p className="mb-4">
      Organisations should allocate security resources based on their risk
      profile:
    </p>
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-3">High-Risk Organisations:</h2>
      <ul className="list-disc pl-6">
        <li>Dedicated security resources for fraud detection integration</li>
        <li>Regular penetration testing of integration points</li>
        <li>Comprehensive monitoring and response capabilities</li>
      </ul>
    </div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-3">Medium-Risk Organisations:</h2>
      <ul className="list-disc pl-6">
        <li>Security review of fraud detection integration</li>
        <li>Periodic security testing</li>
        <li>Basic monitoring capabilities</li>
      </ul>
    </div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-3">Low-Risk Organisations:</h2>
      <ul className="list-disc pl-6">
        <li>Security checklist verification</li>
        <li>Key control implementation</li>
      </ul>
    </div>
  </div>
);
