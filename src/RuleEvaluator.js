export function evaluateRuleGroup(group, inputData) {
    const evalFn = group.operator === "AND" ? allTrue : anyTrue;

    const results = group.rules.map((rule) => {
        if (rule.rules) {
            // Recursive call for nested group
            return evaluateRuleGroup(rule, inputData);
        } else {
            // Evaluate single rule
            return evaluateSingleRule(rule, inputData);
        }
    });

    // Handle empty OR group: if OR group has no rules, return false.
    if (group.operator === "OR" && group.rules.length === 0) {
        return false;
    }
    // Handle empty AND group: if AND group has no rules, return true.
    if (group.operator === "AND" && group.rules.length === 0) {
        return true;
    }

    return evalFn(results);
}

function evaluateSingleRule(rule, data) {
    const actual = data[rule.attribute];
    const expected = parseFloat(rule.value);
    const valueToCompare = isNaN(expected) ? rule.value : expected;

    if (actual === undefined) {
        return false; // Handle missing attributes in the data
    }

    switch (rule.operator) {
        case "equals":
            return actual == valueToCompare;
        case "greaterThan":
            return actual > valueToCompare;
        case "greaterThanOrEqual":
            return actual >= valueToCompare;
        case "lessThan":
            return actual < valueToCompare;
        default:
            return false;
    }
}

const allTrue = (arr) => arr.every(Boolean);
const anyTrue = (arr) => arr.some(Boolean);
export default evaluateRuleGroup;