import Command from "../Command";

const command = new Command("role", "Works only when in lobby. Selects 2 random roles for you", "chat");

command.execute = async () => {
    const rolesMap = new Map([
        ["Top", "TOP"],
        ["Jungle", "JUNGLE"],
        ["Mid", "MIDDLE"],
        ["ADC", "BOTTOM"],
        ["Support", "UTILITY"],
    ]);
    const entries = Array.from(rolesMap.values());
    const randomEntries = getRandomEntries(entries, 2);

    // thanks to molenzwiebel
    const requestData = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstPreference: randomEntries[0],
            secondPreference: randomEntries[1],
        }),
    };

    try {
        await fetch(
            `/lol-lobby/v2/lobby/members/localMember/position-preferences`,
            requestData
        );
    } catch (err) {
        console.error(err);
    }

    return `Rolled 2 random roles: (${randomEntries[0]}) (${randomEntries[1]})`;
};

function getRandomEntries(array, num) {
    const result = [];

    while (result.length < num) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const entry = array[randomIndex];

        if (!result.includes(entry)) {
            result.push(entry);
        }
    }

    return result;
}

export default {
    name: command.name,
    description: command.description,
    execute: command.execute,
    type: command.type,
};
