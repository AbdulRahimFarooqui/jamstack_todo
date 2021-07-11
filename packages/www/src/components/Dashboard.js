import React, { useContext, useRef, useState, useReducer } from 'react';
import { Router, Link } from '@reach/router';
import { Container, Input, Label, NavLink, Flex, Button, Heading, Checkbox } from 'theme-ui'
import { IDcontext } from '../../netlifyID';
import { gql, useMutation, useQuery } from '@apollo/client';

const ADD_TODO = gql`
mutation AddTodo($text:String!){
    addTodo(text:$text){
        id
        
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

export default () => {
    const { user, identity: netlifyID } = useContext(IDcontext)
    const inputRef = useRef();
    //const [todos, setTodos]= useState([]);
    const [todos, dispatch] = useReducer(todoReducer, [])
    const [addTodo] = useMutation(ADD_TODO);
    const { loading, data, error, refetch } = useQuery(GET_TODOS);
    const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
    return (
        <Container>
            <Flex as="nav">
                <NavLink as={Link} to={"/"} p={2}>
                    Home
                </NavLink>
                <NavLink as={Link} to={"/app"} p={2}>
                    Dashboard
                </NavLink>
                {user && (<NavLink p={2}
                    href="#!"
                    onClick={() => {
                        netlifyID.logout();
                    }}
                >
                    Log Out{user.user_metadata.full_name}
                </NavLink>)}
            </Flex>
            <Flex
                as="form"
                onSubmit={async e => {
                    e.preventDefault();
                    await addTodo({ variables: { text: inputRef.current.value } })
                    inputRef.current.value = "";
                    await refetch();
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
                {error ? <div>{error.message};)</div> : null}
                {!loading && !error && (
                    <ul sx={{ listStyleType: "none" }}>
                        {data.todos.map(todo => (
                            <Flex as="li"
                                key={todo.id}
                                onClick={async () => {
                                    await updateTodoDone({ variables: { id: todo.id } })
                                    await refetch()
                                }}
                            >
                                <Checkbox
                                    checked={todo.done}
                                    readOnly
                                />
                                <span>{todo.text}</span>
                            </Flex>
                        ))}
                    </ul>
                )}
            </Flex>
        </Container>
    )
}
