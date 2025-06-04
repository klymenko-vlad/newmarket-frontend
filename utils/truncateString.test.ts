import {describe, expect, test} from '@jest/globals';
import truncateString from "@/utils/truncateString";

describe("truncateString testing", () => {
  test("should return a truncated string", () => {
    const result = truncateString("hello hello", 7);

    expect(result).toBe("hello h...");
  });

  test("should return an unchanged string", () => {
    const result = truncateString("hello", 8);

    expect(result).toBe("hello")
  })
});
