import { type ReactNode, useState } from "react";
import { TokenAPIContext } from "../contexts/TokenAPIContext";

export const TokenAPIProvider = ({ children }: { children: ReactNode }) => {
  const [tokenAPI, setTokenAPI] = useState<string | null>(null);

  return (
    <TokenAPIContext.Provider value={{ tokenAPI, setTokenAPI }}>
      {children}
    </TokenAPIContext.Provider>
  );
};
