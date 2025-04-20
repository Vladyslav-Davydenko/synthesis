import { useLocation, Link } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", title: "Introduction" },
    { path: "/decision-framework", title: "Decision Framework" },
    { path: "/secure-architecture", title: "Secure Architecture Design" },
    { path: "/input-validation", title: "Input Validation" },
    { path: "/api-security", title: "API Security Implementation" },
    { path: "/data-pipeline", title: "Data Pipeline Security" },
    { path: "/monitoring-systems", title: "Monitoring Systems" },
    { path: "/summary", title: "Summary" },
  ];

  return (
    <nav className="w-64 bg-gray-800 text-white p-4 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold">
          Secure AI Fraud Detection Integration
        </h1>
        <p className="text-gray-400 text-sm">Vladyslav Davydenko</p>
      </div>
      <ul>
        {navItems.map((item) => (
          <li key={item.path} className="mb-1">
            <Link
              to={item.path}
              className={`block p-2 rounded hover:bg-gray-700 ${
                location?.pathname === item.path ? "bg-blue-600" : ""
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
