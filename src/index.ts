import {
	validate,
	commandStart,
	commandNotice,
	commandHelp,
	commandInactive,
	commandRate,
	commandFee,
	commandAdd,
	commandWithdraw,
	commandWithdrawSpot,
	commandIssue,
	commandRemove,
	commandRemoveSpot,
	commandRestart,
	commandRestore,
	commandRestoreSpot,
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
	const command = msg.text.trim()
	const idReplyTo = msg.message_id
	const idUser = msg.from?.id

	const [operation, value = ''] = command.split(' ')

	const data = {
		idChat,
		idReplyTo,
		idUser,
		value,
	}

	const success = await validate({ ...data, operation })

	if (!success) return

	await authorization(data)

	if (operation === '开工') await commandStart(idChat)

	if (operation === '收工') await commandRestart(idChat)

	if (!state.isActive) {
		await commandInactive(data)
		return
	}

	if (operation === '上课') await commandEnableChat(idChat)

	if (operation === '下课') await commandRestrictChat(idChat)

	if (operation === '设置汇率') await commandRate(data)

	if (operation === '设置费率') await commandFee(data)

	if (operation === '+') await commandAdd(data)

	if (operation === '-') await commandWithdraw(data)

	if (operation === 'withdrawSpot') await commandWithdrawSpot(data)

	if (operation === '下发') await commandIssue(data)

	if (operation === '移除') await commandRemove(data)

	if (operation === 'removeSpot') await commandRemoveSpot(data)

	if (operation === '恢复') await commandRestore(data)

	if (operation === 'restoreSpot') await commandRestoreSpot(data)
})

bot.on('callback_query', query => {
	const idChat = query.message?.chat.id

	if (!idChat) return

	if (query.data === 'pdf') commandPDF(idChat)

	if (query.data === 'start') commandStart(idChat)

	if (query.data === 'help') commandHelp(idChat)

	if (query.data === 'notice') commandNotice(idChat)
})
