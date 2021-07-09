import React, { useContext } from 'react';
import { Router, Link } from '@reach/router';
import { Container, NavLink, Flex, Button, Heading } from 'theme-ui'
import { IDcontext } from '../../netlifyID';


let Dash = () => {
    const { user,identity: netlifyID } = useContext(IDcontext)
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
            <Flex sx={{ flexDirection: "column", padding: 5 }}>
                <Heading as="h1">Todo App</Heading>
                <Button sx={{ marginTop: 3 }}
                    onClick={() => { netlifyID.logout() }}
                >
                    Log Out
                </Button>
            </Flex>
        </Container>
    )
}

let DashLoggedOut = () => {
    const { identity: netlifyID } = useContext(IDcontext);
    return (
        <Container>
            <Flex sx={{ flexDirection: "column", padding: 5 }}>
                <Heading as="h1">You need to Sign-In to Access the Dashboard Facilities</Heading>
                <Button sx={{ marginTop: 3 }}
                    onClick={() => { netlifyID.open() }}
                >
                    Sign-In
                </Button>
            </Flex>
        </Container>
    )
}

export default props => {
    const { user } = useContext(IDcontext);
    if (!user) {
        return (
            <Router>
                <DashLoggedOut path="/app" />
            </Router>
        );
    };
    return (
        <Router>
            <Dash path="/app" />
        </Router>
    )
}