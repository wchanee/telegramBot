import {
	commandStart,
	commandNotice,
	commandHelp,
	commandRate,
	commandInactive,
	commandFee,
	commandAdd,
	commandRemove,
	commandWithdraw,
	validate,
	commandRestart,
	commandRestore,
	commandEnableChat,
	commandRestrictChat,
} from '@/commands'
import { bot } from '@/bot'
import { state } from '@/state'
import { authorization } from './authorization'
import { commandPDF } from './commands/pdf'

bot.on('message', async msg => {
	if (!msg.text) return
	const idChat = msg.chat.id
	const command = msg.text
	const idReplyTo = msg.message_id
	const idUser = msg.from?.id

	const [operation, value] = command.split(' ')

	const data = {
		idChat,
		idReplyTo,
		idUser,
		value,
	}
	const success = await validate({ ...data, operation })

	if (!success) return

	await authorization(data)

	if (operation === 'start') await commandStart(idChat)

	if (operation === 'restart') await commandRestart(idChat)

	if (!state.isActive) {
		await commandInactive(data)
		return
	}

	if (operation === '上课') await commandEnableChat(idChat)

	if (operation === '下课') await commandRestrictChat(idChat)

	if (operation === 'rate') await commandRate(data)

	if (operation === 'fee') await commandFee(data)

	if (operation === 'add') await commandAdd(data)

	if (operation === 'remove') await commandRemove(data)

	if (operation === 'withdraw') await commandWithdraw(data)

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
