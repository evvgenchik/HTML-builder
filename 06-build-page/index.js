const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path');
const process = require('process');


const replaceHTML = async () => {
  const pattern = await fsPromises.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });
  const namesHTMLfiles = await fsPromises.readdir(path.join(__dirname, 'components'));

  const createDirectoryDist = await delteDirectory(path.join(__dirname, 'project-dist'))

  const addIndexHTML = await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), await changePattern(namesHTMLfiles, pattern))


  /************************************CSS************/

  const namesCSSfiles = await fsPromises.readdir(path.join(__dirname, 'styles'));

  const arrNames = checkOnCss(namesCSSfiles);

  const arrCssStyles = getArrCssStyles(arrNames);

  const writeStyles = fsPromises.writeFile(path.join(__dirname, 'project-dist', 'style.css'), (await arrCssStyles).join(''))


  /**************ASSETS********************/

  const createDirectoryAssets = await delteDirectory(path.join(__dirname, 'project-dist', 'assets'));

  const namesAssetsfiles = await getNameFiles(path.join(__dirname, 'assets'))

  isFile(namesAssetsfiles)
  // const copyAssets = await copyFiles(namesAssetsfiles)
}



const changePattern = async (namesHTMLfiles, pattern) => {

  let string = pattern

  for (section of namesHTMLfiles) {

    string = string.replace(`{{${path.basename(section, path.extname(section))}}}`, await getHTMLfromComponents(section))
  }
  return string
}


const createDirectory = async (path) => {
  await fsPromises.mkdir(path)
}

const delteDirectory = async (path) => {
  try {
    await fsPromises.rm(path, { recursive: true })
    createDirectory(path)

  } catch (err) {
    createDirectory(path)
  }
}

const getHTMLfromComponents = () => {
  const textHTML = fsPromises.readFile(path.join(__dirname, 'components', section), { encoding: 'utf-8' })

  return textHTML
}

/*********CSS****************** */

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


/*****************TRANSFER**************/


const getNameFiles = async (path) => {
  const names = await fsPromises.readdir(path, { withFileTypes: true });

  return names
}
let folder

const isFile = async (files) => {

  for (let item of files) {
    if (item.isFile()) {
      copyFiles(path.join(__dirname, 'assets', folder, item.name), path.join(__dirname, 'project-dist', 'assets', folder, item.name))
    } else {
      folder = item.name
      createDirectory(path.join(__dirname, 'project-dist', 'assets', item.name))
      isFile(await getNameFiles(path.join(__dirname, 'assets', item.name)))
    }
  }
}

const copyFiles = async (src, dest) => {
  await fsPromises.copyFile(src, dest)
}

replaceHTML()
