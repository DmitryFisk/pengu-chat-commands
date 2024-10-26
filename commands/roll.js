import Command from "../Command";

const command = new Command("roll", "Rolls a random number between 1 and 100 (you can specify your own max value)", "chat");

command.execute = (args) => {
    if (args[1] && !isNaN(args[1])) {
        return `Rolls (1-${args[1]}): ${Math.floor(Math.random(1) * args[1])}`;
    } else {
        return `Rolls (1-100): ${Math.floor(Math.random(1) * 100)}`;
    }
};

export default {
    name: command.name,
    description: command.description,
    execute: command.execute,
    type: command.type
};
