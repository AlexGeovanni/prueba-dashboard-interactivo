import { listCoinsApi } from "./listCoinsApi";

jest.mock("../env", () => ({
  apiKey: "fake_api_key",
  urlApi: "https://fake-url.com",
}));

globalThis.fetch = jest.fn();

describe("listCoinsApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("transforma los datos de la API correctamente", async () => {
    const mockApiResponse = [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "https://fake.com/btc.png",
        current_price: "70,000",
        market_cap: 42000,
      }
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await listCoinsApi();

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(result.length).toBe(1);

    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("symbol");
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("image");
    expect(result[0]).toHaveProperty("current_price");
    expect(result[0]).toHaveProperty("market_cap");
    expect(result[0].market_cap).toBe(42000);
  });

  test("lanza un error cuando la API falla", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(listCoinsApi()).rejects.toThrow(
      "Error al obtener la lista de monedas",
    );
  });
});
