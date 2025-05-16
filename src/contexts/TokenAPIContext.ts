import { createContext, useContext } from "react";

interface TokenAPIContextProps {
  tokenAPI: string | null;
  setTokenAPI: (token: string | null) => void;
}

export const TokenAPIContext = createContext<TokenAPIContextProps | undefined>(
  undefined
);

export const UseTokenAPIContext = () => {
  const context = useContext(TokenAPIContext);
  if (!context) {
    throw new Error("Token hilang");
  }
  return context;
};
