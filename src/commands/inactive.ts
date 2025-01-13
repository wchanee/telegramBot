import { sendMessage } from './__utils'
import { report } from '@/report'

export const commandInactive = async ({
	idChat,
	idReplyTo,
	message,
	hideReport,
}: {
	idReplyTo: number
	idChat: number
	message: string
	hideReport?: boolean
}) => {
	await sendMessage({
		idChat,
		idReplyTo,
		message: '❌ 请先使用 <b>开工</b> 命令启动机器人!',
	})
}
