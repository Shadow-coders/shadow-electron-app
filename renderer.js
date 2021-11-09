// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { shell } = require('electron')
console.log(process)
const launch = (path) => {
    shell.openPath(`${path}://`)
}
const { io } = require("socket.io-client");
const socket = io('https://shadow-bot.dev/');
socket.on('connect', () => console.debug('connected [socket.io]'))
document.getElementById('text').innerHTML = process.argv.slice(2).join('\n')