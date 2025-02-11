import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'
import { report } from '../report'

export const commandDisplayReport = async ({
	idChat,
	idReplyTo,
	hideReport = true,
}: {
	idChat: number
	idReplyTo: number
	hideReport?: boolean
}) => {
	const reportMessage = report()
	await sendMessage({
		idChat,
		idReplyTo,
		message: reportMessage,
		hideReport,
	})
}
