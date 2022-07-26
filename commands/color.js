const builders = require("@discordjs/builders");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    name: "color",
    data: new builders.SlashCommandBuilder()
        .setName("color")
        .setDescription("Changes the color of your name")
        .addStringOption(option => option.setName("hex").setDescription("The hex code of the color").setRequired(true))
        .toJSON(),
    async execute(interaction) {
        const hex = interaction.options.getString("hex");
        if (!/^#[0-9A-F]{6}$/i.test(hex)) {
            const embed = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setTimestamp()
                .setDescription(`Not a valid hex code.`)
                .setFooter({ text: "did a stupid", iconURL: interaction.member.user.avatarURL() });
            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}