import {
  Button,
  Card,
  Center,
  createStyles,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useClient } from "~/hooks/client";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "30%",
    width: "30%",
    [theme.fn.smallerThan("xs")]: {
      height: "50%",
      width: "80%",
    },
  },
}));

export default function Index() {
  const client = useClient();
  const { classes } = useStyles();
  const [cardMounted, setCardMounted] = useState(false);
  const [textMounted, setTextMounted] = useState(false);
  const [buttonMounted, setButtonMounted] = useState(false);
  useEffect(() => {
    setCardMounted(true);
  }, []);
  const login = async () => {
    const providers = await client.users.listAuthMethods();
    for (const provider of providers.authProviders) {
      if (provider.name === "discord") {
        localStorage.setItem("redirectProvider", JSON.stringify(provider));
        const url = new URL(location.href);
        url.pathname = "/auth/login/discord/redirect";
        localStorage.setItem("redirectUrl", url.toString());
        window.location.href = provider.authUrl + url.toString();
      }
    }
  };
  return (
    <Stack
      align="center"
      justify="center"
      sx={{ position: "absolute", height: "100%", width: "100%" }}
    >
      <Transition
        transition="scale-x"
        duration={1000}
        timingFunction="ease"
        mounted={cardMounted}
        onEntered={() => {
          setTimeout(() => setTextMounted(true), 500);
        }}
      >
        {(styles) => (
          <Card m="xl" p="xl" className={classes.card} style={styles}>
            <Center pb="md" sx={{ height: "50%" }}>
              <Transition
                transition="pop"
                duration={500}
                timingFunction="ease"
                mounted={textMounted}
                onEntered={() => {
                  setTimeout(() => setButtonMounted(true), 500);
                }}
              >
                {(styles) => (
                  <Text align="center" style={styles} weight={500} size="lg">
                    Welcome to the Politics and War Staff Portal.
                  </Text>
                )}
              </Transition>
            </Center>
            <Center>
              <Transition
                transition="slide-up"
                duration={500}
                timingFunction="ease"
                mounted={buttonMounted}
              >
                {(styles) => (
                  <Button
                    style={styles}
                    variant="gradient"
                    size="lg"
                    onClick={login}
                  >
                    Sign In
                  </Button>
                )}
              </Transition>
            </Center>
          </Card>
        )}
      </Transition>
    </Stack>
  );
}
