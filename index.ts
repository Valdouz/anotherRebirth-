import { Client } from "discord.js";
import * as dotenv from "dotenv";
import  { loadConf, loadEvents } from "./utils/loader.ts";

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
    ],
});

dotenv.config();

global.rootpath = import.meta.dirname;

await loadEvents(client);
await loadConf();

client.login(process.env.DISCORD_BOT_TOKEN);
