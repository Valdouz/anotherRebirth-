import { readdirSync, readFileSync } from "fs";
import colors from "colors/safe.js";
import * as yaml from "js-yaml";
import path from "path";
import { pathToFileURL } from "url";

declare global {
    var bot: any;
    var rootpath: string;
}

const __dirname = import.meta.dirname;

const loadConf = async () => {
    try {
        global.bot = yaml.load(readFileSync(path.resolve(__dirname, '..', 'config', 'bot.yml'), 'utf8'));
        await loadCommands();
        console.log(colors.blue(`[Configuration] Bot configuration loaded`));
    } catch (error) {
        console.error(colors.red(`[Configuration] Error loading bot configuration: ${error}`));
    }
};

const loadCommands = async (dir = '../commands') => {
    const route = path.resolve(__dirname, dir);
    global.bot.commands = {};

    for (const category of readdirSync(route)) {
        const files = readdirSync(path.join(route, category)).filter((file) => file.endsWith(".ts"));

        for (const file of files) {
            const mod = await import(pathToFileURL(path.join(route, category, file)).href);
            global.bot.commands[mod.help.name] = { ...mod.help, category, run: mod.run };
            console.log(colors.green(`[Command] ${category}:${mod.help.name} loaded`));
        }
    }
};

const registerSlash = async (client: any) => {
    const body = Object.values<any>(global.bot.commands).map((c) => ({
        name: c.name,
        description: c.description ?? "Aucune description",
    }));
    await client.application.commands.set(body);
    console.log(colors.blue(`[Slash] ${body.length} commandes déclarées`));
};

const loadEvents = async (client: any, dir = '../anotherEvents') => {
    const route = path.resolve(__dirname, dir);
    for (const dirs of readdirSync(route)) {
        const events = readdirSync(path.join(route, dirs)).filter((files) => files.endsWith(".ts"));

        for (const event of events) {
            const evt = (await import(pathToFileURL(path.join(route, dirs, event)).href)).default;
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log(colors.green(`[Event] Event ${evtName} loaded`));
        }
    }
};

export { 
    loadConf,
    loadEvents,
    registerSlash
};
