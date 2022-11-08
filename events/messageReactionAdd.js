const utils = require("../utils/utils.js");

module.exports = async (reaction, user) => {
    const { client, emoji, me, message } = reaction;
    console.log(reaction);
    const starred = await message.guild.channels.fetch(client.config?.channels.starred);

    try { await reaction.fetch() } catch (err) { return err };
    if (emoji.name !== "📌" || me || user.bot) return;

    await message.react("📌");
    await utils.clone(starred, message, true);
    
    return;
}