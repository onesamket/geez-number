/**
 * Options for formatting Geez numerals
 */
export interface GeezFormatOptions {
    /**
     * Text to add before the Geez numeral
     */
    prefix?: string;
    /**
     * Text to add after the Geez numeral
     */
    suffix?: string;
    /**
     * Character to insert between each Geez numeral character
     */
    separator?: string;
}
/**
 * Main interface for the Geez number converter
 */
export interface GeezConverter {
    /**
     * Converts a number to its Geez numeral representation
     * @param num - The number to convert (must be a positive integer)
     * @returns The Geez numeral representation as a string
     */
    toGeez(num: number): string;
    /**
     * Converts a Geez numeral string to a number
     * @param geezStr - The Geez numeral string to convert
     * @returns The numeric value as a number
     */
    fromGeez(geezStr: string): number;
    /**
     * Checks if a string is a valid Geez numeral
     * @param str - The string to check
     * @returns True if the string is a valid Geez numeral, false otherwise
     */
    isGeezNumeral(str: string): boolean;
    /**
     * Formats a number as a Geez numeral with optional formatting options
     * @param num - The number to format
     * @param options - Formatting options
     * @returns The formatted Geez numeral string
     */
    formatGeez(num: number, options?: GeezFormatOptions): string;
}
