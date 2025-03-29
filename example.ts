import { toGeez, fromGeez, isGeezNumeral, formatGeez } from "./src/index"

// Basic conversion examples
console.log("--- Basic Conversion ---")
console.log(`1 in Geez: ${toGeez(1)}`)
console.log(`42 in Geez: ${toGeez(42)}`)
console.log(`123 in Geez: ${toGeez(123)}`)
console.log(`1984 in Geez: ${toGeez(1984)}`)

// Convert from Geez to number
console.log("\n--- Convert from Geez ---")
console.log(`'፩' as number: ${fromGeez("፩")}`)
console.log(`'፵፪' as number: ${fromGeez("፵፪")}`)
console.log(`'፩፻፳፫' as number: ${fromGeez("፩፻፳፫")}`)
console.log(`'፩፼፱፻፹፬' as number: ${fromGeez("፩፼፱፻፹፬")}`)

// Validation
console.log("\n--- Validation ---")
console.log(`Is '፩፻፳፫' a valid Geez numeral? ${isGeezNumeral("፩፻፳፫")}`)
console.log(`Is '123' a valid Geez numeral? ${isGeezNumeral("123")}`)
console.log(`Is '፩፻A' a valid Geez numeral? ${isGeezNumeral("፩፻A")}`)

// Formatting
console.log("\n--- Formatting ---")
console.log(`Format 42 with prefix and suffix: ${formatGeez(42, { prefix: "Number: ", suffix: " in Geez" })}`)
console.log(`Format 123 with separator: ${formatGeez(123, { separator: "-" })}`)
console.log(
  `Format 1984 with all options: ${formatGeez(1984, {
    prefix: "# ",
    suffix: " #",
    separator: ".",
  })}`,
)

