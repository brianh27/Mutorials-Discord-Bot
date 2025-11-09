import OpenAI from 'openai';
import { EmbedBuilder } from 'discord.js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * Get a response from ChatGPT
 * @param {string} userMessage - The user's message
 * @param {string} systemPrompt - Optional system prompt (default: helpful assistant)
 * @returns {Promise<string>} The AI response
 */
export const getChatGPTResponse = async (userMessage, systemPrompt = "You are a helpful Discord bot assistant.") => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            max_tokens: 500
        });
        
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw error;
    }
};

/**
 * Handle a Discord message with ChatGPT
 * @param {Message} message - Discord message object
 * @param {Client} client - Discord client
 */
export const handleChatGPTMessage = async (message, client) => {
    // Ignore messages from bots
    if (message.author.bot) return;
    
    // Only respond to messages that mention the bot
    if (!message.mentions.has(client.user)) return;
    
    try {
        // Show typing indicator
        await message.channel.sendTyping();
        
        // Get the message content without the bot mention
        const userMessage = message.content.replace(`<@${client.user.id}>`, '').trim();
        
        // Get ChatGPT response
        const reply = await getChatGPTResponse(userMessage);
        
        // Create rich embed
        const embed = new EmbedBuilder()
            .setColor(0x00AE86)
            .setTitle('💬 ChatGPT Response')
            .setDescription(reply)
            .setFooter({ text: `Asked by ${message.author.username}` })
            .setTimestamp();
        
        // Send the response
        await message.reply({ embeds: [embed] });
        console.log(`Responded to: ${userMessage}`);
        
    } catch (error) {
        console.error('Error processing message:', error);
        await message.reply('Sorry, I encountered an error processing your request.');
    }
};

/**
 * Create a rich embed for daily science question
 * @param {string} questionText - The question text from ChatGPT
 * @returns {EmbedBuilder} Discord embed
 */
export const createScienceQuestionEmbed = (questionText) => {
    // Extract subject if present in brackets
    const subjectMatch = questionText.match(/\[(.*?)\]/);
    const subject = subjectMatch ? subjectMatch[1] : 'Science';
    
    // Choose color based on subject
    const colors = {
        'Biology': 0x2ECC71,
        'Physics': 0x3498DB,
        'Chemistry': 0x9B59B6,
        'Earth Science': 0xE67E22,
        'Astronomy': 0x1F3A93,
        'Environmental Science': 0x27AE60
    };
    
    const color = colors[subject] || 0x5865F2;
    
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`🔬 Daily Science Challenge`)
        .setDescription(questionText)
        .addFields(
            { name: '⏱️ Estimated Time', value: '~10 minutes', inline: true },
            { name: '📚 Subject', value: subject, inline: true }
        )
        .setFooter({ text: 'Good luck! Reply with your answer.' })
        .setTimestamp();
    
    return embed;
};
