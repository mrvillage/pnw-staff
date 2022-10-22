import { createStyles, keyframes } from "@mantine/core";

const movingBackground = keyframes({
  "0%": { backgroundPosition: "0 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0 50%" },
});

const useStyles = createStyles((theme) => ({
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
    background:
      "linear-gradient(90deg, #1e3c72 0%, #2a5298 21%, #3f72af 52%, #4e8cc2 78%, #5ea6d1 100%)",
    backgroundSize: "200% 200%",
    animation: `${movingBackground} 20s linear infinite`,
  },
}));
export function Background() {
  const { classes } = useStyles();
  return <div className={classes.background}></div>;
}
