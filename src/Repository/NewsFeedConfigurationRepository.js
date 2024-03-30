import Configuration from "../Service/Configuration.js";

export default class NewsFeedConfigurationRepository {
    static getPublishedNewsFeed() {
        return Configuration.getConfiguration()['publishedNews'];
    }

    static storeNewPublication(newsId) {
        const configuration = Configuration.getConfiguration();

        if (this.hasBeenPublished(newsId) === false) {
            configuration['publishedNews'].push(newsId);
        }

        Configuration.updateConfiguration(configuration);
    }

    static hasBeenPublished(newsId) {
        return this.getPublishedNewsFeed().includes(newsId);
    }
}
