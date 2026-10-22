import type { Ctx } from '../../utils/context.ts';

export const run = async (client: any, ctx: Ctx) => {
    await ctx.reply(`Pong ! :ping_pong: ${client.ws.ping}ms`);
};

export const help = {
    name: 'ping',
    description: 'Vérifie si le bot est en ligne.',
    aliases: ['pong'],
};
