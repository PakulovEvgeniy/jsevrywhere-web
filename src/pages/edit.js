import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from "../gql/qyerys";
import { EDIT_NOTE } from "../gql/mutations";

const EditNote = props => {
    const id = props.match.params.id;
    const {loading, error, data} = useQuery(GET_NOTE, {variables: {id}});
    const {loading: loading2, error: error2, data: userdata} = useQuery(GET_ME);
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    })
    

    if (loading || loading2) return <p>Loading...</p>;
    if (error || error2) return <p>Error! Note not found</p>;
    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>        
    }
    
    return <NoteForm content={data.note.content} action={editNote} />;
}

export default EditNote;