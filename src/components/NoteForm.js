import React, {useState} from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.div`
    height: 100%;
`;

const Form = styled.form`
    height: calc(100% - 25px);
`;

const TextArea = styled.textarea`
    width: 100%;
    height: calc(100% - 25px);
`;

const NoteForm = props => {
    const [value, setValue] = useState({content: props.content || ''});

    const onChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Wrapper>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...value
                        }
                    })
                }}
            >
                <TextArea
                    required
                    type="text"
                    name="content"
                    placeholder="Note content"
                    value={value.content}
                    onChange={onChange}
                />
                <Button type="submit">Save</Button>
            </Form>
        </Wrapper>
    )
}

export default NoteForm;