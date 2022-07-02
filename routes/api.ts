var express = require('express');
var router = express.Router();
import { normalize } from "../algorithms/normalize";
import {setup, words, ids, pages, getSetWord} from "../algorithms/setup"
import { Page } from "../models/Page";
setup(); // For building database

/* Routes */
router.get("/", function(req, res) { // Get all users
    let input = req.query.search
    let result = search(input)
    res.json(result)
});

function search(input: string) {
    input = input.toLowerCase()
    let result: {url: string, score: number}[] = []
    let wordID = getSetWord(input)

    console.log("Input is: " + input + " which is ID: " + wordID)
    pages.forEach(page => {
        
        if (page.words.indexOf(wordID) != -1) { // TODO: Optimize? Loop might be faster?
            let score = countMatches(wordID, page.words)
            let myObject = {url: page.url, score: score}
            result.push(myObject)
        }
    });
    console.log(result.length + " results")
    result = result.sort((a,b) => a.score - b.score) // Sort by lowest to highest
    result = result.reverse() // Reverse so it's highest to lowest
    result = normalize(result, false); // Normalize scores
    return result
}

function countMatches(input: number, array: number[]) {
    let score: number = 0
    array.forEach(element => {
        if (input === element) {
            score++
        }
    });
    return score
}


module.exports = router;