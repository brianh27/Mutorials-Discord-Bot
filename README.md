# Mutorials Discord Bot

A Discord bot that generates challenging daily science questions using ChatGPT and responds to user queries with rich embeds.

## Features

- 🔬 **Daily Science Challenges**: Automatically sends challenging science questions every 5 seconds covering Biology, Physics, Chemistry, Earth Science, Astronomy, and Environmental Science
- 💬 **ChatGPT Integration**: Responds to user mentions with AI-generated answers
- 🎨 **Rich Embeds**: Beautiful Discord embeds with color-coding by subject
- ⏱️ **Challenging Questions**: Questions designed to take ~10 minutes to solve

## Setup

1. Clone the repository:
```bash
git clone https://github.com/brianh27/Mutorials-Discord-Bot.git
cd Mutorials-Discord-Bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your credentials:
```
DISCORD_TOKEN=your_discord_bot_token
OPENAI_API_KEY=your_openai_api_key
CHANNEL_ID=your_channel_id
```

4. Run the bot:
```bash
node index.js
```

## Environment Variables

- `DISCORD_TOKEN`: Your Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)
- `OPENAI_API_KEY`: Your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- `CHANNEL_ID`: The Discord channel ID where the bot will send daily questions

## Usage

- The bot automatically sends science questions to the configured channel every 5 seconds
- Mention the bot (`@YourBot your question`) to ask ChatGPT anything
- All responses use rich Discord embeds for better presentation

## Technologies

- Node.js
- Discord.js v14
- OpenAI API (GPT-3.5-turbo)
- ES6 Modules

## License

MIT
