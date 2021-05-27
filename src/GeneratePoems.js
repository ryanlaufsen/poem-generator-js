import { adjectives } from './database/adjectives'
import { commonNouns } from './database/commonNouns';
import { conjunctions } from './database/conjunctions';
import { prepositions } from './database/prepositions';
import { properNouns } from './database/properNouns';
import { verbs } from './database/verbs';
import { Document, Packer, Paragraph, TextRun } from "docx";
import PizZip from "pizzip";
import { saveAs } from 'file-saver';

function GeneratePoems(fileQuantity, lineQuantity) {

    let zip = new PizZip();

    function pickWord(wordList) {
        let n = Math.floor(Math.random() * wordList.length);
        return wordList[n];
    }

    function subject(caps) {

        function checkVowel() { // used to check if "an" or "a" should be used
            var vowelSubject = (Math.floor(Math.random() === 1)) ?
                vowelSubject = ["", adjective(), ""] :
                vowelSubject = ["", ""];

            let noun = pickWord(commonNouns);
            vowelSubject[vowelSubject.length - 1] = noun;

            vowelSubject[1].charAt(0).match(/[aeiou]/) ?
                vowelSubject[0] = "an" :
                vowelSubject[0] = "a";

            return (vowelSubject.join(' '));
        }

        let properOrCommon = Math.floor(Math.random() * 4)

        var subjectString = ""
        switch (properOrCommon) {
            case 0:
                subjectString = pickWord(properNouns);
                break;
            case 1:
                subjectString = "the " + pickWord(commonNouns);
                break;
            case 2:
                subjectString = "the " + adjective() + " " + pickWord(commonNouns);
                break;
            case 3:
                subjectString = checkVowel();
                break;
            default:
                subjectString = "the " + pickWord(commonNouns);
        }

        return (caps === true ?
            subjectString.replace(/^\w/, (c) => c.toUpperCase()) : subjectString);
    }

    function verb() {
        return (pickWord(verbs))
    }

    function preposition() {
        return (pickWord(prepositions))
    }

    function conjunction() {
        return (pickWord(conjunctions))
    }

    function adjective() {
        return (pickWord(adjectives))
    }

    function sentence(caps = true) {
        var clause = "";
        let sentenceType = Math.floor(Math.random());
        switch (sentenceType) {
            case 0: clause = [subject(caps), verb()].join(' '); break;
            case 1: clause = [subject(caps), verb(), preposition(), subject(false)].join(' '); break;
            default: clause = [subject(caps), verb()].join(' ');
        }

        let extendedSentence = Math.random();
        (extendedSentence < 0.25) && (clause = clause + ' ' + [conjunction(), sentence(false)].join(' '))
        return (clause);
    }

    async function generator() {
        let i;
        for (i = 0; i < fileQuantity; i++) {
            var poem = document.createElement("div");
            let j;
            for (j = 0; j < lineQuantity; j++) {
                var lines = "";
                lines = lines + sentence() + '\n';
                poem.append(lines);
            }

            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: poem.innerText
                                }),
                            ],
                        }),
                    ],
                }]
            });

            var poemContent;

            await Packer.toBuffer(doc).then((buffer) => {
                poemContent = buffer;
                zip.file(`Poem ${i + 1}.docx`, buffer);
            }); // actually returns promise of UInt8Array on browser
        };
    }

    generator().then(() => {
        var content = zip.generate({ type: "blob" });
        saveAs(content, `Poems x${fileQuantity}.zip`);
    });
}

export default GeneratePoems;