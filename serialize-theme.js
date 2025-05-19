// Convert a theme JSON to the string format used in Ninjabrain-Bot
// https://github.com/Ninjabrain1/Ninjabrain-Bot/blob/main/src/main/java/ninjabrainbot/gui/style/theme/CustomTheme.java

const fs = require('fs');

const UID_MAP = {
    "titleBar": "a",
    "headerBackground": "b",
    "resultBackground": "c",
    "throwsBackground": "d",
    "dividers": "e",
    "headerDividers": "f",
    "text": "h",
    "titleText": "n",
    "throwsText": "k",
    "divineText": "i",
    "versionText": "j",
    "headerText": "o",
    "subpixelIncrease": "l",
    "subpixelDecrease": "m",
    "certainty100": "r",
    "certainty50": "q",
    "certainty0": "p",
};

const themePath = process.argv[2];

if (!themePath) {
    console.error("Please provide a theme to convert!");
    process.exit(1);
}

function serializeInt(value, bitLength) {
    let result = "";
    while (bitLength > 0) {
        result = String.fromCharCode((value & 0b111111) + 48) + result;
        value >>= 6;
        bitLength -= 6;
    }
    return result;
}

const theme = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
const themeName = themePath.split("/").pop().split(".")[0];

let themeString = "";
for (const [key, value] of Object.entries(theme)) {
    const uid = UID_MAP[key];
    if (!uid) {
        console.error(`Invalid theme! Unknown key: ${key}.`);
        process.exit(1);
    }
    const colorInt = parseInt(value.replace("#", "0x"));
    const colorString = serializeInt(colorInt, 24);
    themeString += uid + colorString;
}

console.log(`${themeName}: ${themeString}`);