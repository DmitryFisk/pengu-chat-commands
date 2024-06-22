function execute(args) {
    if (args[1] && !isNaN(args[1])) {
        return `Rolls (1-${args[1]}): ${Math.floor(Math.random(1) * args[1])}`;
    } else {
        return `Rolls (1-100): ${Math.floor(Math.random(1) * 100)}`;
    }
}

export default {
    name: "roll",
    execute: execute
}