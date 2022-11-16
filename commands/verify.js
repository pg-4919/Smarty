const discord = require("discord.js");
const crypto = require("crypto");
const utils = require("../utils/utils.js");

const captchas = new discord.Collection();

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("verify")
        .setDescription("Verify yourself to access the server")
        .toJSON(),

    async respond(interaction) {
        const code = crypto.randomBytes(3).toString("hex");

        const modal = new discord.ModalBuilder()
            .setCustomId("verify")
            .setTitle("Verify yourself");

        const captcha = new discord.TextInputBuilder()
            .setCustomId("captcha")
            .setLabel(`Enter the following text: ${code}`)
            .setStyle(discord.TextInputStyle.Short)
            .setMinLength(6)
            .setMaxLength(6)
            .setRequired(true);

        captchas.set(interaction.user.id, { code: code, interaction: interaction });
        modal.addComponents(new discord.ActionRowBuilder().addComponents(captcha));

        await interaction.showModal(modal);

        return interaction;
    },

    async modal(modal) {
        const { member, fields } = modal;
        const string = fields.getTextInputValue("captcha").toLowerCase();
        const humans = modal.guild.roles.cache.filter(role => role.id == process.env.NCI_ROLE_HUMANS);

        if (string === captchas.get(modal.user.id).code) {
            const embed = utils.embed(member).setDescription("You were successfully verified");
            member.roles.add(humans);
            modal.editReply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });
        }

        captchas.delete(modal.user.id);
    }
}