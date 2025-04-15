import React from "react";
import {MdDelete} from "react-icons/md"

const RuleRow = ({ rule, onChange, onDelete }) => {
    return (
      <div className="flex gap-2 items-center my-2">
        <input
          className="border rounded font-light border-white bg-white px-2 py-1 min-w-15"
          placeholder="Attribute"
          value={rule.attribute}
          onChange={(e) => onChange({ ...rule, attribute: e.target.value })}
        />
        <select
          className="boarder rounded px-1 py-1  border-white bg-white min-w-15"
          value={rule.operator}
          onChange={(e) => onChange({ ...rule, operator: e.target.value })}
        >
          <option value="equals">Equals</option>
          <option value="greaterThan">GreaterThan</option>
          <option value="greaterThanOrEqual">GreaterThan Or Equal</option>
          <option value="lessThan">LessThan</option>
          <option value="lessThanOrEqual">LessThan Or Equal</option>
        </select>
        <input
          className="boarder rounded px-2 py-1  border-white bg-white min-w-15"
          placeholder="Value"
          value={rule.value}
          onChange={(e) => onChange({ ...rule, value: e.target.value })}
        />
        <button
          onClick={onDelete}
        >
          <MdDelete className="text-red-300 h-7 w-7" />
        </button>
      </div>
    );
  };

export default RuleRow;