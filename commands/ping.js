const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check how laggy the bot is")
        .toJSON(),

    async respond(interaction) {
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTimestamp()
            .setDescription(`The bot is up and latency is ${Date.now() - interaction.createdTimestamp} ms.`)
            .setFooter({ text: "pinged the bot", iconURL: interaction.member.user.avatarURL() });
        
        return interaction.reply({ embeds: [embed]});
    }
}