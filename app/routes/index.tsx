import {
  Button,
  Card,
  Center,
  createStyles,
  keyframes,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import { useEffect, useState } from "react";

const movingBackground = keyframes({
  "0%": { backgroundPosition: "0 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0 50%" },
});

interface Params {
  cardMounted: boolean;
  textMounted: boolean;
  buttonMounted: boolean;
}

const useStyles = createStyles(
  (theme, { cardMounted, textMounted, buttonMounted }: Params) => ({
    background: {
      height: "100vh",
      width: "100vw",
      background:
        "linear-gradient(90deg, #1e3c72 0%, #2a5298 21%, #3f72af 52%, #4e8cc2 78%, #5ea6d1 100%)",
      backgroundSize: "200% 200%",
      animation: `${movingBackground} 20s linear infinite`,
    },

    card: {
      opacity: 0.9,
      backgroundColor: "rgba(0,0,0,0.5)",
      height: "30%",
      width: "30%",
      maxHeight: "300px",
      [theme.fn.smallerThan("xs")]: {
        height: "50%",
        width: "80%",
      },
      transition: "max-height 3s ease",
    },

    text: {
      transition: "all 3s ease",
    },
  })
);

export default function Index() {
  const [cardMounted, setCardMounted] = useState(false);
  const [textMounted, setTextMounted] = useState(false);
  const [buttonMounted, setButtonMounted] = useState(false);
  const { classes } = useStyles({ cardMounted, textMounted, buttonMounted });
  useEffect(() => {
    setCardMounted(true);
  }, []);
  return (
    <div className={classes.background}>
      <Stack align="center" justify="center" sx={{ height: "100%" }}>
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
                  transition="pop-bottom-left"
                  duration={1000}
                  timingFunction="ease"
                  mounted={textMounted}
                  onEntered={() => {
                    setTimeout(() => setButtonMounted(true), 500);
                  }}
                >
                  {(styles) => (
                    <Text
                      align="center"
                      style={styles}
                      weight={500}
                      size="lg"
                      className={classes.text}
                    >
                      Welcome to the Politics and War Staff Portal.
                    </Text>
                  )}
                </Transition>
              </Center>
              <Center>
                <Transition
                  transition="pop-bottom-left"
                  duration={1000}
                  timingFunction="ease"
                  mounted={buttonMounted}
                >
                  {(styles) => (
                    <Button style={styles} variant="gradient" size="lg">
                      Sign In
                    </Button>
                  )}
                </Transition>
              </Center>
            </Card>
          )}
        </Transition>
      </Stack>
    </div>
  );
}
