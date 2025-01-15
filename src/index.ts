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

// bot.on('message', async msg => {
// 	if (!msg.text) return
// 	const idChat = msg.chat.id
// 	const command = msg.text
// 	const idReplyTo = msg.message_id
// 	const idUser = msg.from?.id

// 	const [operation, value] = command.split(' ')

// 	const data = {
// 		idChat,
// 		idReplyTo,
// 		idUser,
// 		value,
// 	}
// 	const success = await validate({ ...data, operation })

// 	if (!success) return

// 	await authorization(data)

// 	if (operation === 'start') await commandStart(idChat)

// 	if (operation === 'restart') await commandRestart(idChat)

// 	if (!state.isActive) {
// 		await commandInactive(data)
// 		return
// 	}

// 	if (operation === 'rate') await commandRate(data)

// 	if (operation === 'fee') await commandFee(data)

// 	if (operation === 'add') await commandAdd(data)

// 	if (operation === 'convert') await commandConvert(data)

// 	if (operation === 'remove') await commandRemove(data)

// 	if (operation === 'removeSpot') await commandRemoveSpot(data)

// 	if (operation === 'withdraw') await commandWithdraw(data)

// 	if (operation === 'withdrawSpot') await commandWithdrawSpot(data)

// 	if (operation === 'restore') await commandRestore(data)
// })

bot.on('message', async msg => {
	if (!msg.text) return
	const idChat = msg.chat.id
	const command = msg.text
	const idReplyTo = msg.message_id
	const idUser = msg.from?.id

	// Check if the user is an admin or creator
	try {
		await authorization({ idChat, idUser }) // Only admins/creators can proceed
	} catch (error) {
		// Respond to unauthorized users
		await bot.sendMessage(
			idChat,
			`❌ You do not have permission to use this bot.`,
			{ reply_to_message_id: idReplyTo }
		)
		return
	}

	// Split the command and process it
	const [operation, value] = command.split(' ')

	const data = {
		idChat,
		idReplyTo,
		idUser,
		value,
	}

	const success = await validate({ ...data, operation })

	if (!success) return

	// Handle commands based on the operation
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
