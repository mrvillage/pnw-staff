import { Center, createStyles, Tabs } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { Outlet, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import PageScrollArea from "~/components/PageScrollArea";
import { useClient } from "~/hooks/client";
import { loggedInOnlyReviewer } from "~/utils/routes";

export const loader: LoaderFunction = loggedInOnlyReviewer(async () => {
  return {};
}, "/r/login");

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  tabs: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

export default function Index() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = useState<string | null>("/r/home");
  const client = useClient();
  useEffect(() => {
    setValue(window.location.pathname);
  }, []);
  const items = [
    {
      value: "/r",
      label: "Home",
    },
    {
      value: "/r/applications",
      label: "Applications",
    },
    {
      value: "/r/templates",
      label: "Templates",
    },
  ];
  return (
    <div className={classes.header}>
      <Center>
        <Tabs
          defaultValue="Home"
          variant="outline"
          value={value}
          onTabChange={(v) => {
            const val = v || "/r/home";
            setValue(val);
            navigate(val);
          }}
          className={classes.tabs}
        >
          <Tabs.List className={classes.tabsList}>
            {items.map(({ value, label }) => (
              <Tabs.Tab value={value} key={value} className={classes.tab}>
                {label}
              </Tabs.Tab>
            ))}
            <Tabs.Tab
              color="red"
              value="logout"
              key="logout"
              className={classes.tab}
              onClick={() => {
                client.authStore.clear();
                navigate("/r/login");
              }}
            >
              Logout
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Center>
      <PageScrollArea>
        <Outlet />
      </PageScrollArea>
    </div>
  );
}
