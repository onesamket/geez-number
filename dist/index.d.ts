/**
 * Converts a number to its Geez (Ethiopic) numeral representation
 * @param num - The number to convert (must be a positive integer)
 * @returns The Geez numeral representation as a string
 * @throws Error if the input is not a positive integer or is out of range
 */
export declare function toGeez(num: number): string;
/**
 * Converts a Geez (Ethiopic) numeral string to a number
 * @param geezStr - The Geez numeral string to convert
 * @returns The numeric value as a number
 * @throws Error if the input contains invalid Geez numerals
 */
export declare function fromGeez(geezStr: string): number;
/**
 * Checks if a string is a valid Geez numeral
 * @param str - The string to check
 * @returns True if the string is a valid Geez numeral, false otherwise
 */
export declare function isGeezNumeral(str: string): boolean;
/**
 * Formats a number as a Geez numeral with optional formatting options
 * @param num - The number to format
 * @param options - Formatting options
 * @returns The formatted Geez numeral string
 */
export declare function formatGeez(num: number, options?: {
    prefix?: string;
    suffix?: string;
    separator?: string;
}): string;
declare const _default: {
    toGeez: typeof toGeez;
    fromGeez: typeof fromGeez;
    isGeezNumeral: typeof isGeezNumeral;
    formatGeez: typeof formatGeez;
};
export default _default;
