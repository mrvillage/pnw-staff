import { Stack } from "@mantine/core";

export function CenterStack({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      align="center"
      justify="center"
      sx={{ position: "absolute", height: "100%", width: "100%" }}
    >
      {children}
    </Stack>
  );
}
