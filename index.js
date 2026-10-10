const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.CHAT_ID;

const bot = new TelegramBot(token, { polling: false });

async function start() {
  console.log("Iniciando bot...");
  await bot.sendMessage(chatId, "✅ Gemas-bot ONLINE 24h na Render!");
  console.log("Mensagem enviada!");
}

start();

setInterval(() => {
  console.log("Rodando: " + new Date().toLocaleString());
}, 60000);
