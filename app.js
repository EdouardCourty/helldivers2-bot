import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import EventLoader from "./src/Service/EventLoader.js";
import CommandLoader from "./src/Service/CommandLoader.js";
import Logger from "./src/Service/Logger.js";
import Configuration from "./src/Service/Configuration.js";

dotenv.config();

Logger.info('Starting up');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

Configuration.createIfNotExists();

await EventLoader.loadEventHandlers(client);
await CommandLoader.loadCommands(client);

client.login(process.env.TOKEN).catch((error) => {
    Logger.error(error);
});
