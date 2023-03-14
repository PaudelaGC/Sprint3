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

//Exercici preparat per llegir i escriure un unic fitxer de text

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

async function readDirectory(inbox) {
    return new Promise((resolve, reject) => {
        readdir(inbox, (error, file) => {
            if (error) reject(new Error("Error: Folder inaccessible"))
            else resolve(file)
        })
    })
}

function readDataFromFile(file) {
    return new Promise((resolve, reject) => {
        if (file[0] === undefined) reject(new Error("Error: File error"))
        readFile(join(inbox, file[0]), "utf8", (error, data) => {
            if (error) reject(new Error("Error: File error"))
            resolve(data)
        })
    })
}

function writeDataFromInbox(file, data) {
    return new Promise((resolve, reject) => {
        writeFile(join(outbox, file[0]), reverseText(data), error => {
            if (error) reject(new Error("Error: File could not be saved!"))
            else resolve(`${file[0]} was successfully saved in the outbox!`);
        })
    })
}

async function readWriteRevert() {
    try {
        let directory = await readDirectory(inbox);
        let data = await readDataFromFile(directory);
        let success = await writeDataFromInbox(directory, data);
        console.log(success);
    } catch (error) {
        console.log(error);
    }
}

readWriteRevert();
