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
	commandDisplayReport,
	commandClearTodayReport,
	commandClearAllReport,
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

	// const [operation, value = ''] = command.split(' ')

	const match = command.match(
		/^([+\-*/开工收工上课下课设置汇率设置费率下发移除恢复显示账单清除今日账单清除全部账单]+)(.*)$/
	)
	if (!match) return

	const operation = match[1]
	const value = match[2]?.trim() || ''

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

	if (operation === '显示账单') await commandDisplayReport(data)

	if (operation === '清除今日账单') await commandClearTodayReport(data)

	if (operation === '清除全部账单') await commandClearAllReport(data)
})

bot.on('callback_query', query => {
	const idChat = query.message?.chat.id

	if (!idChat) return

	if (query.data === 'pdf') commandPDF(idChat)

	if (query.data === 'start') commandStart(idChat)

	if (query.data === 'help') commandHelp(idChat)

	if (query.data === 'notice') commandNotice(idChat)
})
