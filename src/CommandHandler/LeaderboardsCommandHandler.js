import { CommandInteraction, Colors } from "discord.js";
import helldivers2 from "helldivers2-api";

import DiscordCommandHandler from "../lib/DiscordCommandHandler.js";
import Helldivers2CacheRepository from "../Repository/Helldivers2CacheRepository.js";

export default class LeaderboardsCommandHandler extends DiscordCommandHandler {
    constructor(client) {
        super(client, 'leaderboard', 'Shows the leaderboard for the current war.');
    }

    /**
     * @param {CommandInteraction} interaction
     * @returns {Promise<void>}
     */
    async handle(interaction) {
        const currentWarId = await Helldivers2CacheRepository.getCurrentWarId();
        const leaderboard = await helldivers2.getLeaderboard(currentWarId, 1, 9);

        await interaction.reply({
            embeds :[{
                title: `🎖️ Leaderboard - War ${currentWarId}`,
                color: Colors.Purple,
                timestamp: new Date(),
                fields: leaderboard.entries.map(((entry) => {
                    return {
                        name: `${entry.playerName}`,
                        value: `Rank: **#${entry.rank}**\n`
                            + `XP: **${entry.xp}**\n`
                            + `Score: **${entry.score}**`,
                        inline: true
                    };
                }))
            }]
        })
    }
}
