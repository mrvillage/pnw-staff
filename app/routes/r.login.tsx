import {
  Button,
  Container,
  createStyles,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { useClient } from "~/hooks/client";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles(
  (theme, { loggedIn }: { loggedIn: boolean }) => ({
    loggedIn: {
      display: loggedIn ? "inherit" : "none",
    },

    notLoggedIn: {
      display: loggedIn ? "none" : "inherit",
    },
  })
);

export default function Index() {
  const client = useClient();
  const { classes } = useStyles({ loggedIn: !!client.authStore.token });
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });
  const [disabled, setDisabled] = useState(false);
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Reviewer Dashboard
      </Title>
      <Button
        fullWidth
        mt="xl"
        color="red"
        onClick={() => {
          client.authStore.clear();
        }}
        className={classes.loggedIn}
      >
        Sign out
      </Button>
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        className={classes.notLoggedIn}
      >
        <form
          onSubmit={form.onSubmit(async ({ username, password }) => {
            setDisabled(true);
            client
              .collection("reviewers")
              .authWithPassword(username, password)
              .then((authData) => {
                client.authStore.save(authData.token, authData.record);
                navigate("/r");
                setDisabled(false);
                form.reset();
              })
              .catch((err) => {
                console.error(err);
                setDisabled(false);
                showNotification({
                  title: "Error",
                  message:
                    "Something went wrong logging you in. Do you have the correct password?",
                });
              });
          })}
        >
          <TextInput
            label="Username"
            placeholder="The Banana Man"
            required
            disabled={disabled}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Definitely not 1234"
            required
            mt="md"
            disabled={disabled}
            {...form.getInputProps("password")}
          />
          <Button fullWidth mt="xl" type="submit" disabled={disabled}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
