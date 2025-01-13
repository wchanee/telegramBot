import { bot } from '@/bot'
import { state } from '@/state'

export const commandStart = async (idChat: number) => {
	state.isActive = true
	return (
		await bot.sendMessage(
			idChat,
			`📢 <b>记账管理机器人已成功启动！</b>
        欢迎使用您的全方位记账助手。
        
        <b>主要功能：</b>
        1. <b>设置汇率：</b> 使用设置汇率设置当前汇率（例如：<code>设置汇率4.45</code>）。
        2. <b>设置费率：</b> 使用设置费率设置交易费用百分比（例如：<code>设置费率2</code>）。
        3. <b>记录交易：</b>
           - 使用 + 记录入款（例如：<code>+100</code>）。
           - 使用 - 记录扣款（例如：<code>-50</code>）。
           - 使用 取款 记录下发（例如：<code>下发50</code>）。
        4. <b>导出报告：</b> 生成专业的 PDF 报告，详细记录所有交易。
        5. <b>实时状态更新：</b> 查看收入、扣款、下发和未结余额的实时汇总。
        
        <b>使用说明：</b>
           - 请确保在记录交易之前 <b>设置汇率</b> 和 <b>设置费率</b> ，以确保数据准确性。
           - 随时使用 <b>导出 PDF</b> 来查看您的日常财务活动概览。
        
        <b>为什么选择这个机器人？</b>
           - 自动化计算，简化您的会计工作。
           - 交易记录透明、准确。
           - 生成即用的 PDF 报告，方便存档。
        
        🚀 立即开始！使用 <b>开工</b> 启动机器人，使用 <b>收工</b> 安全结束会话。
        `,
			{ parse_mode: 'HTML' }
		),
		await bot.sendMessage(
			idChat,
			`by default rate and fee is 4.45 and 2%
        `,
			{ parse_mode: 'HTML' }
		)
	)
}
