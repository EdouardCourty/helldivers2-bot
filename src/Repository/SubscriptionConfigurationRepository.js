import { Webhook } from "discord.js";

import Configuration from "../Service/Configuration.js";

export default class SubscriptionConfigurationRepository {
    static getSubscriptions() {
        return Configuration.getConfiguration()['subscriptions'];
    }

    /**
     * @param {Webhook} webhook
     */
    static registerNewSubscription(webhook) {
        const storedData = {
            channelId: webhook.channel.id,
            webhookId: webhook.id,
            guildId: webhook.channel.guild.id,
            webhookUrl: webhook.url
        };

        const configuration = Configuration.getConfiguration();
        configuration.subscriptions.push(storedData);

        Configuration.updateConfiguration(configuration);
    }

    static removeSubscriptionByGuildId(guildId) {
        let config = Configuration.getConfiguration();
        let found = null;

        config['subscriptions'] = config['subscriptions'].filter((subscriptionData) => {
            if (subscriptionData['guildId'] === guildId) {
                found = subscriptionData;

                return false;
            }

            return true;
        });

        Configuration.updateConfiguration(config);

        return found;
    }

    static removeSubscription(channelId) {
        let config = Configuration.getConfiguration();
        let found = null;

        config['subscriptions'] = config['subscriptions'].filter((subscriptionData) => {
            if (subscriptionData['channelId'] === channelId) {
                found = subscriptionData;

                return false;
            }

            return true;
        });

        Configuration.updateConfiguration(config);

        return found;
    }

    static isChannelSubscribed(channelId) {
        this.getSubscriptions().forEach((subscriptionData) => {
            if (subscriptionData['channelId'] === channelId) {
                return true;
            }
        });

        return false;
    }
}
