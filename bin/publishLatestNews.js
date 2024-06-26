#!/usr/local/bin/node

import helldivers2 from "helldivers2-api";
import dotenv from "dotenv";
import {DiscordAPIError} from "discord.js";

import NewsFeedMessage from "helldivers2-api/src/model/NewsFeedMessage.js";

import NewsFeedConfigurationRepository from "../src/Repository/NewsFeedConfigurationRepository.js";
import SubscriptionConfigurationRepository from "../src/Repository/SubscriptionConfigurationRepository.js";
import {Colors, WebhookClient} from "discord.js";
import Configuration from "../src/Service/Configuration.js";
import Logger from "../src/Service/Logger.js";

dotenv.config();

const currentWarId = await helldivers2.getCurrentWarId();
let latestNews = await fetchNews(currentWarId);

Logger.info(`Found ${latestNews.length} news entries.`);

const subscriptions = SubscriptionConfigurationRepository.getSubscriptions();

for (const latestNew of latestNews) {
    if (false === NewsFeedConfigurationRepository.hasBeenPublished(latestNew.id) && latestNew.message) {
        await publishNews(latestNew);
    }
}

/**
 * @param {NewsFeedMessage} news
 */
async function publishNews(news) {
    for (const subscription of subscriptions) {
        const webhookUrl = subscription['webhookUrl'];

        let webhookClient = null;

        try {
            webhookClient = new WebhookClient({
                url: webhookUrl
            });
            /** @type DiscordAPIError error */
        } catch (error) {
            if (error.code == 'WebhookURLInvalid') {
                Logger.info(`Removing invalid webhook for guild: ${subscription['guildId']}`);

                SubscriptionConfigurationRepository.removeSubscription(subscription['channelId']);
            }

            continue;
        }

        const content = news.message.split('\n');
        const embedContent = {
            title: '📰  New message received from the Super-Earth!',
            color: Colors.Gold,
            timestamp: new Date()
        };

        if (content.length > 1 && content[0].length < 256) {
            embedContent.fields = [{
                name: content[0],
                value: content.slice(1).join('\n')
            }];
        } else {
            embedContent.fields = [{
                name: 'TRANSMISSION TO THE HELLDIVERS',
                value: news.message
            }];
        }

        try {
            await webhookClient.send({ embeds: [embedContent] });
            /** @type DiscordAPIError error */
        } catch (error) {
            if (error.code == 'WebhookURLInvalid') {
                Logger.info(`Removing invalid webhook for guild: ${subscription['guildId']}`);

                SubscriptionConfigurationRepository.removeSubscription(subscription['channelId']);
            }
        }
    }

    NewsFeedConfigurationRepository.storeNewPublication(news.id);
}

async function fetchNews(warId) {
    let tries = 0;

    while (tries < 5) {
        const news = await helldivers2.getWarNewsFeed(warId);
        if (true === !!news[0].message) {
            return news;
        }

        tries++;
    }

    return [];
}
