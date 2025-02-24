import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const bot = new Telegraf(process.env.BOT_TOKEN);
const channelId = '-1002284362919';

bot.start((ctx) => {ctx.reply('Welcome to the bot!',ctx.message)});

bot.on('message', (ctx) => {
    if (ctx.message.forward_from_chat) {
      // Extract the forwarded channel ID
      targetChannelId = ctx.message.forward_from_chat.id;
      ctx.reply(`Forwarded message detected from channel: ${targetChannelId}`);
      
      // Set the flag to true to wait for the next message
      waitingForNextMessage = true;
      ctx.reply("I'll now wait for the next message from this channel.");
    }
  });

  bot.start( async (ctx) => {
    try {
      const message = 'Hello from the bot! This is a test message.';
      await bot.telegram.sendMessage(channelId, message);
      ctx.reply('Message sent to the channel!');
    } catch (err) {
      console.error('Error sending message:', err);
      ctx.reply('Failed to send message to the channel.');
    }
  });

bot.launch()
    .then(() => console.log('Bot is running'))
    .catch((err) => console.error('Failed to launch bot:', err));

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
