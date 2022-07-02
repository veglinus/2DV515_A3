export function normalize(scores: {url: string, score: number}[], smallIsBetter: boolean) {

    if (smallIsBetter) {
        let min: number = scores[scores.length - 1].score;
        console.log("Min value: " + min);
        for (let i = 0; i < scores.length; i++) {
            scores[i].score = min / Math.max(scores[i].score, 0.00001) 
            scores[i].score = parseFloat(scores[i].score.toFixed(2)) // Rounds to 3 decimals
        }

    } else {
        let max: number = scores[0].score;
        console.log("Max value: " + max);
        for (let i = 0; i < scores.length; i++) {
            scores[i].score = scores[i].score / max
            scores[i].score = parseFloat(scores[i].score.toFixed(2)) // Rounds to 3 decimals
        }
    }

    return scores;
}