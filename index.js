
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { getChatGPTResponse, handleChatGPTMessage, createScienceQuestionEmbed } from './chatgpt.js';

dotenv.config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// Store the channel ID where you want to send messages
const CHANNEL_ID = process.env.CHANNEL_ID; // Add this to your .env file

client.once('clientReady', () => {
    console.log('Bot is online!');
    
    // Send a ChatGPT generated message every 5 seconds
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (channel && channel.isTextBased()) {
                // Ask ChatGPT to generate a challenging science question
                const response = await getChatGPTResponse(
                    `Generate one challenging daily science question. The question should:
                    1. Randomly select from: Biology, Physics, Chemistry, Earth Science, Astronomy, or Environmental Science
                    2. Be difficult enough to require 10+ minutes of thinking/calculation
                    3. Include specific numerical values or scenarios when applicable
                    4. Include the subject area in brackets at the start like [Physics]
                    5. Be clear and detailed

                    Example format:
                    [Physics] A satellite orbits Earth at an altitude of 800 km...`,
                    "You are an expert science educator who creates challenging, thought-provoking questions."
                );
                
                // Create rich embed and send
                const embed = createScienceQuestionEmbed(response);
                await channel.send({ embeds: [embed] });
                console.log(`Sent science question`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, 18000000); // 18000000ms = 5 hours
});

client.login(process.env.DISCORD_TOKEN);

client.on('messageCreate', async (message) => {
    await handleChatGPTMessage(message, client);
});