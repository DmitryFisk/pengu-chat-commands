// if only I was good at coding

/* Commands */
import roll from "./commands/roll";
import coinflip from "./commands/coinflip";
import role from "./commands/role";

function registerCommands() {
    const commands = [];

    commands.push(
        {
            name: roll.name,
            execute: roll.execute
        },
        {
            name: coinflip.name,
            execute: coinflip.execute
        },
        {
            name: role.name,
            execute: role.execute
        }
    );

    return commands;
}

export default {
    registerCommands: registerCommands
}