# Geez Number Converter

[![npm version](https://img.shields.io/npm/v/@onesamket/geez-number.svg)](https://www.npmjs.com/package/@onesamket/geez-number)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.7+-blue.svg)](https://www.typescriptlang.org/)
[![Build Status](https://img.shields.io/github/workflow/status/onesamket/geez-number/CI)](https://github.com/onesamket/geez-number/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/onesamket/geez-number)](https://codecov.io/gh/onesamket/geez-number)

A TypeScript library for converting between Arabic numerals and Geez (Ethiopic) numerals. Fully typed, thoroughly tested, and zero dependencies.

## Features

- 🔢 Convert between Arabic numbers and Geez numerals
- ✅ Validate Geez numeral strings
- 🎨 Format Geez numerals with custom options
- 📦 Zero dependencies
- 📝 Fully typed with TypeScript
- 🧪 Thoroughly tested

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
- [Integration Examples](#integration-examples)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install @onesamket/geez-number
# or
yarn add @onesamket/geez-number
# or
pnpm add @onesamket/geez-number
```

## Basic Usage

### Converting Numbers to Geez Numerals

The most basic functionality is converting Arabic numerals to Geez numerals:

```typescript
import { toGeez } from "@onesamket/geez-number";

// Single digits
console.log(toGeez(1)); // ፩
console.log(toGeez(5)); // ፭
console.log(toGeez(9)); // ፱

// Double digits
console.log(toGeez(10)); // ፲
console.log(toGeez(15)); // ፲፭
console.log(toGeez(42)); // ፵፪
console.log(toGeez(99)); // ፺፱

// Hundreds
console.log(toGeez(100)); // ፻
console.log(toGeez(101)); // ፻፩
console.log(toGeez(250)); // ፪፻፶
console.log(toGeez(999)); // ፱፻፺፱

```

### Converting Geez Numerals to Numbers

You can also convert Geez numerals back to Arabic numbers:

```typescript
import { fromGeez } from "@onesamket/geez-number";

// Single digits
console.log(fromGeez("፩")); // 1
console.log(fromGeez("፭")); // 5
console.log(fromGeez("፱")); // 9

// Double digits
console.log(fromGeez("፲")); // 10
console.log(fromGeez("፲፭")); // 15
console.log(fromGeez("፵፪")); // 42
console.log(fromGeez("፺፱")); // 99



```

### Validating Geez Numerals

You can check if a string contains valid Geez numerals:

```typescript
import { isGeezNumeral } from "@onesamket/geez-number";

console.log(isGeezNumeral("፩፻፳፫")); // true
console.log(isGeezNumeral("123")); // false
console.log(isGeezNumeral("፩፻A")); // false
```

## Advanced Usage

### Formatting Geez Numerals

The library provides formatting options for Geez numerals:

```typescript
import { formatGeez } from "@onesamket/geez-number";

// Adding prefix and suffix
console.log(formatGeez(42, { prefix: "Number: ", suffix: " in Geez" }));
// Number: ፵፪ in Geez

// Adding separators between characters
console.log(formatGeez(123, { separator: "-" }));
// ፩-፻-፳-፫

// Combining all formatting options
console.log(
  formatGeez(1984, {
    prefix: "# ",
    suffix: " #",
    separator: ".",
  })
);
// # ፩.፼.፱.፻.፹.፬ #
```

## Integration Examples

### Using in a React Component

```tsx
import React, { useState } from "react";
import { toGeez, fromGeez, isGeezNumeral } from "@onesamket/geez-number";

const GeezConverter: React.FC = () => {
  const [arabicNumber, setArabicNumber] = useState<number>(0);
  const [geezNumber, setGeezNumber] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleArabicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setArabicNumber(value);
    try {
      if (!isNaN(value) && value > 0 && value <= 9999) {
        setGeezNumber(toGeez(value));
        setError("");
      } else {
        setGeezNumber("");
        setError("Please enter a number between 1 and 9999");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleGeezChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGeezNumber(value);
    try {
      if (isGeezNumeral(value)) {
        setArabicNumber(fromGeez(value));
        setError("");
      } else {
        setError("Invalid Geez numeral");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <h2>Geez Number Converter</h2>
      <div>
        <label>
          Arabic Number:
          <input
            type="number"
            value={arabicNumber || ""}
            onChange={handleArabicChange}
            min="1"
            max="9999"
          />
        </label>
      </div>
      <div>
        <label>
          Geez Number:
          <input type="text" value={geezNumber} onChange={handleGeezChange} />
        </label>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default GeezConverter;
```

### Using in Node.js CLI Application

```typescript
import readline from "readline";
import { toGeez, fromGeez, isGeezNumeral } from "@onesamket/geez-number";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser() {
  rl.question(
    "Enter a number (1-9999) or Geez numeral (or 'exit' to quit): ",
    (input) => {
      if (input.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      try {
        // Check if input is a valid number
        const num = parseInt(input, 10);
        if (!isNaN(num)) {
          console.log(`${num} in Geez: ${toGeez(num)}`);
        }
        // Check if input is a valid Geez numeral
        else if (isGeezNumeral(input)) {
          console.log(`${input} in Arabic: ${fromGeez(input)}`);
        } else {
          console.log(
            "Invalid input. Please enter a valid number or Geez numeral."
          );
        }
      } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
      }

      promptUser();
    }
  );
}

console.log("Geez Number Converter CLI");
console.log("---------------------------");
promptUser();
```

## Troubleshooting

### Common Errors

1. **Input must be a positive integer**

   - Ensure that you're passing a positive integer to the `toGeez()` function.
   - Negative numbers, zero, and floating-point numbers are not supported.

2. **Numbers larger than 9999 are not supported**

   - The library currently supports numbers up to 9999.
   - For larger numbers, consider breaking them down into smaller components.

3. **Invalid Geez numeral character**
   - Ensure that the string passed to `fromGeez()` contains only valid Geez numeral characters.
   - Use `isGeezNumeral()` to validate input before conversion.

### Error Handling

Always wrap conversion functions in try-catch blocks to handle potential errors:

```typescript
try {
  const geezNumber = toGeez(userInput);
  // Process the result
} catch (error) {
  console.error(`Conversion error: ${(error as Error).message}`);
  // Handle the error appropriately
}
```

## Best Practices

1. **Input Validation**

   - Always validate user input before passing it to conversion functions.
   - Use `isGeezNumeral()` to check if a string contains valid Geez numerals.

2. **Error Handling**

   - Implement proper error handling to catch and manage conversion errors.
   - Provide meaningful error messages to users.

3. **Performance Considerations**

   - For applications requiring high-volume conversions, consider caching frequently used values.
   - The library is optimized for numbers up to 9999, which covers most use cases.

4. **Localization**

   - When displaying Geez numerals, ensure that your application uses fonts that support Ethiopic scripts.
   - Consider using the `formatGeez()` function to improve readability.

5. **Testing**
   - Thoroughly test your integration with a range of inputs, including edge cases.
   - Include tests for error conditions to ensure your application handles them gracefully.

## API Reference

### toGeez(num: number): string

Converts a number to its Geez (Ethiopic) numeral representation.

- **Parameters:**
  - `num` - The number to convert (must be a positive integer)
- **Returns:** The Geez numeral representation as a string
- **Throws:** Error if the input is not a positive integer or is out of range (> 9999)

### fromGeez(geezStr: string): number

Converts a Geez (Ethiopic) numeral string to a number.

- **Parameters:**
  - `geezStr` - The Geez numeral string to convert
- **Returns:** The numeric value as a number
- **Throws:** Error if the input contains invalid Geez numerals

### isGeezNumeral(str: string): boolean

Checks if a string is a valid Geez numeral.

- **Parameters:**
  - `str` - The string to check
- **Returns:** True if the string is a valid Geez numeral, false otherwise

### formatGeez(num: number, options?: object): string

Formats a number as a Geez numeral with optional formatting options.

- **Parameters:**
  - `num` - The number to format
  - `options` - Formatting options (optional)
    - `prefix` - String to add before the numeral (default: '')
    - `suffix` - String to add after the numeral (default: '')
    - `separator` - Character to insert between each numeral character (default: '')
- **Returns:** The formatted Geez numeral string

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/new-feature`)
3. Commit your changes (`git commit -m 'Add some new feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Open a Pull Request

### Development

```bash
# Clone the repository
git clone https://github.com/onesamket/geez-number.git
cd geez-number

# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- The Geez numeral system has been used in Ethiopia and Eritrea for centuries
- Thanks to all contributors who have helped make this library better
