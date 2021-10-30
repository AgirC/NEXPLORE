import gql from "graphql-tag";

export const GET_DUTIES = gql`
    query Duty {
        duties {
            id
            name
        }
    }`;

export const CREATE_DUTY = gql`
    mutation createDuty($name: String!) {
        createDuty(name: $name) {
            name
        }
    }`;

export const UPDATE_DUTY = gql`
    mutation updateDuty($id: String!, $name: String!) {
        updateDuty(id: $id, name: $name) {
            id
            name
        }
    }`;

export const DELETE_DUTY = gql`
    mutation deleteDuty($id: String!) {
        deleteDuty(id: $id) {
            id
        }
    }`;