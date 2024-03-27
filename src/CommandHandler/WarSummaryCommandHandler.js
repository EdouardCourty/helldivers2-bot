import { CommandInteraction, Colors } from "discord.js";
import helldivers2 from "helldivers2-api";

import DiscordCommandHandler from "../lib/DiscordCommandHandler.js";

export default class WarSummaryCommandHandler extends DiscordCommandHandler{
    constructor(client) {
        super(client, 'war_summary', 'Shows a summary of the current War.');
    }

    /**
     * @param {CommandInteraction} interaction
     * @returns Promise<void>
     */
    async handle(interaction) {
        const currentWarId = await helldivers2.getCurrentWarId();
        const warSummary = await helldivers2.getWarSummary(currentWarId);

        await interaction.reply({
            embeds: [{
                title: `War Summary - War ${currentWarId}`,
                color: Colors.Gold,
                timestamp: new Date(),
                fields: [
                    {
                        name: 'Galaxy Statistics',
                        value: `Won missions: **${warSummary.galaxyStats.wonMissions}**\n`
                            + `Failed missions: **${warSummary.galaxyStats.lostMissions}**\n`
                            + `Mission success rate: **${warSummary.galaxyStats.missionSuccessRate}%**`
                    }, {
                        name: 'Killcount',
                        value: `Terminids killed: **${warSummary.galaxyStats.terminidKills}**\n`
                            + `Automatons killed: **${warSummary.galaxyStats.automatonKills}**\n`
                    }, {
                        name: 'Combat statistics',
                        value: `Bullets fired: **${warSummary.galaxyStats.firedBullets}**\n`
                            + `Total playtime: **${warSummary.galaxyStats.totalPlayTime}**\n`
                            + `Accuracy: **~${warSummary.galaxyStats.accuracy}%**`
                    }
                ]
            }]
        })
    }
}
