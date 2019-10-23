function shift(values) {
    let value = values.shift();
    if (value === false || value === undefined) {
        return "";
    }
    else if (Array.isArray(value)) {
        return value.join("");
    }
    else {
        return value;
    }
}
export function html(strings, ...values) {
    return strings.reduce((out, cur) => out + shift(values) + cur);
}
//# sourceMappingURL=html.js.map