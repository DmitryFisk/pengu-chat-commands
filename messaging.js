import config from "./config";
import commandHandler from "./lolCommandHandler";
import { render } from 'https://cdn.jsdelivr.net/npm/nano-jsx/+esm';
const commands = commandHandler.registerCommands();

async function getCommand(message) {
    if (message.data.gameTag) {
        config.update("roomId", message.data.id);
    } else if (message.data.gameName == "" && message.data.gameTag == "") {
        config.update("roomId", message.data.id);
    }

    if (
        message.data.body &&
        message.data.body.startsWith("/") &&
        message.data.fromId == config.get("playerChatId")
    ) {
        const command = commands.filter(
            (c) => c.name == message.data.body.split("/")[1].split(" ")[0]
        )[0];

        switch (command.type) {
            case "chat":
                return await sendMessage(await command.execute(message.data.body.split(" ")));
            case "drawable":
                const draw = command.execute();
                const uikitManager = document.getElementById("lol-uikit-layer-manager-wrapper");
                const root = document.createElement("div");

                render(draw, root);
                uikitManager.appendChild(root);

                const handleCloseButton = document.getElementById("cc-close-window");
                handleCloseButton.onclick = () => draw.remove();
                break;
            default:
                console.log("not implemented yet");
        }
    }
}

async function sendMessage(messageContent) {
    await fetch(`/lol-chat/v1/conversations/${config.get("roomId")}/messages`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fromId: config.get("playerChatId"),
            fromSummonerId: config.get("summonerId"),
            isHistorical: false,
            timestamp: new Date().toISOString(),
            body: messageContent,
            type: "chat",
        }),
    });
}

export default {
    sendMessage: sendMessage,
    getCommand: getCommand
}