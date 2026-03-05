import { render, screen, fireEvent } from "@testing-library/react";
import SelectCoin from "./selectCoin";

jest.mock("../../hooks/useCrypto", () => ({
  useCrypto: () => ({
    dataCoins: [
      { id: "bitcoin", name: "Bitcoin" },
      { id: "ethereum", name: "Ethereum" },
    ],
    coin: { id: "bitcoin", name: "Bitcoin" },
    setCoin: jest.fn(),
    isLoad: false,
  }),
}));

describe("SelectCoin", () => {
  test("Renderiza button seleccion de la moneda", () => {
    render(<SelectCoin />);
    const button = screen.getByRole("button"); //

    expect(button).toHaveTextContent("Bitcoin");
    // expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    // expect(
    //   screen.getByText("Bitcoin", { selector: "button span" })
    // ).toBeInTheDocument();
  });

  test("abre dropdown cuando hace click", () => {
    render(<SelectCoin />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });
});
