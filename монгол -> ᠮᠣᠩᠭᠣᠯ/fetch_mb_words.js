const fetch = require("node-fetch-commonjs");

function returnMatchIndex(reg, text) {
    let results = 0;
    while ((match = reg.exec(text)) != null) {
        results = match.index;
    }
    return results;
}

function returnUnwrappedWord(text) {
    var r = /"/g;

    let indexes = [];

    while ((match = r.exec(text)) != null) {
        indexes.push(match.index);
    }

    return text.slice(indexes[0] + 1, indexes[1]);
}

async function fetchWord(word) {
    const response = await fetch(
        `https://mongoltoli.mn/search.php?opt=1&word=${word}`
    );
    const conversion = await response.text();

    var regex = /"uigarjin_tolgoi_useg_input"/g;

    const index = returnMatchIndex(regex, conversion);
    let mashed = conversion.substr(index + 47, 20);

    const result = returnUnwrappedWord(mashed);
    return result;
}

async function main(text) {
    const results = [];
    const list_of_words = text.split(" ");

    let fourofour = 0;

    console.log("\u001b[1;34m This will take a minute...");

    for (let i = 0; i < list_of_words.length; i++) {
        const result = await fetchWord(list_of_words[i]);
        if (result.length === 0) {
            fourofour += 1;
        }
        results.push(result);
        console.log("\u001b[1;33m Still going" + ".".repeat(i));
    }
    console.log("\u001b[1;34m Proccess ended...");

    console.log(
        results,
        `\u001b[1;31m Not found: ${fourofour} `,
        "Website: https://mongoltoli.mn/"
    );
}

const demo =
    "Мөнх тэнгэрийн дор мянга мянган хавар Монголын сайхан оронд жил жил дэлгэр Энх улирал ханхлахад хүний сэтгэл тэнэгэр Өвсний соёо ногоороход морь мал ханагар";

main(demo);
