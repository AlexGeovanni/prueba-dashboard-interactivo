import { CryptoContext } from "@/context/CryptoProvider"
import { useContext } from "react"

// Este hook es para obtener el contexto 
export const useCrypto = () => {
  const context = useContext(CryptoContext)

  if (!context) {
    throw new Error("Este hook debe usarse dentro de CryptoProvider")
  }

  return context
}