"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGeez = toGeez;
exports.fromGeez = fromGeez;
exports.isGeezNumeral = isGeezNumeral;
exports.formatGeez = formatGeez;
/**
 * Converts a number to its Geez (Ethiopic) numeral representation
 * @param num - The number to convert (must be a positive integer)
 * @returns The Geez numeral representation as a string
 * @throws Error if the input is not a positive integer or is out of range
 */
function toGeez(num) {
    // Validate input
    if (!Number.isInteger(num) || num <= 0) {
        throw new Error("Input must be a positive integer");
    }
    if (num > 9999) {
        throw new Error("Numbers larger than 9999 are not supported");
    }
    // Geez numeral characters
    const geezDigits = {
        "1": "፩", // 1
        "2": "፪", // 2
        "3": "፫", // 3
        "4": "፬", // 4
        "5": "፭", // 5
        "6": "፮", // 6
        "7": "፯", // 7
        "8": "፰", // 8
        "9": "፱", // 9
        "10": "፲", // 10
        "20": "፳", // 20
        "30": "፴", // 30
        "40": "፵", // 40
        "50": "፶", // 50
        "60": "፷", // 60
        "70": "፸", // 70
        "80": "፹", // 80
        "90": "፺", // 90
        "100": "፻", // 100
        "1000": "፼", // 1000
    };
    // Handle special cases
    if (num === 1)
        return geezDigits["1"];
    if (num === 10)
        return geezDigits["10"];
    if (num === 100)
        return geezDigits["100"];
    if (num === 1000)
        return geezDigits["1000"];
    let result = "";
    // Process thousands
    if (num >= 1000) {
        const thousands = Math.floor(num / 1000);
        if (thousands > 1) {
            result += toGeez(thousands);
        }
        result += geezDigits["1000"];
        num %= 1000;
    }
    // Process hundreds
    if (num >= 100) {
        const hundreds = Math.floor(num / 100);
        if (hundreds > 1) {
            result += toGeez(hundreds);
        }
        result += geezDigits["100"];
        num %= 100;
    }
    // Process tens
    if (num >= 10) {
        const tens = Math.floor(num / 10) * 10;
        result += geezDigits[tens.toString()];
        num %= 10;
    }
    // Process ones
    if (num > 0) {
        result += geezDigits[num.toString()];
    }
    return result;
}
/**
 * Converts a Geez (Ethiopic) numeral string to a number
 * @param geezStr - The Geez numeral string to convert
 * @returns The numeric value as a number
 * @throws Error if the input contains invalid Geez numerals
 */
function fromGeez(geezStr) {
    // Validate input
    if (!geezStr || typeof geezStr !== "string") {
        throw new Error("Input must be a non-empty string");
    }
    // Geez numeral to number mapping
    const geezToNumber = {
        "፩": 1,
        "፪": 2,
        "፫": 3,
        "፬": 4,
        "፭": 5,
        "፮": 6,
        "፯": 7,
        "፰": 8,
        "፱": 9,
        "፲": 10,
        "፳": 20,
        "፴": 30,
        "፵": 40,
        "፶": 50,
        "፷": 60,
        "፸": 70,
        "፹": 80,
        "፺": 90,
        "፻": 100,
        "፼": 1000,
    };
    let result = 0;
    let temp = 0;
    let multiplier = 1;
    // Process the string from right to left
    for (let i = geezStr.length - 1; i >= 0; i--) {
        const char = geezStr[i];
        const value = geezToNumber[char];
        if (value === undefined) {
            throw new Error(`Invalid Geez numeral character: ${char}`);
        }
        if (value === 100) {
            multiplier = 100;
            if (temp === 0)
                temp = 1;
            result += temp * multiplier;
            temp = 0;
            multiplier = 1;
        }
        else if (value === 1000) {
            multiplier = 1000;
            if (temp === 0)
                temp = 1;
            result += temp * multiplier;
            temp = 0;
            multiplier = 1;
        }
        else {
            temp += value;
        }
    }
    result += temp;
    return result;
}
/**
 * Checks if a string is a valid Geez numeral
 * @param str - The string to check
 * @returns True if the string is a valid Geez numeral, false otherwise
 */
function isGeezNumeral(str) {
    if (!str || typeof str !== "string") {
        return false;
    }
    const validChars = [
        "፩",
        "፪",
        "፫",
        "፬",
        "፭",
        "፮",
        "፯",
        "፰",
        "፱",
        "፲",
        "፳",
        "፴",
        "፵",
        "፶",
        "፷",
        "፸",
        "፹",
        "፺",
        "፻",
        "፼",
    ];
    for (const char of str) {
        if (!validChars.includes(char)) {
            return false;
        }
    }
    try {
        fromGeez(str);
        return true;
    }
    catch (error) {
        return false;
    }
}
/**
 * Formats a number as a Geez numeral with optional formatting options
 * @param num - The number to format
 * @param options - Formatting options
 * @returns The formatted Geez numeral string
 */
function formatGeez(num, options = {}) {
    const { prefix = "", suffix = "", separator = "" } = options;
    const geezStr = toGeez(num);
    if (separator && geezStr.length > 1) {
        // Insert separator between each character
        const chars = geezStr.split("");
        return prefix + chars.join(separator) + suffix;
    }
    return prefix + geezStr + suffix;
}
// Export all functions
exports.default = {
    toGeez,
    fromGeez,
    isGeezNumeral,
    formatGeez,
};
