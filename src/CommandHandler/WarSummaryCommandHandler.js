import { CommandInteraction, Colors } from "discord.js";
import helldivers2 from "helldivers2-api";
import numFormat from "format-num";

import DiscordCommandHandler from "../lib/DiscordCommandHandler.js";
import Helldivers2CacheRepository from "../Repository/Helldivers2CacheRepository.js";

export default class WarSummaryCommandHandler extends DiscordCommandHandler {
    constructor(client) {
        super(client, 'war_statistics', 'Shows statistics about the current War.');
    }

    /**
     * @param {CommandInteraction} interaction
     * @returns Promise<void>
     */
    async handle(interaction) {
        const currentWarId = await Helldivers2CacheRepository.getCurrentWarId();
        const warSummary = await helldivers2.getWarSummary(currentWarId);

        await interaction.reply({
            embeds: [{
                title: `War Summary - War ${currentWarId}`,
                color: Colors.Gold,
                timestamp: new Date(),
                fields: [
                    {
                        name: '🪐 Galaxy Statistics',
                        value: `Won missions: **${numFormat(warSummary.galaxyStats.wonMissions)}**\n`
                            + `Failed missions: **${numFormat(warSummary.galaxyStats.lostMissions)}**\n`
                            + `Mission success rate: **${numFormat(warSummary.galaxyStats.missionSuccessRate)}%**`
                    }, {
                        name: '💥 Killcount',
                        value: `Terminids killed: **${numFormat(warSummary.galaxyStats.terminidKills)}**\n`
                            + `Automatons killed: **${numFormat(warSummary.galaxyStats.automatonKills)}**\n`
                    }, {
                        name: '⚔️ Combat statistics',
                        value: `Bullets fired: **${numFormat(warSummary.galaxyStats.firedBullets)}**\n`
                            + `Total playtime: **${numFormat((warSummary.galaxyStats.totalPlayTime / 60 / 60 / 24 / 7 / 52).toFixed(2)) } years**`
                    }
                ]
            }]
        })
    }
}
