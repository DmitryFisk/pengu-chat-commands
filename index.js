/**
 * @author AxiFisk
 * @name ChatCommands
 * @description soon:tm:
 * @version 1.0.1
 */

import config from "./config";
import messaging from "./messaging";

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

export function init(context) {
    config.init();

    context.socket.observe(`/lol-chat/v1/me`, async (message) => {
        await getUserData(message);
    });

    context.socket.observe(`/lol-chat/v1/conversations`, async (message) => {
        await messaging.getCommand(message);
    });
}
