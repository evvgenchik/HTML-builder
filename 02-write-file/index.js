const fs = require('fs')
const path = require('path');
const process = require('process');
const readline = require('readline');

const input = process.stdin;
const output = process.stdout;


const stream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

output.write('Введите текст \n')

input.on('data', data => {
  if (data.toString().trim() == 'exit') {
    bye()
  }

  stream.write(data)
});

process.on('SIGINT', bye)

function bye() {
  console.log('bye bye');
  process.exit()
}