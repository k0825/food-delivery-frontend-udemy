import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import withApollo from "../lib/apollo";
import Cookie from "js-cookie";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => {
    const newItem = items.find((i) => i.id === item.id);
    if (!newItem) {
      item = { ...item, attributes: { ...item.attributes, quantity: 1 } };
      console.log(item);
      setItems([...items, item]);
    } else {
      const newItems = items.map((item) => {
        if (item.id === newItem.id) {
          item = {
            ...item,
            attributes: {
              ...item.attributes,
              quantity: item.attributes.quantity + 1,
            },
          };
        }
        return item;
      });
      setItems(newItems);
    }
    setTotal(total + item.attributes.price);
    Cookie.set("cartItems", JSON.stringify(items));
  };

  const removeItem = (item) => {
    const newItem = items.find((i) => i.id === item.id);

    const newItems = [...items];
    const index = newItems.findIndex((i) => i.id === newItem.id);
    newItems.splice(index, 1);

    if (newItem.attributes.quantity > 1) {
      item = {
        ...item,
        attributes: {
          ...item.attributes,
          quantity: item.attributes.quantity - 1,
        },
      };
      setItems([...newItems, item]);
    } else {
      setItems(newItems);
    }
    setTotal(total - item.attributes.price);
    Cookie.set("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
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

  useEffect(() => {
    const cartItems = Cookie.get("cartItems");

    // console.log(cartItems);
    let total = 0;

    if (cartItems !== "undefined") {
      JSON.parse(cartItems).forEach((item) => {
        total += item.attributes.price * item.attributes.quantity;
      });

      setItems(JSON.parse(cartItems));
      setTotal(total);
    }
  }, []);

  // console.log(items);
  // console.log(items.map((item) => item.attributes.quantity));

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        addItem: addItem,
        removeItem: removeItem,
        cart: { items: items, total: total },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default withApollo()(MyApp);
