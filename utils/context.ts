import type { Message, ChatInputCommandInteraction } from "discord.js";

export type Ctx = ReturnType<typeof fromMessage>;

export const fromMessage = (msg: Message, args: string[]) => ({
    user: msg.author,
    guild: msg.guild,
    channel: msg.channel,
    args,
    reply: (content: any) => msg.reply(content),
});

export const fromInteraction = (i: ChatInputCommandInteraction) => ({
    user: i.user,
    guild: i.guild,
    channel: i.channel,
    args: i.options.data.map((o) => String(o.value)),
    reply: (content: any) => i.reply(content),
});
