module.exports = client => {
    const serverID = '923081054619844609';
    client.on('guildMemberAdd', (member)=> {
        const message = `Welcome <@${member.id}> to the kanyeVerse`;
        const channel = member.guild.channels.cache.get(serverID);
    })
}
