import {
  Alert,
  Anchor,
  createStyles,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { IconCircleX } from "@tabler/icons";
import type { Record } from "pocketbase";
import { CenterStack } from "~/components/CenterStack";
import { loggedInOnly } from "~/utils/routes";
import { Home as HomeComponent } from "~/components/Home";
import { useEffect, useState } from "react";

export const loader: LoaderFunction = loggedInOnly(async ({ context }) => {
  let linked;
  let discord_id;
  if (context.client.authStore.model?.discord_id) {
    discord_id = context.client.authStore.model?.discord_id;
  } else {
    discord_id = (
      await context.client
        .collection("users")
        .listExternalAuths((context.client.authStore.model as Record).id)
    ).find((auth) => auth.provider === "discord")?.providerId;
    if (discord_id) {
      await context.client
        .collection("users")
        .update((context.client.authStore.model as Record).id, {
          discord_id,
        });
    } else {
      context.client.authStore.clear();
      return json({ linked: false });
    }
  }
  if (context.client.authStore.model?.nation_id) {
    linked = true;
  } else {
    const { nation_id }: { nation_id: number | null } = await (
      await fetch(
        `https://api.politicsandwar.com/discord/nation/${discord_id}`,
        { method: "GET" }
      )
    ).json();
    if (!nation_id) {
      linked = false;
    } else {
      await context.client
        .collection("users")
        .update((context.client.authStore.model as Record).id, {
          nation_id,
        });
      linked = true;
    }
  }
  return json({ linked });
});

const useStyles = createStyles((theme) => ({
  alert: {
    width: "60%",
    [theme.fn.smallerThan("xs")]: {
      width: "80%",
    },
  },
}));

export default function Home() {
  const { linked } = useLoaderData<{ linked: boolean }>();
  const { classes } = useStyles();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return linked ? (
    <HomeComponent />
  ) : (
    <CenterStack>
      <Transition
        transition="scale"
        duration={500}
        timingFunction="ease"
        mounted={mounted}
      >
        {(styles) => (
          <Alert
            color="red"
            icon={<IconCircleX size={18} />}
            className={classes.alert}
            title="Uh oh!"
            style={styles}
          >
            <Stack align="center">
              <Text align="center" size="md">
                Your Discord account isn&apos;t linked to your nation!
                <br />
                Head over to the Politics and War Discord server{" "}
                <Anchor href="https://discord.gg/H9XnGxc">here</Anchor> and use
                the /validate command in #botspam, then come back here!
              </Text>
            </Stack>
          </Alert>
        )}
      </Transition>
    </CenterStack>
  );
}
