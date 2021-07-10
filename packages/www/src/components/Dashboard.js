import React, { useContext, useRef, useState, useReducer } from 'react';
import { Router, Link } from '@reach/router';
import { Container, Input, Label, NavLink, Flex, Button, Heading, Checkbox } from 'theme-ui'
import { IDcontext } from '../../netlifyID';
import { gql, useMutation, useQuery } from '@apollo/client';

const ADD_TODO = gql`
mutation AddTodo($text:String!){
    addTodo(text:$text){
        id
        type
    }
}
`;

const GET_TODOS = gql`
query GetTodos{
    todos{
        id
        text
        done
    }
}
`;

const UPDATE_TODO_DONE = gql`
mutation Update_Todo_Done($id:ID!){
    updateTodoDone(id:$id){
        text
        done
    }
}
`;
const todoReducer = (state, action) => {
    switch (action.type) {
        case "addTodo":
            return [{ done: false, value: action.payload }, ...state]
        case "toggleTodo":
            const newState = [...state];
            newState[action.payload] = {
                done: !state[action.payload].done,
                value: state[action.payload].value
            }
            console.log("Reducer ran, newState:", newState)
            return newState;
    }
}

export default props => {
    const { user, identity: netlifyID } = useContext(IDcontext)
    const inputRef = useRef();
    //const [todos, setTodos]= useState([]);
    const [todos, dispatch] = useReducer(todoReducer, [])
    const [addTodo] = useMutation(ADD_TODO);
    const { loading, data, error } = useQuery(GET_TODOS);
    const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
    return (
        <Container>
            <Flex as="nav">
                <NavLink as={Link} to="/" p={2}>
                    Home
                </NavLink>
                {user && (<NavLink p={2}>
                    {user.user_metadata.full_name}
                </NavLink>)}
            </Flex>
            <Flex
                as="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addTodo({ variables: { text: inputRef.current.value } })
                    inputRef.current.value = ""
                }}>
                <Label sx={{ display: "flex" }}>
                    <span>Add&nbsp;Todo</span>
                    <Input ref={inputRef} sx={{ marginLeft: 1 }} />
                </Label>
                <Button sx={{ marginLeft: 1 }}>
                    Submit
                </Button>
            </Flex>
            <Flex sx={{ flexDirection: "column" }}>
                {loading ? <div>loading...</div> : null}
                {error ? <div>Error retrieving your tasks, looks like you will have to go back to 19th centuary style of remembering your todo's ;)</div> : null}
                {!loading && !error && (
                    <ul sx={{ listStyleType: "none" }}>
                        {todos.map(todo => (
                            <Flex as="li"
                                onClick={() => {
                                    updateTodoDone({variables:{id:todo.id}})
                                }}
                            >
                                <Checkbox
                                    checked={todo.done}
                                />
                                <span>{todo.value}</span>
                            </Flex>
                        ))}
                    </ul>
                )}
            </Flex>
        </Container>
    )
}
