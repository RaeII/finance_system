import { REST, Routes } from 'discord.js';
import env from './src/config/index.js';
import fs from "fs/promises"
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, 'src/bot/commands');



console.log('PATH',commandsPath)
const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = await fs.readdir(commandsPath).then( file => file.filter(file => file.endsWith('.js')));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = await import(`${commandsPath}/${file}`);
  
	commands.push(command.default.data.toJSON());
}

// Construct and prepare an instance of the REST module

const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		process.exit()
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

