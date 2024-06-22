function execute() {
    const roles = ["Top", "Jungle", "Mid", "ADC", "Support"];

    return `Rolled random role: ${roles[Math.floor(Math.random() * roles.length)]}`;
}

export default {
    name: "role",
    execute: execute
}