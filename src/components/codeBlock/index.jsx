import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";

const CodeBlock = ({ code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="code-block my-4">
      <pre className="rounded bg-gray-900 p-4 overflow-x-auto">
        <code className={`language-typescript`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
