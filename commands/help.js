import Command from "../Command";
import lolCommandHandler from "../lolCommandHandler";

import { jsx } from 'https://cdn.jsdelivr.net/npm/nano-jsx/+esm';

const command = new Command("help", "Displays this message", "drawable");

command.execute = () => {
    const title = "List of commands";
    const message = `<ul> ${listCommands()} </ul>`;
    const buttonText = "Close";

    return jsx/*html*/`
    <div id="modal-container" class="modal" style="position: absolute; inset: 0px; z-index: 850;">
        <lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;" />
        <div class="dialog-alert" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;">
            <lol-uikit-dialog-frame class="dialog-frame" style="z-index: 0;">
            <div class="dialog-content">
                <lol-uikit-content-block class="player-behavior-ban-notification" type="dialog-medium">
                <h4>${title}</h4>
                <hr class="heading-spacer" />
                <p dangerouslySetInnerHTML=${{ __html: message }}></p>
                </lol-uikit-content-block>
            </div>
            <lol-uikit-flat-button-group type="dialog-frame">
                <lol-uikit-flat-button class="button-ok" id="cc-close-window" tabindex="0" primary="true">${buttonText}</lol-uikit-flat-button>
            </lol-uikit-flat-button-group>
            </lol-uikit-dialog-frame>
        </div>
    </div>
  `;
};

function listCommands() {
    let string = "";

    for (let i = 0; i < lolCommandHandler.commands.length; i++) {
        string += `<li> ${lolCommandHandler.commands[i].name} - ${lolCommandHandler.commands[i].description}</li>\n`;
    }

    return string;
}


export default {
    name: command.name,
    description: command.description,
    execute: command.execute,
    type: command.type,
};
