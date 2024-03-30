import axios from "axios";
import helldivers2 from "helldivers2-api";
import dotenv from "dotenv";

import NewsFeedMessage from "helldivers2-api/src/model/NewsFeedMessage.js";

import NewsFeedConfigurationRepository from "../src/Repository/NewsFeedConfigurationRepository.js";
import SubscriptionConfigurationRepository from "../src/Repository/SubscriptionConfigurationRepository.js";
import {Colors, WebhookClient} from "discord.js";

dotenv.config();

const currentWarId = await helldivers2.getCurrentWarId();
const latestNews = await helldivers2.getWarNewsFeed(currentWarId);
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

        const webhookClient = new WebhookClient({
            url: webhookUrl
        });

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

        await webhookClient.send({ embeds: [embedContent] });
    }

    NewsFeedConfigurationRepository.storeNewPublication(news.id);
}