/**
 * @author AxiFisk
 * @name ChatCommands
 * @description soon:tm:
 * @version 1.0.0
 */

import config from "./config";
import commandHandler from "./lolCommandHandler"

const commands = commandHandler.registerCommands();

async function getUserData(message) {
    if (!message) {
        let res = await fetch("/lol-chat/v1/me");
        let data = await res.json();

        config.update("playerChatId", data.id);
        config.update("summonerId", data.summonerId);

        return;
    }

    config.update("playerChatId", message.data.id);
    config.update("summonerId", message.data.summonerId);

    return;
}

async function getMessage(message) {
    if (message.data.gameTag) {
        config.update("roomId", message.data.id);
    } else if ((message.data.gameName == "") && (message.data.gameTag == "")) {
        config.update("roomId", message.data.id)
    }

    if ((message.data.body) && (message.data.body.startsWith("/")) && (message.data.fromId == config.get("playerChatId"))) {
        const command = commands.filter((c) => c.name == message.data.body.split("/")[1])[0];

        await sendMessage(config.get("roomId"), config.get("playerChatId"), config.get("summonerId"), command.execute(message.data.body.split(" ")));
    }
} 

async function sendMessage(roomId, playerChatId, summonerId, messageContent) {
    await fetch(`/lol-chat/v1/conversations/${roomId}/messages`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fromId: playerChatId,
            fromSummonerId: summonerId,
            isHistorical: false,
            timestamp: new Date().toISOString(),
            body: messageContent,
            type: "chat",
        })
    });
}

export async function init(context) {
    config.init()

    context.socket.observe(
        `/lol-chat/v1/me`,
        async (message) => {
            await getUserData(message);
        }
    );

    context.socket.observe(
        `/lol-chat/v1/conversations`,
        async (message) => {
            await getMessage(message)
        }
    )
}
