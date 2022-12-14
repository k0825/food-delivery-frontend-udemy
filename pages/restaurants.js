import { Button, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const GET_RESTAURANT_DISHES = gql`
  query GetRestaurantDishes($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          description
          dishes {
            data {
              id
              attributes {
                name
                description
                quantity
                price
                image {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Restaurants = () => {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  //   console.log(data.restaurant.data.attributes.dishes);
  if (data) {
    return (
      <>
        <h1>{data.restaurant.data.attributes.name}</h1>
        <Row>
          {data.restaurant.data.attributes.dishes.data.map((dish) => {
            // console.log(dish.attributes.quantity);
            return (
              <Col xs="6" sm="4" key={dish.id} style={{ padding: 0 }}>
                <CardBody style={{ margin: "0 10px" }}>
                  <CardImg
                    src={`${process.env.NEXT_PUBLIC_API_URL}${dish.attributes.image.data.attributes.formats.large.url}`}
                    top={true}
                    style={{ height: 250 }}
                  />
                  <CardTitle>{dish.attributes.name}</CardTitle>
                  <CardTitle>{dish.attributes.description}</CardTitle>
                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(dish)}
                  >
                    + ?????????????????????
                  </Button>
                </div>
              </Col>
            );
          })}
          <style jsx>
            {`
              a {
                color: hite;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-connt: 3;
              }
            `}
          </style>
          <Col>
            <div>
              <Cart />
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return <h1>???????????????????????????????????????????????????</h1>;
  }
};

export default Restaurants;
