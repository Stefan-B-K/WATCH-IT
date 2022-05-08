#!/usr/bin/env node

import chokidar from 'chokidar'
import debounce from './utils'
import program from 'caporal'         // the program we're building 
import fs from 'fs'
import { spawn } from 'child_process'
import chalk from 'chalk'

program
.name('Watch It')
.version('0.0.1')
.argument('[filename]', 'Name of a file to execute')
.action(async ({ filename }) => {
  const file = filename || 'test.js'     
  if (file === 'app.js') file = 'test.js'
  
  try {
    await fs.promises.access(file)      // check if file exists
  } catch {
    throw new Error(`Could not find or access file "${file}"`)
  }

  // let proc;
  const start = debounce(() => {
    // if (proc) proc.kill()
    console.log(chalk.cyan('>>>>> Process started...'))
    spawn('node', [file], {stdio: 'inherit'})
  }, 100)
  
  chokidar
  .watch('.')
  .on('add', start)
  .on('change', start)
  .on('unlink', start)
})

program.parse(process.argv)
