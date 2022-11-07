const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path');
const process = require('process');



const transferCss = async () => {
  const files = await fsPromises.readdir(path.join(__dirname, 'styles'));

  const arrNames = checkOnCss(files);
  const arrCssStyles = getArrCssStyles(arrNames);

  const writeStyles = fsPromises.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), (await arrCssStyles).join(''))

}


function checkOnCss(files) {
  let arr = []

  files.map(item => {
    if (path.extname(item) == '.css') {
      return arr.push(item)
    }
  })

  return arr
}

async function getArrCssStyles(arrNames) {
  let arrCssStyles = []

  for (let name of arrNames) {
    arrCssStyles.push(await fsPromises.readFile(path.join(__dirname, 'styles', name), { encoding: 'utf8' }))
  }

  return arrCssStyles
}

transferCss()
