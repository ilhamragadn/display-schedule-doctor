import { type ReactNode } from "react";
import { TokenAPIProvider } from "./TokenAPIProvider";

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <TokenAPIProvider>{children}</TokenAPIProvider>
);
