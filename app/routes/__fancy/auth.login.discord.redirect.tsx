import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useClient } from "~/hooks/client";
import { IconAlertCircle } from "@tabler/icons";
import { showNotification, updateNotification } from "@mantine/notifications";

export default function Redirect() {
  const navigate = useNavigate();
  const client = useClient();
  const [error, setError] = useState(false);
  useEffect(() => {
    showNotification({
      id: "login",
      message: "Logging in...",
      loading: true,
      autoClose: false,
      disallowClose: true,
    });
    const params = new URLSearchParams(location.search);
    const provider = localStorage.getItem("redirectProvider");
    if (!provider) {
      console.error("provider not set");
      return setError(true);
    }
    const redirectUrl = localStorage.getItem("redirectUrl");
    if (!redirectUrl) {
      console.error("redirectUrl not set");
      return setError(true);
    }
    const data = JSON.parse(provider);
    console.log(params);
    if (params.get("state") !== data.state) {
      console.error("invalid state");
      return setError(true);
    }
    client.users
      .authViaOAuth2(
        data.name,
        params.get("code") || "",
        data.codeVerifier,
        redirectUrl
      )
      .then((authData) => {
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
    // localStorage.removeItem("redirectProvider");
    // localStorage.removeItem("redirectUrl");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (error) {
      updateNotification({
        id: "login",
        title: "Uh oh!",
        message:
          "Something went wrong while logging in! You will be redirected to the home page in 3 seconds.",
        loading: false,
        autoClose: false,
        color: "red",
        disallowClose: false,
        icon: <IconAlertCircle size={18} />,
      });
      setTimeout(() => navigate("/"), 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return <></>;
}
