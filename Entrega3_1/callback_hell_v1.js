const {
    readdir,
    readFile,
    writeFile
} = require("fs");
const fs = require('fs');
const { files } = require("jszip");
const {
    join
} = require("path");
const inbox = join(__dirname, "inbox");
const outbox = join(__dirname, "outbox");

const reverseText = str =>
    str
        .split("")
        .reverse()
        .join("");

// Read and reverse contents of text files in a directory
/*readdir(inbox, (error, files) => {
  if (error) return console.log("Error: Folder inaccessible");
  files.forEach(file => {
    readFile(join(inbox, file), "utf8", (error, data) => {
      if (error) return console.log("Error: File error");
      writeFile(join(outbox, file), reverseText(data), error => {
        if (error) return console.log("Error: File could not be saved!");
        console.log(`${file} was successfully saved in the outbox!`);
      });
    });
  });
});*/

function readDirectory(inbox) {
    return new Promise((resolve, reject) => {
        readdir(inbox, (error, files) => {
            if (error) reject(new Error("Error: Folder inaccessible"))
            else resolve(files)
        })
    })
}

function readDataFromFile(file) {
    return new Promise((resolve, reject) => {
        readFile(join(inbox, file), "utf8", (error, data) => {
            if (error) reject(new Error("Error: File error"))
            else resolve(file, data)
        })
    })
}

function writeDataFromInbox(file, data) {
    return new Promise((resolve, reject) => {
        writeFile(join(outbox, file), reverseText(data), error => {
            if (error) reject(new Error("Error: File could not be saved!"))
            else resolve(console.log(`${file} was successfully saved in the outbox!`));
        })
    })
}

readDirectory(inbox)
    .then(files => {
        for (let file of files) {
            readDataFromFile(file)
                .then(writeDataFromInbox())
        }
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))