import DiscordCommandHandler from "../lib/DiscordCommandHandler.js";
import {Colors, CommandInteraction} from "discord.js";

export default class HelpCommandHandler extends DiscordCommandHandler {
    constructor(client) {
        super(client, 'help', 'Shows the support information');
    }

    /**
     * @param {CommandInteraction} interaction
     * @returns Promise<void>
     */
    async handle(interaction) {
        await interaction.reply({
            ephemeral: true,
            embeds: [{
                author: {
                    name: this.getClient().user.username,
                    icon_url: this.getClient().user.avatarURL(),
                    url: 'https://discord.com/oauth2/authorize?client_id=1222511267655450787'
                },
                title: 'Support Informations',
                description: 'If you need anything, please contact me directly via Discord or submit an issue on GitHub.',
                fields: [
                    { name: 'Author', value: 'php_sensei - <@486262563948986401>' },
                    { name: 'GitHub', value: 'https://github.com/EdouardCourty/helldivers2-bot' }
                ],
                timestamp: new Date(),
                color: Colors.Fuchsia
            }]
        });
    }
}
