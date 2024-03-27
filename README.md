# Helldivers 2 Discord Bot

[![ESLint](https://github.com/EdouardCourty/helldivers2-bot/actions/workflows/ESLint.yml/badge.svg)](https://github.com/EdouardCourty/helldivers2-bot/actions/workflows/ESLint.yml)

I'm using PM2 as my deployment tool and ESLint as my linter.<br />
Both config files can be found in the root directory of the project (`ecosystem.config.cjs` & `.eslintrc.json`)

### Commands

- `stats` - Shows the bot's statistics (Uptime, ping)
- `war_info` - Shows informations about the current war
- `war_statistics` - Shows statistics about the current war
- `main_orders` - Displays the war main orders

### Project informations

This project relies on the `helldivers2-api` Node module built by myself. The code can be found [here](https://github.com/EdouardCourty/helldivers2-api).

The current WarId is fetched from the Helldivers 2 API and stored in memory for 10 minutes, then it will be re-fetched.

#### Technical documentation

Every Discord command is declared by creating a new `DiscordCommandHandler` in the `src/CommandHandler`. <br />
Same for the Discord event handlers, which are declared by extending `DiscordEventHandler` in the `src/EventHandler` directory.

### Contributing

Please submit any PR you want to this project. Make sure ESLint is passing.

&copy; Edouard Courty - 2024
