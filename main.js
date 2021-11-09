// Modules to control application life and create native browser window
const {app, BrowserWindow, protocol, session} = require('electron')
const {
  info,
  warn,
  error
} = require('electron-log')
info('starting...')
// const Router = require('@marshallofsound/electron-router')
const path = require('path')
const { PassThrough } = require('stream')
let Router = require('electron-router')

// Returns the static instance
let router = Router( 'shadow')
router.on('ready', () => { 
  console.log('Router ready')
})
router.get('/', (req, res) => {
  console.log(req,res)
  res.json(null,{ message: 1 })
})
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
function createWindow () {
  // Create the browser window.
  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'assets/favicon.ico',
    webPreferences: {
  nodeIntegration: true,
  nodeIntegrationInSubFrames: true,
  nodeIntegrationInWorker: true,
  contextIsolation: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  info('Electron Ready')
  warn('Test')
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    console.log('Creating window')
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
 if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
