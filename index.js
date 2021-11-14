

module.exports = {
spawn: () => {
    require('child_process').exec('npx electron main.js')
}

}