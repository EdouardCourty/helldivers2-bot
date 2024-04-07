import DiscordEventHandler from "../lib/DiscordEventHandler.js";
import { Guild } from "discord.js";
import SubscriptionConfigurationRepository from "../Repository/SubscriptionConfigurationRepository.js";

export default class GuildRemoveEventHandler extends DiscordEventHandler {
    constructor(client) {
        super(client, 'guildDelete');
    }

    /**
     * @param {Guild} guild
     * @returns Promise<void>
     */
    async handle(guild) {
        SubscriptionConfigurationRepository.removeSubscriptionByGuildId(guild.id);
    }
}
