#!/usr/bin/env node
const child  = require('child_process')
console.log('Running Shadow app...')
const proc = child.exec('npx electron main.js', { cwd: __dirname })
proc.on('message', console.log)
proc.stdout.on('data', console.log)
proc.stderr.on('data', console.log)
proc.on('disconnect', ()=>console.log('Disconnected'))
proc.on('error', console.error)
proc.on('exit', console.log)
proc.on('close', (code) => console.log('CLOSED code :' + code))

