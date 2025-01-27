import { bot } from '@/bot'
import { state } from '@/state'

export const commandNotice = async (idChat: number) => {
	state.isActive = true
	return await bot.sendMessage(
		idChat,
		`
❗️ <b>温馨提醒</b>
• 输入 开工 激活机器人并开始记账, 输入 收工 停止记录。
• 输入 设置汇率4.45, 即可设置当前交易汇率 (默认值: 1)。
• 输入 设置费率2, 即可设置交易费用百分比 (默认值: 0%）。

📘 <b>示例指令速查表</b>
• 设置汇率: 设置汇率4.45
• 设置费率: 设置费率3
• 入款记录: +100
• 取款记录: -100
• 下发记录: 下发100
• 清除账单: 清除今日账单 (TBC)
• 查看账单: 显示账单 (TBC)
        `,
		{
			parse_mode: 'HTML',
		}
	)
}
