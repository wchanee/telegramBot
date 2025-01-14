import { sendMessage } from './__utils'

export const commandInactive = async ({
	idChat,
	idReplyTo,
	hideReport = true,
}: {
	idReplyTo: number
	idChat: number
	hideReport?: boolean
}) => {
	await sendMessage({
		idChat,
		idReplyTo,
		message: '❌ 请先使用 <b>开工</b> 命令启动记账管理机器人!',
		hideReport,
	})
}
