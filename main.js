// Modules to control application life and create native browser window
const {app, BrowserWindow, protocol, session} = require('electron')
// const Router = require('@marshallofsound/electron-router')
const path = require('path')
const { PassThrough } = require('stream')
let Router = require('electron-router')
const Exapp = require('express')();

const server = require('http').createServer(Exapp);
const io = require('socket.io')(server);
io.on('connection', socket => { 
  console.log('connection')
});
if(!process.env.PORT) process.env.PORT = Math.round((Math.random()) * 1024);
const listener = server.listen(process.env.PORT, () => {
  console.debug('listening on port ::'+ process.env.PORT)
});
// Returns the static instance
let router = Router( 'shadow')
router.on('ready', () => { 
  console.log('Router ready')
})
router.get('/', (req, res) => {
  console.log(req,res)
  res.json(null,{ message: 1 })
})
Exapp.get('/', (req, res) => {
  res.json({
    message: 1,
  })
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
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('https://shadow-bot.dev')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  protocol.registerStreamProtocol('shadow', (request, callback) => {
    callback({
      statusCode: 200,
      headers: {
        'content-type': 'text/html'
      },
      data: createStream('<h5>Response</h5>')
    })
  })
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
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
