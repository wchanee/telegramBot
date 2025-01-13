import { enum as enum_ } from 'zod'
import { sendMessage } from './__utils'

export const validate = async ({
	operation,
	idChat,
	idReplyTo,
}: {
	operation: string | undefined
	idChat: number
	idReplyTo: number
}) => {
	const { success } = enum_([
		'start',
		'rate',
		'fee',
		'add',
		'convert',
		'remove',
		'removeSpot',
		'withdraw',
		'withdrawSpot',
		'restore',
		'restart',
	]).safeParse(operation)
	if (!success)
		await sendMessage({
			hideReport: true,
			idChat,
			idReplyTo,
			message: `指令不正确`,
		})

	return success
}
