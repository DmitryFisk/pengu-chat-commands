import Command from "../Command";

const command = new Command("coinflip", "Can't decide? Flip the coin", "chat");

command.execute = () => {
    const result = Math.floor(Math.random() * 2);

    return `Flipped side ${result == 0 ? "A" : "B"}`;
};

export default {
    name: command.name,
    description: command.description,
    execute: command.execute,
    type: command.type
};
