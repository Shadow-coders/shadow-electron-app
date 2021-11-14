const { app, Tray, Menu, nativeImage } = require('electron')
const debug = require('debug')('context-menu')
let tray

app.whenReady().then(() => {

  const icon = nativeImage.createFromPath('assets/shadow.png')
  debug('loading')
  tray = new Tray(icon)
  debug('Loaded Tray')
  debug(tray)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  debug('Context Menu', contextMenu)
  tray.setToolTip('This is my application')
  debug('Set tool tip')
tray.setTitle('This is my title')

  tray.setContextMenu(contextMenu)
  debug('set context menu')
  
  // note: your contextMenu, Tooltip and Title code will go here!
})