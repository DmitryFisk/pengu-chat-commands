// if only I was good at coding

/* Commands */
import help from "./commands/help";

import coinflip from "./commands/coinflip";
import role from "./commands/role";
import roll from "./commands/roll";

const commands = [];

function registerCommands() {

    commands.push(help, roll, coinflip, role);

    return commands;
}

export default {
    registerCommands: registerCommands,
    commands: commands
};
