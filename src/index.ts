import {
	commandStart,
	commandNotice,
	commandHelp,
	commandRate,
	commandInactive,
	commandFee,
	commandAdd,
	commandConvert,
	commandRemove,
	commandRemoveSpot,
	commandWithdraw,
	commandWithdrawSpot,
	validate,
	commandRestart,
	commandRestore,
} from '@/commands'
import { bot } from '@/bot'
import { state } from '@/state'
import { authorization } from './authorization'
import { commandPDF } from './commands/pdf'

bot.on('message', async msg => {
	if (!msg.text) return
	const idChat = msg.chat.id
	const command = msg.text.trim()
	const idReplyTo = msg.message_id
	const idUser = msg.from?.id

	try {
		await authorization({ idChat, idUser }) // Only admins can proceed
	} catch (error) {
		await bot.sendMessage(
			idChat,
			`❌ 您没有权限或权限已过期，请打开机器人申请使用或联系客服授权。`,
			{ reply_to_message_id: idReplyTo }
		)
		return
	}

	// const [operation, value] = command.split(' ')

	// Regex to extract operation and value
	const match = command.match(/^([a-zA-Z]+)(\d+)?$/)
	if (!match) {
		await bot.sendMessage(idChat, `❌ 指令不正确或格式错误`, {
			reply_to_message_id: idReplyTo,
		})
		return
	}

	const operation = match[1] // Command name, e.g., "add"
	const value = match[2] // Optional numeric value, e.g., "100"

	const data = {
		idChat,
		idReplyTo,
		idUser,
		value,
	}

	const success = await validate({ ...data, operation })

	if (!success) return

	if (operation === 'start') await commandStart(idChat)

	if (operation === 'restart') await commandRestart(idChat)

	if (!state.isActive) {
		await commandInactive(data)
		return
	}

	if (operation === 'rate') await commandRate(data)

	if (operation === 'fee') await commandFee(data)

	if (operation === 'add') await commandAdd(data)

	if (operation === 'convert') await commandConvert(data)

	if (operation === 'remove') await commandRemove(data)

	if (operation === 'removeSpot') await commandRemoveSpot(data)

	if (operation === 'withdraw') await commandWithdraw(data)

	if (operation === 'withdrawSpot') await commandWithdrawSpot(data)

	if (operation === 'restore') await commandRestore(data)
})

bot.on('callback_query', query => {
	const idChat = query.message?.chat.id

	if (!idChat) return

	if (query.data === 'pdf') commandPDF(idChat)

	if (query.data === 'start') commandStart(idChat)

	if (query.data === 'help') commandHelp(idChat)

	if (query.data === 'notice') commandNotice(idChat)
})
