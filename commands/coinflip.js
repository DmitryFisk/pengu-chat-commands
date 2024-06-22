function execute() {
    const result = Math.floor(Math.random() * 2);

    return `Flipped side ${result == 0 ? "A" : "B"}`;
}

export default {
    name: "coinflip",
    execute: execute
}