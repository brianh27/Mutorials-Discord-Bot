
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
                // Randomly select a subject (1-4)
                const subjects = ['Biology', 'Physics', 'Chemistry', 'Earth Science'];
                const randomNum = Math.floor(Math.random() * 4) + 1; // Generate random number 1-4
                const selectedSubject = subjects[randomNum - 1];
                
                console.log(`Selected subject: ${selectedSubject} (Random number: ${randomNum})`);
                
                // Ask ChatGPT to generate a challenging science question
                const response = await getChatGPTResponse(
                    `Generate one challenging daily science question in ${selectedSubject}. The question should:
                    1. Be about ${selectedSubject} specifically
                    2. Be difficult enough to require 10+ minutes of thinking/calculation
                    3. Include specific numerical values or scenarios when applicable
                    4. Include the subject area in brackets at the start like [${selectedSubject}]
                    5. Be clear and detailed

                    Example format:
                    [${selectedSubject}] A challenging question about ${selectedSubject}...`,
                    "You are an expert science educator who creates challenging, thought-provoking questions."
                );
                
                // Create rich embed and send
                const embed = createScienceQuestionEmbed(response);
                await channel.send({ embeds: [embed] });
                console.log(`Sent ${selectedSubject} question`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, 5000); // 5000ms = 5 seconds
});

client.login(process.env.DISCORD_TOKEN);

client.on('messageCreate', async (message) => {
    await handleChatGPTMessage(message, client);
});