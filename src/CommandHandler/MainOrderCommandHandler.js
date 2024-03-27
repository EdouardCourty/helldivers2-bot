import { CommandInteraction, Colors } from "discord.js";
import helldivers2 from "helldivers2-api";
import moment from "moment";

import DiscordCommandHandler from "../lib/DiscordCommandHandler.js";
import Helldivers2CacheRepository from "../Repository/Helldivers2CacheRepository.js";

export default class MainOrderCommandHandler extends DiscordCommandHandler{
    constructor(client) {
        super(client, 'main_orders', 'Shows the current war main order.');
    }

    /**
     * @param {CommandInteraction} interaction
     * @returns Promise<void>
     */
    async handle(interaction) {
        const currentWarId = await Helldivers2CacheRepository.getCurrentWarId();
        const mainOrder = await helldivers2.getWarAssignment(currentWarId);

        await interaction.reply({
            embeds: [{
                title: `Main orders - War ${currentWarId}`,
                description: 'The main orders are goals every Helldivers must keep in mind to save Super-Earth.',
                color: Colors.Purple,
                timestamp: new Date(),
                fields: mainOrder.map((assignment, index) => {
                    const currentTimestamp = Math.round(Date.now() / 1000);
                    const finishDate = moment.unix(currentTimestamp + assignment.expiresIn).format('DD/MM/YYYY');

                    return {
                        name: `Assignment ${index + 1}: ${assignment.settings.description}`,
                        value: `Description: **${assignment.settings.brief}**\n`
                            + `Progress: **${assignment.progress}%**\n`
                            + `Finishes on **${finishDate}**`
                    }
                })
            }]
        });
    }
}
