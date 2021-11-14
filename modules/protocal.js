const {app, dialog} = require('electron')
const path = require('path')

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('shadow', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('shadow')
}
app.on('open-url', (event, url) => {
    console.log('OK')
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})