const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path');
const process = require('process');




fs.access(path.join(__dirname, 'files-copy'), (err) => {
  if (err) {
    create()
  } else {
    fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
      if (err) {
        console.log('rm');
      }
      create()
    })
  }
})


function create() {
  fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true })
    .then(() => {
      fs.readdir(path.join(__dirname, 'files'), (err, files) => {

        if (err) {
          console.log(err);
        }

        copyDir(files)
      })
    })
}

function copyDir(files) {
  for (let i = 0; i < files.length; i++) {

    fs.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]), (err) => {

      if (err) {
        console.log(err);
      }

    }
    )
  }
}

