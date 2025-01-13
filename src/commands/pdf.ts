import PDFDocument from 'pdfkit'
import { report } from '@/report'
import path from 'path'
import { fileURLToPath } from 'url'
import { bot } from '@/bot'
import { PassThrough } from 'stream'

export const commandPDF = async (idChat: number) => {
	try {
		const doc = new PDFDocument()

		const __filename = fileURLToPath(import.meta.url)
		const __dirname = path.dirname(__filename)

		const fontPath = path.resolve(__dirname, '../assets/NotoSansCJKsc-VF.ttf')

		const pdfStream = new PassThrough()

		doc.pipe(pdfStream)

		doc.font(fontPath).fontSize(16).text(report(), 100, 100)

		doc.end()
		// https://github.com/yagop/node-telegram-bot-api/issues/1071
		process.env.NTBA_FIX_350 = 'true'
		// Send the PDF to Telegram
		await bot.sendDocument(
			idChat,
			pdfStream,
			{},
			{
				filename: `${new Date().getTime()}.pdf`,
				contentType: 'application/pdf',
			}
		)
	} catch (e) {
		console.error(e)
	}
}
