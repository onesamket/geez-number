import { describe, test, expect } from 'vitest'
import { toGeez, fromGeez, isGeezNumeral, formatGeez } from "./index"

describe("toGeez", () => {
  test("converts single digits correctly", () => {
    expect(toGeez(1)).toBe("፩")
    expect(toGeez(5)).toBe("፭")
    expect(toGeez(9)).toBe("፱")
  })

  test("converts tens correctly", () => {
    expect(toGeez(10)).toBe("፲")
    expect(toGeez(20)).toBe("፳")
    expect(toGeez(90)).toBe("፺")
  })

  test("converts combined numbers correctly", () => {
    expect(toGeez(11)).toBe("፲፩")
    expect(toGeez(25)).toBe("፳፭")
    expect(toGeez(99)).toBe("፺፱")
  })

  test("converts hundreds correctly", () => {
    expect(toGeez(100)).toBe("፻")
    expect(toGeez(200)).toBe("፪፻")
    expect(toGeez(500)).toBe("፭፻")
  })

  test("converts thousands correctly", () => {
    expect(toGeez(1000)).toBe("፼")
    expect(toGeez(2000)).toBe("፪፼")
    expect(toGeez(9999)).toBe("፱፼፱፻፺፱")
  })

  test("throws error for invalid inputs", () => {
    expect(() => toGeez(0)).toThrow()
    expect(() => toGeez(-1)).toThrow()
    expect(() => toGeez(10000)).toThrow()
    expect(() => toGeez(1.5)).toThrow()
  })
})

describe("fromGeez", () => {
  test("converts single digits correctly", () => {
    expect(fromGeez("፩")).toBe(1)
    expect(fromGeez("፭")).toBe(5)
    expect(fromGeez("፱")).toBe(9)
  })

  test("converts tens correctly", () => {
    expect(fromGeez("፲")).toBe(10)
    expect(fromGeez("፳")).toBe(20)
    expect(fromGeez("፺")).toBe(90)
  })

  test("converts combined numbers correctly", () => {
    expect(fromGeez("፲፩")).toBe(11)
    expect(fromGeez("፳፭")).toBe(25)
    expect(fromGeez("፺፱")).toBe(99)
  })

  test("converts hundreds correctly", () => {
    expect(fromGeez("፻")).toBe(100)
    expect(fromGeez("፪፻")).toBe(200)
    expect(fromGeez("፭፻")).toBe(500)
  })

  test("converts thousands correctly", () => {
    expect(fromGeez("፼")).toBe(1000)
    expect(fromGeez("፪፼")).toBe(2000)
    expect(fromGeez("፱፼፱፻፺፱")).toBe(9999)
  })

  test("throws error for invalid inputs", () => {
    expect(() => fromGeez("")).toThrow()
    expect(() => fromGeez("abc")).toThrow()
  })
})

describe("isGeezNumeral", () => {
  test("returns true for valid Geez numerals", () => {
    expect(isGeezNumeral("፩")).toBe(true)
    expect(isGeezNumeral("፲፩")).toBe(true)
    expect(isGeezNumeral("፪፻፳፭")).toBe(true)
  })

  test("returns false for invalid Geez numerals", () => {
    expect(isGeezNumeral("")).toBe(false)
    expect(isGeezNumeral("abc")).toBe(false)
    expect(isGeezNumeral("፩a")).toBe(false)
  })
})

describe("formatGeez", () => {
  test("formats with prefix and suffix", () => {
    expect(formatGeez(25, { prefix: "ቁጥር: ", suffix: " ነው" })).toBe("ቁጥር: ፳፭ ነው")
  })

  test("formats with separator", () => {
    expect(formatGeez(123, { separator: "-" })).toBe("፩-፻-፳-፫")
  })

  test("formats with all options", () => {
    expect(formatGeez(42, { prefix: "# ", suffix: " #", separator: "." })).toBe("# ፵.፪ #")
  })
})

