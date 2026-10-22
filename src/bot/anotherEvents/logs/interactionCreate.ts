import { fromInteraction } from '../../utils/context.ts';

export default async (client: any, i: any) => {
    if (!i.isChatInputCommand()) return;

    await global.bot.commands[i.commandName]?.run(client, fromInteraction(i));
};
