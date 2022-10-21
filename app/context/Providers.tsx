import React from "react";
import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "colorScheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          spacing: { xxs: 5, xxxs: 2 },
          primaryColor: "indigo",
        }}
        withNormalizeCSS
        withGlobalStyles
      >
        <NotificationsProvider>{children}</NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
