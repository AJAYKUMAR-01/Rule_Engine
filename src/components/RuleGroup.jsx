import React from "react";
import RuleRow from "./RuleRow";
import { v4 as uuid } from "uuid";
import {MdAdd, MdClose} from "react-icons/md"

const RuleGroup = ({ group, onChange, onDelete }) => {
    const updateRule = (index, newRule) => {
      const updated = [...group.rules];
      updated[index] = newRule;
      onChange({ ...group, rules: updated });
    };
  
    const deleteRule = (index) => {
      const updated = group.rules.filter((_, i) => i !== index);
      onChange({ ...group, rules: updated });
    };
  
    const addCondition = () => {
      const updated = [
        ...group.rules,
        { id: uuid(), attribute: "", operator: "equals", value: "" },
      ];
      onChange({ ...group, rules: updated });
    };
  
    const addGroup = () => {
      const updated = [
        ...group.rules,
        { id: uuid(), operator: "AND", rules: [] },
      ];
      onChange({ ...group, rules: updated });
    };
  
    const updateSubGroup = (index, newSubGroup) => {
      const updated = [...group.rules];
      updated[index] = newSubGroup;
      onChange({ ...group, rules: updated });
    };
  
    const deleteSubGroup = (index) => {
      deleteRule(index);
    };
  
    return (
      <div className="border border-blue-300 p-8 rounded overflow-x-auto">
        <div className="flex items-center mb-1 ">
          <span className="mr-2 font-light text-white text-2sm md:text-xl">Group : </span>
          <select
            value={group.operator}
            onChange={(e) => onChange({ ...group, operator: e.target.value })}
            className="border border-white bg-white px-1 rounded text-sm md:text-base"
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
          {onDelete && (
            <button
              className="ml-auto text-red-500 font-bold"
              onClick={onDelete}
            >
              <MdClose className="rounded w-7 h-7" />
            </button>
          )}
        </div>
  
        {group.rules.map((rule, index) =>
          rule.rules ? (
            <RuleGroup
              key={rule.id}
              group={rule}
              onChange={(newSubGroup) =>
                updateSubGroup(index, newSubGroup)
              }
              onDelete={() => deleteSubGroup(index)}
            />
          ) : (
            <RuleRow
              key={rule.id}
              rule={rule}
              onChange={(newRule) => updateRule(index, newRule)}
              onDelete={() => deleteRule(index)}
            />
          )
        )}
  
        <div className="mt-2 flex gap-2">
          <button
            className="bg-blue-400 text-white px-2 py-1 rounded flex items-center text-sm md:text-base"
            onClick={addCondition}
          >
            <MdAdd /> Condition
          </button>
          <button
            className="bg-green-400 text-white px-2 py-1 rounded flex items-center text-sm md:text-base"
            onClick={addGroup}
          >
            <MdAdd /> Group
          </button>
        </div>
      </div>
    );
  };

export default RuleGroup;