// Modules to control application life and create native browser window

const {app, BrowserWindow, protocol, session, netLog, dialog  } = require('electron')
try {
try {
  require('dotenv').config()
} catch (e) {
process.env.NODE_ENV = 'production'
}
//const path = require('path')
const buildTools = require('./bt')
const fs = require('fs')
const debug = require('debug')('main-process')
debug('hellow')
let user = undefined;
const {
  info,
  warn,
  error,
} = console;
const { esmodule } = require('./util')
console.log(esmodule)
info('starting...')
// if (buildTools.handleSquirrelEvent(app)) {
//   // squirrel event handled and app will exit in 1000ms, so don't do anything else
//   return;
// }
// const Router = require('@marshallofsound/electron-router')
const path = require('path')

if(fs.existsSync(path.join(__dirname, 'user.json'))) user = JSON.parse(fs.readFileSync(path.join(__dirname, 'user.json')).toString())
const { PassThrough } = require('stream')

const { readdirSync, writeFileSync } = require('fs')

// Returns the static instance

app.setPath('crashDumps', __dirname + '/crashes/')
app.setAppLogsPath(__dirname + '/logs')

function createStream (text) {
  const rv = new PassThrough() // PassThrough is also a Readable stream
  rv.push(text)
  rv.push(null)
  return rv
}
// const api = new Router('shadow');
// api.get('foo', (req, res) => {
//   res.json({
//     hello: 'world',
//   });
// });
 
// // Renderer Process
// const { rendererPreload } = require('@marshallofsound/electron-router')

// rendererPreload();
// fetch('shadow://foo')
//   .then(resp => resp.json())
//   .then(o => console.log(o)); // { hello: 'world' }
async function createWindow () {
  // Create the browser window.
//  await new Promise((resolve,rej) => {
//   if(!user) {
//     const login =  new BrowserWindow({
//        width: 800,
//        height: 600,
//        webPreferences: {
//          preload: path.join(__dirname, 'preload.js')
//        }
//      })
//      login.loadURL('https://shadow-bot.dev/auth/discord')
//      //mainWindow.hide()
     
//  login.on('closed', () => {
//   resolve()
//  })
//    } else {
//      resolve()
//    }
//  })
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'assets/favicon.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  
  mainWindow.loadURL(`https://shadow-bot.dev`)
  // Open the DevTools.
 //  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {        
  info('Electron Ready')
  warn('Test')
  createWindow()
  debug('Electron Ready')
  netLog.startLogging(path.join(__dirname, 'logs', 'netlog'))
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    console.log('Creating window')
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
readdirSync(path.join(__dirname, 'modules')).forEach(f => require(path.join(__dirname, 'modules', f)))
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
 if (process.platform !== 'darwin') app.quit()
})
app.on('before-quit', () => {
  info('Quitting app')
  BrowserWindow.getAllWindows().forEach(w => {
 //   w.alert('Quitting')
    w.close()
  })
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
process.on('uncaughtException', function (error) {
  // Handle the error
  const options = {
    buttons: ['restart', 'exit'],
    type: "error",
    defaultId: 0, // bound to buttons array
    cancelId: 1, // bound to buttons array
     title: 'Fatal error',
     message: error.message,
   };
   const res = dialog
   .showMessageBoxSync(
    null, 
    options
   )
   if(res === 1) {
     app.quit();
   } else {
     BrowserWindow.getAllWindows().forEach(w => w.close())
     app.relaunch()
   }
    console.log(res)
    //info('e')
   
//   BrowserWindow.getAllWindows().forEach(w => w.close())
})
} catch (e) {
  console.info('INDEX FAILL LOAD ' + e.message)
  console.error(e)
  dialog.showErrorBox('Error', e.message)
}