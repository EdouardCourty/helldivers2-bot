import fs from "fs";

export default class Configuration {
    static CONFIG_PATH = './data/configuration.json';
    static CONFIG_TEMPLATE_PATH = './data/configuration.template.json';

    static #configuration = null;

    static getConfiguration() {
        if (this.#configuration === null) {
            this.createIfNotExists();

            this.#configuration = JSON.parse(fs.readFileSync('./data/configuration.json').toString());
        }

        return this.#configuration;
    }

    static createIfNotExists() {
        if (fs.existsSync(this.CONFIG_PATH) === false) {
            const templateContent = fs.readFileSync(this.CONFIG_TEMPLATE_PATH).toString();

            fs.writeFileSync(this.CONFIG_PATH, templateContent);
        }
    }
}
