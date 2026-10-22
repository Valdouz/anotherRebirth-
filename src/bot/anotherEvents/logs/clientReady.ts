import { ActivityType } from "discord.js";
import colors from "colors/safe.js";
import path from "path";
import { readFileSync, readdirSync } from "fs";
import * as yaml from "js-yaml";
import { registerSlash } from "../../utils/loader.ts";

const __dirname = import.meta.dirname;

export default async (client: any) => {

    await registerSlash(client);

    // TODO: réactiver quand anotherClient aura getGuild / createGuild
    // client.guilds.cache.forEach(async (g: any) => {
    //     if (!await client.getGuild(g)) client.createGuild({ guildID: g.id });
    // });

    const status = [
        `?help`,
        `${client.guilds.cache.size} serveurs`
    ];

    setInterval(async () => {
        const st = status[Math.floor(Math.random() * status.length)];
        client.user.setActivity(st, { type: ActivityType.Streaming, url: "https://www.twitch.tv/valdouz_" });
    }, 50000);

    const logsChannel = client.channels.cache.get(process.env.LOGS_STARTCHANNEL!);
    if (logsChannel?.isTextBased()) {
        logsChannel.send(`:white_check_mark: | ${client.user.tag} viens de démarrer !`);
    }

    client.signs = {
        like:                         client.emojis.cache.get('838359690912071680'),
        dislike:                      client.emojis.cache.get('838359690882711553'),
        pour:                         client.emojis.cache.get('838384869523324949'),
        sansavis:                     client.emojis.cache.get('838384890986627082'),
        contre:                       client.emojis.cache.get('838384851018186753'),
        valide:                       client.emojis.cache.get('839051164476768256'),
        refuse:                       client.emojis.cache.get('839056145426415666'),
        animatedcoin:                 client.emojis.cache.get('839071733188264017'),
        action:                       client.emojis.cache.get('840215007505547265'),
        verite:                       client.emojis.cache.get('840214989418790963'),
        online:                       client.emojis.cache.get('847574835533971497'),
        offline:                      client.emojis.cache.get('847574835399360512'),
        dnd:                          client.emojis.cache.get('847574834947031063'),
        idle:                         client.emojis.cache.get('847574835622445067'),
        bot:                          client.emojis.cache.get('847803116199739422'),
        control:                      client.emojis.cache.get('847804149327724594'),
        name:                         client.emojis.cache.get('847805986075836416'),
        logodiscord:                  client.emojis.cache.get('879278851732176896'),
        hashtag:                      client.emojis.cache.get('879284112790290442'),
        rightanimatedgreenarrow:      client.emojis.cache.get('879286472597975050'),
        crown:                        client.emojis.cache.get('879290709482553354'),
        badgedev:                     client.emojis.cache.get('879292717862117396'),
        servers:                      client.emojis.cache.get('879293385872117790'),
        repo:                         client.emojis.cache.get('879295064063504404'),
        channels:                     client.emojis.cache.get('879294062627274762'),
        web:                          client.emojis.cache.get('879295777225195560'),
        link:                         client.emojis.cache.get('879296406920237057'),
        load:                         client.emojis.cache.get('879298012722122754'),
    };

    client.langs = {};
    const langDir = path.resolve(__dirname, '..', '..', 'config', 'lang');
    const langFiles = readdirSync(langDir).filter((file) => file.endsWith('.yml'));

    for (const lang of langFiles) {
        client.langs[lang.split('.')[0]] = yaml.load(readFileSync(path.join(langDir, lang), 'utf8'));
    }

    console.log(colors.green('Logged in as: ' + client.user.tag + '.'));
};
