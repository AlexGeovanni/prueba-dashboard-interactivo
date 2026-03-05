jest.mock("../env", () => ({
  apiKey: "fake_api_key",
  urlApi: "https://fake-url.com",
}));
import { formatDate } from "./coinHistorialChartApi";

describe("formatDate", () => {

  test("debe formatear la marca de tiempo de 1 día como hora", () => {
    //formatDate(tiempo, el dia)
    const result = formatDate(1700000000000, 1) 
    expect(result).toMatch(/\d{1,2} (AM|PM)/)  // solo hora
  })

  test("formatear la marca de tiempo de > 7 días solo como hora", () => {
    const result = formatDate(1700000000000, 3)
    expect(result).toMatch(/[A-Za-z]{3} \d{1,2}, \d{2} (AM|PM)/)  // "mes y hora"
  })

  test("formatear la marca de tiempo de > 7 días solo como fecha", () => {
    const result = formatDate(1700000000000, 10)
    expect(result).toMatch(/[A-Za-z]{3} \d{1,2}/)  // "mes"
  })

})
