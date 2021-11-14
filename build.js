// C:\Users\sdkca\Desktop\electron-workspace\build.js
process.env.DEBUG = '*'
var electronInstaller = require('electron-winstaller');
var ms = require('ms');
var time = Date.now()
const debug = require('debug')('debugger')
console.log = debug
console.debug('e')
console.log('defining settings...')
// In this case, we can use relative paths
async function win() {
var settings = {
    // Specify the folder where the built app is located
    appDirectory: './downloads/buildata/shadow-win32-ia32',
    // Specify the existing folder where 
    outputDirectory: './downloads/win',
    // The name of the Author of the app (the name of your company)
    authors: 'Shadow',
    // The name of the executable of your built
    exe: './shadow.exe',
    debug: true,
    setupIcon: './assets/favicon.ico',
    setupExe: 'Shadow-setup.exe',
    setupMsi: 'Shadow-setup.msi',
protocol: 'shadow://'
};
console.log('Settings defined')
console.log(settings);
console.log('Running promise')
resultPromise = electronInstaller.createWindowsInstaller(settings);
console.log('Promise called, no going to .then statment with %s', Date.now() - time)
resultPromise.then((res) => {
    console.log(res)
    console.log("The installers of your application were succesfully created !");
    console.log(`It took ${Date.now() - time}ms (${ms(Date.now() - time )})!`)
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
    console.error(e)
});
}
async function linxus() {
    var install = require('electron-linux-installer')
    install({
        src: 'downloads/buidata/shadow-linux-x64/', // source location
        dest: 'downloads/linxus', // destination of the installer
        arch: 'x86_64', // x86_x64 would work both debian and rpm cause controllers are here.
        for: 'both' // can be debian or redhat
    }).then(success => {
    debug('Done building the linxus installs')
        debug(success)
    }).catch(e => {
       debug(`Error: ${e.message}`) 
        debug(e)
    })
}
Promise.all([win(), linxus()])
/**
 * @author
 * @NeonGamerBot-QK
 * it takes up to 7- 20m to build...
 */