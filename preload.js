// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
process.env.DEBUG = '*'
const debug = require('debug')('main-window');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { shell } = require('electron');
const { EventEmitter } = require('events')
let user;
user = {}
if(fs.existsSync('user.json')) user = require('./user.json');
fs.appendFileSync('redirects.txt', `\n${window.location.href}`)
debug('Test')
window.events = new EventEmitter();
window.addEventListener('DOMContentLoaded', () => {
  console.log(__dirname, window.location.href)
if(window.location.href.startsWith('https://shadow-bot.dev/auth/discord/callback')) {
  console.log("Writing")
fs.writeFileSync('user.json', JSON.stringify(JSON.parse(window.document.body.innerText), null, 2), (err, _) => {
 window.close()
})
window.close()
} else if(window.location.href.endsWith('index.html')) {
  console.debug('e')
 const text = document.createElement('div')
 text.innerHTML = `Hello ${user.username}!\n here is some more info about you! \n you are in ${user.guilds.length} \n and ur ID is ${user.id}\n here is some random debug stuff\n ` + user.guilds.map(g => g.name).join('<br>').replace('\n', '<br>')
 document.body.appendChild(text)
}
})
window.addEventListener('error', console.error)
window.addEventListener('message', m => console.debug(`Message! ${m}`))
