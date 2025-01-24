// import { state } from '@/state'
// import { coerce } from 'zod'
// import { sendMessage } from './__utils'

// export const commandRestore = async ({
// 	idChat,
// 	idReplyTo,
// 	value,
// }: {
// 	value: string | undefined
// 	idChat: number
// 	idReplyTo: number
// }) => {
// 	const value_ = Number(value)
// 	if (
// 		coerce.number().min(0).int().max(state.recordsFiat.length).safeParse(value_)
// 			.success
// 	) {
// 		const record = state.recordsFiat[value_ - 1]
// 		if (record) {
// 			record.condition = 'normal'
// 			await sendMessage({
// 				idChat,
// 				idReplyTo,
// 				message: `✔️ 恢复记录成功！`,
// 			})
// 		}
// 	} else {
// 		await sendMessage({
// 			idChat,
// 			idReplyTo,
// 			message: `❌ 格式错误，正确格式为 restore[恢复id, 例:恢复1],
// 			并且id不可大于记录数量。`,
// 		})
// 	}
// }

import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandRestore = async ({
	idChat,
	idReplyTo,
	value,
}: {
	value: string
	idChat: number
	idReplyTo: number
}) => {
	if (
		!value ||
		!Object.prototype.hasOwnProperty.call(state.recordsFiat, value)
	) {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 restore[恢复id, 例:恢复1], 并且id必须存在于记录中。`,
		})
		return
	}

	const record = state.recordsFiat[value]
	if (record) {
		record.condition = 'normal'
		await sendMessage({
			idChat,
			idReplyTo,
			message: `✔️ 恢复记录成功！`,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 [恢复id, 例:恢复1],
			并且id不可大于记录数量。`,
		})
	}
}
