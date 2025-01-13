import TelegramBot from 'node-telegram-bot-api'

export const bot = new TelegramBot(
	'8154324792:AAG2RZukPkuqTwmkm5tQN72qVHTgAKM3d_c',
	{
		polling: true,
	}
)
