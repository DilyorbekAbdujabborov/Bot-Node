require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const webinarLink = process.env.WEBINAR_LINK;
const adminId = process.env.ADMIN_ID;
const defaultText = "Assalomu alaykum! Webinar uchun ro'yxatdan o'ting. Iltimos, telefon raqamingizni yuboring.";

// Start komandasi
bot.start((ctx) => {
  const welcomeText = process.env.TEXT || defaultText;
  ctx.reply(welcomeText, {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Telefon raqamimni yuborish',
            request_contact: true
          }
        ]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  });
});

// Telefon raqamini qabul qilish
bot.on('contact', (ctx) => {
  const phoneNumber = ctx.message.contact.phone_number;
  const userName = ctx.message.from.username || 'Ismi noma\'lum';
  const userId = ctx.message.from.id;

  ctx.reply(`Rahmat! Telefon raqamingiz: ${phoneNumber}. Webinar uchun maxfiy link: ${webinarLink}`);

  const userMessage = `
  Yangi foydalanuvchi ro'yxatdan o'tdi:
  Ism: ${userName}
  Telegram ID: ${userId}
  Telefon raqam: ${phoneNumber}
  Webinar linki: ${webinarLink}
  `;

  bot.telegram.sendMessage(adminId, userMessage);
});

bot.launch();
console.log('Bot ishga tushdi.');
bot.telegram.sendMessage(adminId, 'Bot ishga tushdi.');
