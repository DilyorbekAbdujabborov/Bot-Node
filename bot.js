require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const webinarLink = process.env.WEBINAR_LINK;
const adminId = process.env.ADMIN_ID;

// Start komandasi
bot.start((ctx) => {
  ctx.reply('Assalomu alaykum! Webinar uchun ro\'yxatdan o\'ting. Iltimos, telefon raqamingizni yuboring.', {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Telefon raqamimni yuborish',
            request_contact: true // Bu foydalanuvchidan telefon raqamini so'rash uchun
          }
        ]
      ],
      one_time_keyboard: true, // Klaviatura faqat bir marta ko'rsatiladi
      resize_keyboard: true // Klaviaturani moslashtirish
    }
  });
});

// Telefon raqamini qabul qilish
bot.on('contact', (ctx) => {
  const phoneNumber = ctx.message.contact.phone_number;
  const userName = ctx.message.from.username || 'Ismi noma\'lum';
  const userId = ctx.message.from.id;

  // Foydalanuvchidan telefon raqami olindi
  ctx.reply(`Rahmat! Telefon raqamingiz: ${phoneNumber}. Webinar uchun maxfiy link: ${webinarLink}`);

  // Adminga foydalanuvchi ma'lumotlarini yuborish
  const userMessage = `
  Yangi foydalanuvchi ro'yxatdan o'tdi:
  Ism: ${userName}
  Telegram ID: ${userId}
  Telefon raqam: ${phoneNumber}
  Webinar linki: ${webinarLink}
  `;

  // Adminga yuborish
  bot.telegram.sendMessage(adminId, userMessage);
});

// Botni ishga tushirish
bot.launch();
bot.telegram.sendMessage(adminId, 'Bot ishga tushdi.');
console.log('Bot ishga tushdi.');
