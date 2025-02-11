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
		'开工',
		'设置汇率',
		'设置费率',
		'+',
		'-',
		'withdrawSpot',
		'下发',
		'移除',
		'removeSpot',
		'恢复',
		'restoreSpot',
		'收工',
		'上课',
		'下课',
		'显示账单',
		'清除今日账单',
		'清除全部账单',
	]).safeParse(operation)
	if (!success)
		await sendMessage({
			hideReport: true,
			idChat,
			idReplyTo,
			message: `❌ 指令不正确或格式错误！`,
		})

	return success
}
