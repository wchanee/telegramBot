import { sendMessage } from './__utils'

export const commandInactive = async ({
	idChat,
	idReplyTo,
}: {
	idReplyTo: number
	idChat: number
}) => {
	await sendMessage({
		idChat,
		idReplyTo,
		message: '❌ 请先使用 开工 命令启动记账管理机器人!',
	})
}
