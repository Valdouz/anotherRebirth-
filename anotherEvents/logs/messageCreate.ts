import { fromMessage } from '../../utils/context.ts';

export default async (client: any, msg: any) => {
    const prefix = global.bot.prefix;
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;

    const [name, ...args] = msg.content.slice(prefix.length).trim().split(/\s+/);
    const cmd = Object.values<any>(global.bot.commands)
        .find((c) => c.name === name.toLowerCase() || c.aliases?.includes(name.toLowerCase()));

    await cmd?.run(client, fromMessage(msg, args));
};
