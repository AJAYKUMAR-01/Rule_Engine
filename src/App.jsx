import React, { useState } from "react";
import RuleGroup from "./components/RuleGroup";
import { evaluateRuleGroup } from "./RuleEvaluator";
import { v4 as uuid } from "uuid";

const App = () => {
  const [rules, setRules] = useState({
    id: uuid(),
    operator: "AND",
    rules: [],
  });
  const [outputColor, setOutputColor] = useState("blue");
  const shadowClassName = `w-full border rounded px-3 py-2 font-mono text-white shadow-xl shadow-${outputColor}-400 border-${outputColor}-300`;
  const [inputJSON, setInputJSON] = useState("{}");
  const [result, setResult] = useState(null);

  const handleEvaluate = () => {
    try {
      const parsed = JSON.parse(inputJSON);
      const passed = evaluateRuleGroup(rules, parsed);
      setOutputColor(passed ? "green" : "red");
      setResult(passed ? "Matched" : "Not Matched");
    } catch (err) {
      setResult("Invalid JSON input");
      setOutputColor("yellow");
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-6 md:mb-10 text-center">Rule Engine</h1>
        <div className="shadow-2xl shadow-blue-400 mb-8 md:mb-12">
          <RuleGroup group={rules} onChange={setRules} />
        </div>
        <div className="mt-4">
          <div>
            <h1 className="font-mono mb-2 text-white text-xl md:text-2xl">Input JSON Data to Verify</h1> 
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between overflow-x-auto">
              <div className="flex items-center mb-2 md:mb-0">
                <p className="rounded w-4 h-4 bg-yellow-400"></p>
                <p className="text-white font-mono px-2 md:px-3 text-sm md:text-base">Invalid JSON Input</p>
              </div>
              <div className="flex items-center mb-2 md:mb-0">
                <p className="rounded w-4 h-4 bg-red-400"></p>
                <p className="text-white font-mono px-2 md:px-3 text-sm md:text-base">Data not Matched</p>
              </div>
              <div className="flex items-center">
                <p className="rounded w-4 h-4 bg-green-400"></p>
                <p className="text-white font-mono px-2 md:px-3 text-sm md:text-base">Data Matched</p>
              </div>
            </div>
          </div>
          <div className="hidden shadow-red-400 border-red-300 shadow-green-400 border-green-300 shadow-yellow-400 border-yellow-300"/>
          <textarea
            rows={6}
            className={shadowClassName}
            value={inputJSON}
            onChange={(e) => {
              setInputJSON(e.target.value);
              setOutputColor("blue");
            }}
          />
        </div>
        <button
          onClick={handleEvaluate}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded w-full md:w-auto cursor-pointer"
        >
          Evaluate Rule
        </button>
      </div>
    </div>
  );
};

export default App;
