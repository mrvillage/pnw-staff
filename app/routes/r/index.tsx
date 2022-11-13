import type { LoaderFunction } from "@remix-run/cloudflare";
import { loggedInOnlyReviewer } from "~/utils/routes";
import { Box, Card, Grid, Paper, Stack, Title } from "@mantine/core";

export const loader: LoaderFunction = loggedInOnlyReviewer(async () => {
  return {};
});

export default function Index() {
  return (
    <Grid py="md" px="lg" sx={{ width: "100%" }}>
      <Grid.Col md={12} lg={6}>
        <Box>
          <Stack>
            <Title
              align="center"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Test
            </Title>
            Test
          </Stack>
        </Box>
      </Grid.Col>
      <Grid.Col md={12} lg={6}>
        THIS IS THE SECOND DIV
      </Grid.Col>
    </Grid>
  );
}
