import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { baseUrl } from "@/utils/baseUrl";
import { AuthReturns, login } from "@/actions/authActions";

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("authActions testing", () => {
  describe("login testing", () => {
    let body: { email: string; password: string };
    let goodResponse: AuthReturns;
    let badResponse: AuthReturns;

    beforeEach(() => {
      body = { email: "test@gmail.com", password: "test" };
      goodResponse = { token: "fasdfsd3423", error: undefined };
      badResponse = { token: undefined, error: "404" };

      (fetch as jest.Mock).mockClear();
    });

    it("should return a proper object with token", async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        json: async () => goodResponse,
      } as Response);

      const result = await login(body);

      expect(result?.error).toBeUndefined();
      expect(result?.token).toBeDefined();
      expect(fetch).toHaveBeenCalledTimes(1);

      expect(fetch).toHaveBeenCalledWith(
          `${baseUrl}/api/auth`,
          expect.objectContaining({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }),
      );
    });

    it("should return an error for a bad user", async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        json: async () => badResponse,
      } as Response);

      const result = await login(body);

      expect(result?.token).toBeUndefined();
      expect(result?.error).toBeDefined();
      expect(fetch).toHaveBeenCalledTimes(1);

      expect(fetch).toHaveBeenCalledWith(
          `${baseUrl}/api/auth`,
          expect.objectContaining({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }),
      );
    });
  });
});
