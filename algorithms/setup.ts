import { Page } from "../models/Page";
const fs = require('fs');

// Our "hashmap"
let words: string[] = []
let ids: number[] = []
let pages: Page[] = []
export {words, ids, pages}

export function setup() {
    console.log("Setup initialized");
    
    const paths: string[] = ["./data/Words/Games", "./data/Words/Programming"]

    paths.forEach(path => {
        fs.readdir(path, (err, files) => {
            if (err) {console.log(err)}
            let data: Page[] = innerLoop(path, files);
            pages = pages.concat(data);
            console.log("Pages: " + pages.length);
            console.log("Words: " + words.length);
        });
    });
    // TODO: Consider a callback to say the function is done
}

function innerLoop(path, files) {
    let res: Page[] = []; 

    files.forEach(element => {
        const file = fs.readFileSync(path + "/" + element, "utf8") // TODO: Might want to be async to improve performance
        let idlist = checkAllWords(file);

        let newPage: Page = new Page(element, idlist)
        res.push(newPage)
    });

    return res;
}

function checkAllWords(wordlist) {
    let arr = wordlist.split(" ")
    let result: number[] = [];

    arr.forEach(element => {
        let word = getSetWord(element)
        result.push(word)
    });

    return result;
}

export function getSetWord(input) {
    let indexof = words.indexOf(input)
    if (indexof != -1) {
        return indexof;
    } else {
        words.push(input)
        let id = ids.length
        ids.push(id)
        return id
    }
}