import React from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";

import ButtonAsLink from "./ButtonAsLink";
import { DELETE_NOTE } from "../gql/mutations";
import { GET_MY_NOTES, GET_NOTES } from "../gql/qyerys";

const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
        onCompleted: data => {
            props.history.push('/mynotes');
        }
    })
    return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>
}

export default withRouter(DeleteNote);