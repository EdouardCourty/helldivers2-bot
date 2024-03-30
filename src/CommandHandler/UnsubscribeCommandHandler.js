import {Colors, CommandInteraction, PermissionFlagsBits} from "discord.js";

import DiscordCommandHandler from "../lib/DiscordCommandHandler.js";
import SubscriptionConfigurationRepository from "../Repository/SubscriptionConfigurationRepository.js";

export default class UnsubscribeCommandHandler extends DiscordCommandHandler {
    constructor(client) {
        super(client, 'unsubscribe', 'Unsubscribes this channel from the in-game news.');
    }

    /**
     * @param {CommandInteraction} interaction
     * @returns Promise<void>
     */
    async handle(interaction) {
        const subscriptionData = SubscriptionConfigurationRepository.removeSubscription(interaction.channel.id);

        if (subscriptionData === null) {
            return await interaction.reply({
                ephemeral: true,
                content: 'This channel was not subscribed to the in-game news.'
            });
        }

        const webhook = await this.getClient().fetchWebhook(subscriptionData['webhookId']);
        await webhook.delete('Unsubscribed from the Helldivers 2 in-game news.');

        await interaction.reply({
            embeds: [{
                title: 'This channel was unsubscribed from the in-game news.',
                color: Colors.DarkBlue,
                timestamp: new Date()
            }]
        });
    }
}
