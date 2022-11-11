import { Box, ScrollArea } from "@mantine/core";

interface PageScrollAreaProps {
  children: React.ReactNode;
}

export default function PageScrollArea({ children }: PageScrollAreaProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: `100vh`,
      }}
    >
      {/* Recursively apply height style since ScrollArea injects additional divs without a height so the footer ends up elevated */}
      <style
        dangerouslySetInnerHTML={{
          __html: `.full-height > div > div{height: 100% !important;}`,
        }}
      />
      <ScrollArea
        sx={{ display: "flex", flexGrow: 1, height: "100%" }}
        className="full-height"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <ScrollArea sx={{ width: "100vw", height: "100%" }}>
            <Box sx={{ flexGrow: 1, height: "100%" }}>{children}</Box>
          </ScrollArea>
        </Box>
      </ScrollArea>
    </Box>
  );
}
