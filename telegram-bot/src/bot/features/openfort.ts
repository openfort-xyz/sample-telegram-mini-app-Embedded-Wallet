/* eslint-disable node/prefer-global/process */
import { Composer, InlineKeyboard } from 'grammy'
import { config } from 'dotenv'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'

config()

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('start', logHandle('command-start'), async (ctx) => {
  const keyboard = new InlineKeyboard().webApp(
    'Launch App',
    `${
      process.env.FRONTEND_APP_ORIGIN
    }/login/telegram`,
  )
  return ctx.reply('Click to launch.', { reply_markup: keyboard })
})

export { composer as openfortFeature }
