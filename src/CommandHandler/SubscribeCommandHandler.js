import {Colors, CommandInteraction, Webhook} from "discord.js";

import DiscordCommandHandler from "../lib/DiscordCommandHandler.js";
import SubscriptionConfigurationRepository from "../Repository/SubscriptionConfigurationRepository.js";

export default class SubscribeCommandHandler extends DiscordCommandHandler {
    constructor(client) {
        super(client, 'subscribe', 'Subscribes this channel to the latest in-game news.');
    }

    /**
     * @param {CommandInteraction} interaction
     * @returns Promise<void>
     */
    async handle(interaction) {
        if (SubscriptionConfigurationRepository.isChannelSubscribed(interaction.channel.id)) {
            return await interaction.reply({
                ephemeral: true,
                content: 'This channel is already subscribed to the news feed.'
            });
        }

        try {
            /** @type Webhook */
            const webhook = await interaction.channel.createWebhook({
                name: this.getClient().user.username,
                avatar: this.getClient().user.avatarURL(),
                channel: interaction.channelId,
                reason: 'Subscribed to Helldivers 2 In-Game news'
            });

            SubscriptionConfigurationRepository.registerNewSubscription(webhook);

            await interaction.reply({
                embeds: [{
                    title: 'This channel has been subscribed to the in-game news.',
                    description: 'Every new publication will be broadcast here.',
                    color: Colors.Blue,
                    timestamp: new Date()
                }]
            });
        } catch (error) {
            return await interaction.reply({
                ephemeral: true,
                content: 'The bot needs the `MANAGE_WEBHOOKS` permission to continue. - ' + error
            });
        }
    }
}
