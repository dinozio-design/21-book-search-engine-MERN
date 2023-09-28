// [TODO:] This will hold the GET_ME which will execure the me query set up using Apollo Server

import { gql } from '@apollo/client';

export const GET_ME = gql`
query Query {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            _id
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;
