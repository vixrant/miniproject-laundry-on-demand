import { gql } from 'apollo-boost';


export const GET_SHOPS = gql`
{
  shops {
    user_id
    name
    address {
      latitude
      longitude
    }
    rating {
      score
    }
  }
}
`;

export const GET_SHOP_BY_ID = gql`
query ShopDetails($id: String!){
  shops_by_pk(shop_id: $id) {
    user_id
    name
    address {
      latitude
      longitude
      address
      city
    }
    rating {
      score
      comment
    }
  }
}
`;

export const GET_SHOPS_NEAR_USER = gql`
query ShopList($id: String!) {
  shops_near_customer_address(customer_id: $id) {
    user_id
    name
    address {
      latitude
      longitude
    }
    rating {
      score
    }
  }
}
`;

export const GET_ADDRESSES = gql`
{
  addresses {
    latitude
    longitude
    user {
      shop {
        name
      }
    }
  }
}
`;

export const GET_CUSTOMERS = gql`
{
  customers {
    id
    name
    email
    address
    city
    latitude
    longitude
  }
}
`;

export const GET_CUSTOMERS_COUNT = gql`
{
  customers_aggregate {
    aggregate {
      count(columns: id)
    }
  }
}
`;

export const GET_CITY_CUSTOMERS_COUNT = gql`
{
  customers_by_city {
    name: city
    count
  }
}
`;

export const GET_ITEM_TYPES = gql`
{
  item_types {
    type_id
    name
    ironing_price
    dry_cleaning_price
  }
}
`;

export const ADD_APPOINTMENT = gql`
mutation AddAppointment ($user_id: String!, $shop_id: String!, $time: String!) {
  insert_appointments(user_id: $user_id, shop_id: $shop_id, address_id: $user_id, scheduled_for: $time)
}
`;
