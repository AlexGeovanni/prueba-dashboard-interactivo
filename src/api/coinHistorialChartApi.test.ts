import { coinHistorialChartApiById } from "./coinHistorialChartApi"

jest.mock("../env", () => ({
  apiKey: "fake_api_key",
  urlApi: "https://fake-url.com"
}))
globalThis.fetch = jest.fn()

describe("coinHistorialChartApiById", () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("transforma los datos de la API correctamente", async () => {

    const mockApiResponse = {
      prices: [
        [1700000000000, 42000],
        [1700003600000, 43000]
      ],
      total_volumes: [
        [1700000000000, 1000000],
        [1700003600000, 1200000]
      ]
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse
    })

    const result = await coinHistorialChartApiById("bitcoin", 7)

    expect(fetch).toHaveBeenCalledTimes(1)

    expect(result.length).toBe(2)

    expect(result[0]).toHaveProperty("date")
    expect(result[0]).toHaveProperty("Price")
    expect(result[0]).toHaveProperty("volume")

    expect(result[0].Price).toBe(42000)
    expect(result[0].volume).toBe(1000000)

  })

  test("lanza un error cuando la API falla", async () => {

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false
    })

    await expect(
      coinHistorialChartApiById("bitcoin", 7)
    ).rejects.toThrow("Error al obtener la lista de monedas")

  })

})