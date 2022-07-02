export class Page {
    url: string;
    words: number[];

    constructor(url: string, words: number[]) {
        this.url = url
        this.words = words;
    }
}