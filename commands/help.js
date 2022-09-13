const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("help")
        .setDescription("Stop. Get some help.")
        .toJSON(),
        
    async respond(interaction) {
        const embed = new discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTitle("Commands")
            .addFields(
                { name: "/help", value: "R e c e i v e   h e l p." },
                { name: "/changes", value: "See the most recent changes." },
                { name: "/save", value: "Saves statistics and other data." },
                { name: "/stats", value: "Check the given statistic of a given user. If no user is specified, defaults to the executor." },
                { name: "/ping", value: "See the latency of the bot in milliseconds." },
            )
            .setTimestamp()
            .setFooter({ text: "checked the changelog", iconURL: interaction.member.user.avatarURL() });

        return interaction.reply({ embeds: [embed]});
    }
}