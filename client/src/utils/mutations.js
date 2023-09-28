// [TODO:] make the following:

/*
LOGIN_USER will execute the loginUser mutation set up using Apollo Server

ADD_USER will execute the addUser mutation

SAVE_BOOK will execute the saveBook mutation

REMOVE_BOOK will execute the removeBook mutation

*/

import { gql } from "@apollo/client";

//LOGIN_USER will execute the loginUser mutation set up using Apollo Server

export const LOGIN_USER = gql`

`;

//ADD_USER will execute the addUser mutation
export const ADD_USER = gql`
    mutation addUser(username: String!, email: String!, password: String!){
        addUser(username: String!, email: String!, password: String!):
        {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;


