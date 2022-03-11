
require('dotenv').config()


const { Client, Guild } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const axios = require('axios');
const welcome = require('./welcome')
const PREFIX = '$';


client.on('ready', () => {
    welcome(client);
})

client.on('message', async (message)=> {

    if (message.author.bot) return
    if(message.content === 'hello ye' || message.content === 'hi ye') {
         const messageHi= ["Hello", "Yo", "Hi", "Greetings human", "Hola amigo", "Ni hao", "Allo", "您好", "こんにちは", ]
        const randomNumber1 = Math.floor(Math.random()*messageHi.length)
        message.channel.send(messageHi[randomNumber1])
    }
    if (message.content === 'whats up ye'){
        const messageGreet= ["Not much fambo. How's ur day?", "Creating the next number 1 hit", "My next album gonna feature Taylor Swift","I feel gud ~", "Trying to cut a dragon fruit. brb.", "WHATS UP WITH CHU MANG? I missed you"]
        const randomNumber = Math.floor(Math.random()*messageGreet.length)
        message.channel.send(messageGreet[randomNumber])
    }
    if(message.content === 'sheesh') {
        message.channel.send('sheeeeeeesh...')
    }
    if(message.content === 'for real') {
        message.channel.send('deadass')
    }

    //api kanYe
    if(message.content === 'wisdom'){
        let getJoke = async () => {
            let response = await axios.get('https://api.kanye.rest/')
            let joke = response.data
            return joke
        }
        let jokeValue = await getJoke()
        message.reply(`${jokeValue.quote}`)
    }

    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
        if (CMD_NAME === 'kick'){
            if (args.length === 0) return message.reply('Who u want me to kick fambo')
            const member = message.guild.members.cache.get(args[0]);
            if(member) {
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked`))
                .catch((err) => message.channel.send('Im too weak. I cannot kick...'))
            
            } else {
                message.channel.send('who dat fambo?')
            }
        } else if (CMD_NAME === 'ban'){
            message.channel.send('Uh?!')
        }
        
    }
})
client.on('message', (message) => {
    let wordArray = message.content.split();

    let filterWords = ['fuck you'] ;

    for (var i = 0; i< filterWords.length; i++){
        if (wordArray.includes(filterWords[i])) {
            message.delete({timeout: 2000})
            message.channel.send(`Wash yo mouth ${message.author.username}`)
        }
        break;
    }
})
client.login(process.env.TOKEN);

