import React, { useContext, useRef, useState, useReducer } from 'react';
import { Router, Link } from '@reach/router';
import { Container, Input, Label, NavLink, Flex, Button, Heading, Checkbox } from 'theme-ui'
import { IDcontext } from '../../netlifyID';

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
            console.log("Reducer ran, newState:",newState)
            return newState;
    }
}

export default props => {
    const { user, identity: netlifyID } = useContext(IDcontext)
    const inputRef = useRef();
    //const [todos, setTodos]= useState([]);
    const [todos, dispatch] = useReducer(todoReducer, [])
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
                    //setTodos([{done:false, value:inputRef.current.value},...todos])
                    dispatch({
                        type: "addTodo",
                        payload: inputRef.current.value
                    })
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
                <ul sx={{ listStyleType: "none" }}>
                    {todos.map((todo, i) => (
                        <Flex as="li"
                            onClick={() => {
                                dispatch({
                                    type: "toggleTodo",
                                    payload: i
                                })
                                // console.log('checkbox clicked, i:', i)
                                // console.log("todo:", todo)
                            }}
                        >
                            <Checkbox
                                checked={todo.done}
                            />
                            <span>{todo.value}</span>
                        </Flex>
                    ))}
                </ul>
            </Flex>
        </Container>
    )
}
