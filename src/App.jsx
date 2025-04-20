import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Introduction } from "./components/main/Introduction";
import { DecisionFramework } from "./components/main/DecisionFramework/DecisionFramework";
import { SecureArchitecture } from "./components/main/SecureArchitectureDesign/SecureArchitecture";
import { InputValidation } from "./components/main/InputValidation/InputValidation";
import { ApiSecurity } from "./components/main/ApiSecurity/ApiSecurity";
import { DataPipelineSecurity } from "./components/main/DataPipeline/DataPipelineSecurity";
import { MonitoringAndDetection } from "./components/main/MonitoringSystems/MonitoringAndDetection";
import { Summary } from "./components/main/Summary/index";
import { Sidebar } from "./components/sidebar";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/synthesis/" element={<Introduction />} />
            <Route
              path="/synthesis/decision-framework"
              element={<DecisionFramework />}
            />
            <Route
              path="/synthesis/secure-architecture"
              element={<SecureArchitecture />}
            />
            <Route
              path="/synthesis/input-validation"
              element={<InputValidation />}
            />
            <Route path="/synthesis/api-security" element={<ApiSecurity />} />
            <Route
              path="/synthesis/data-pipeline"
              element={<DataPipelineSecurity />}
            />
            <Route
              path="/synthesis/monitoring-systems"
              element={<MonitoringAndDetection />}
            />
            <Route path="/synthesis/summary" element={<Summary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
