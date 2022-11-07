const fs = require('fs')
const path = require('path');




fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  }

  output(files)
})


function output(files) {
  for (let i = 0; i < files.length; i++) {
    let item = files[i]
    fs.stat(path.join(__dirname, 'secret-folder', item.name), (err, stats) => {

      if (err) {
        console.log(err);
      }
      if (stats.isFile()) {
        console.log(`${path.basename(item.name, path.extname(item.name))} - ${path.extname(item.name).slice(1)} - ${stats.size}`);
      }
    })
  }
}





// function output(files) {
//   files.map(item => console.log(`${item.name} - ${path.extname(item.name)} - ${fs.stat(item, (error, stats) => {
//     if (error) {
//       console.log(error);
//     } else {
//       return 'br'
//     }
//   })}`))
// }




// - (${fs.stat(path.resolve(__dirname, 'text.txt')

// (err, stat) => {
//   if (err) {
//     console.log(err);
//   } else {
//     return stat.size()
//   }