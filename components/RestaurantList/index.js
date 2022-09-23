import Link from "next/link";
import { CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import { gql, useQuery } from "@apollo/client";

const GET_RESTAURANTS = gql`
  query getRestaurants {
    restaurants {
      data {
        id
        attributes {
          name
          description
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
`;

const RestaurantList = (props) => {
  const { search } = props;
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data) {
    const searchQuery = data.restaurants.data.filter((restaurant) =>
      restaurant.attributes.name.toLowerCase().includes(search)
    );
    return (
      <Row>
        {searchQuery.map((restaurant) => (
          <Col xs="6" sm="4" key={restaurant.id}>
            <CardBody style={{ margin: "0 0.5rem, 20px, 0.5rem" }}>
              <CardImg
                src={`${process.env.NEXT_PUBLIC_API_URL}${restaurant.attributes.image.data.attributes.formats.large.url}`}
                top={true}
                style={{ height: 250 }}
              />
              <CardTitle>{restaurant.attributes.name}</CardTitle>
              <CardTitle>{restaurant.attributes.description}</CardTitle>
            </CardBody>
            <div className="card-footer">
              <Link
                href={`/restaurants?id=${restaurant.id}`}
                as={`restaurants/${restaurant.id}`}
              >
                <a className="btn btn-primary">もっと見る</a>
              </Link>
            </div>
          </Col>
        ))}

        <style jsx>
          {`
            a {
              color: white;
            }
            a:link {
              text-decoration: none;
              color: white;
            }
            a:hover {
              color: white;
            }
            .card-columns {
              column-count: 3;
            }
          `}
        </style>
      </Row>
    );
  } else {
    return <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default RestaurantList;
