import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ListGroup,
  ListGroupItemHeading,
  ListGroupItem,
  ListGroupItemText,
  Button,
  Label,
  Input,
} from 'reactstrap';

import { useParams, useHistory } from 'react-router-dom';

import { useQuery } from 'react-apollo';
import * as queries from '../graphql/queries';

function ShopPage() {
  const { id } = useParams();
  const history = useHistory();

  const [comment, setComment] = React.useState('');

  const { data, loading, error } = useQuery(queries.GET_SHOP_BY_ID, {
    variables: {
      id,
    },
  });

  if (loading) {
    return (
      <Card>
        Loading...
      </Card>
    );
  }

  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-warning"
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)',
      backgroundPosition: 'center', /* Center the image */
      backgroundRepeat: 'no-repeat', /* Do not repeat the image */
      backgroundSize: 'cover', /* Resize the background image to cover the entire container */
    }}>
      <Card>
        <CardHeader className="d-flex flex-column align-items-center">
          <img style={{ height: '3rem', width: 'auto' }} src="https://cdn2.iconfinder.com/data/icons/laundry-12/64/dirty-laundry-washing-clothing-512.png" />
          <h1>
            {data.shops_by_pk.name}, {data.shops_by_pk.address.city}
          </h1>
          <h5>{data.shops_by_pk.address.address}</h5>
        </CardHeader>
        <CardBody className="d-flex flex-column">
          <Label>Write a comment</Label>
          <Input size="lg" placeholder="Your comment" value={comment} onChange={e => setComment(e.target.value)} />
          <ListGroup className="mt-1">
            {data.shops_by_pk.rating.map((r, i) => (
              <ListGroupItem key={i}>
                <ListGroupItemHeading>Rating {r.score}</ListGroupItemHeading>
                <ListGroupItemText>{r.comment}</ListGroupItemText>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
        <CardFooter className="justify-content-center w-100">
          <form onSubmit={() => history.push(`/shop/${data.shops_by_pk.user_id}/new`)}>
            <Button type="submit" color="success" outline className="w-100">NEW APPOINTMENT</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ShopPage;
