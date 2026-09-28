export function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

export function isPositiveNumber(value) {
    return typeof value === "number" && !Number.isNaN(value) && value > 0;
}

export function isNonNegativeInteger(value) {
    return Number.isInteger(value) && value >= 0;
}
