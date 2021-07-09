import React, { useContext } from 'react';
import { Container, Button, Flex, Heading } from 'theme-ui'
// import netlifyID from 'netlify-identity-widget'
import { NavLink } from 'theme-ui'
import {Link} from 'gatsby';
import {IDcontext} from '../../netlifyID';

export default props => {
    const {user, identity: netlifyID} = useContext(IDcontext)
    return (
        <Container>
            <Flex as="nav">
                <NavLink as={Link} to="/" p={2}>
                    Home
                </NavLink>
                <NavLink as={Link} to={"/app"} p={2}>
                    Dashboard
                </NavLink>
                {user && (<NavLink p={2}>
                    {user.user_metadata.full_name}
                </NavLink>)}
            </Flex>
            <Flex sx={{ flexDirection: "column", padding: 5 }}>
                <Heading as="h1">Todo App</Heading>
                <Button sx={{ marginTop: 3 }}
                    onClick={() => { netlifyID.open() }}
                >Login</Button>
            </Flex>
        </Container>
    )
}