const fs = require('fs');
const path = require('path');
const $HOME = require('os').homedir();

const wstream = fs.createWriteableStream(`${$HOME}/Downloads/markdown.md`)

export const saveMD = ({ editor }) => {
  const { value } = editor
  try {
    wstream.write(value)
    wstream.on('finish', () => console.log('finished writing markdown'))
  }
  catch (err) {
    console.log(err)
  }
}
