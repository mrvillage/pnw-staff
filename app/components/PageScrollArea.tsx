import { ScrollArea } from "@mantine/core";

interface PageScrollAreaProps {
  children: React.ReactNode;
  minus?: number;
}

export default function PageScrollArea({
  children,
  minus = 0,
}: PageScrollAreaProps) {
  minus += 1;
  return (
    <ScrollArea sx={{ height: `calc(100% - ${minus}px)` }}>
      {children}
    </ScrollArea>
  );
}
