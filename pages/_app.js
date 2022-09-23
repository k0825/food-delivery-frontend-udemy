import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import withApollo from "../lib/apollo";
import Cookie from "js-cookie";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        console.log(res);
        if (!res.ok) {
          Cookie.remove("token");
          setUser(null);
          return null;
        }
        const user = await res.json();
        setUser(user);
      });
    }
  }, []);
  return (
    <AppContext.Provider value={{ user: user, setUser: setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default withApollo()(MyApp);
