import { CommandInteraction, Colors } from "discord.js";
import helldivers2 from "helldivers2-api";

import DiscordCommandHandler from "../lib/DiscordCommandHandler.js";
import moment from "moment";
import Helldivers2CacheRepository from "../Repository/Helldivers2CacheRepository.js";

export default class WarInfoCommandHandler extends DiscordCommandHandler {
    constructor(client) {
        super(client, 'war_info', 'Shows informations about the current war.');
    }

    /**
     * @param {CommandInteraction} interaction
     * @returns Promise<void>
     */
    async handle(interaction) {
        const currentWarId = await Helldivers2CacheRepository.getCurrentWarId();
        const warInfo = await helldivers2.getWarInfo(currentWarId);

        await interaction.reply({
            embeds: [{
                title: `📢 Informations - War ${currentWarId}`,
                description: 'Use /war_statistics to see more data about this war!',
                color: Colors.Red,
                timestamp: new Date(),
                fields: [
                    {
                        name: 'War start date',
                        value: moment.unix(warInfo.startDate).format('DD/MM/YYYY'),
                        inline: true
                    }, {
                        name: 'War end date',
                        value: moment.unix(warInfo.endDate).format('DD/MM/YYYY'),
                        inline: true
                    }, {
                        name: 'Planets',
                        value: warInfo.planetInfos.length + ' (Including Super-Earth)'
                    }
                ]
            }]
        })
    }
}
