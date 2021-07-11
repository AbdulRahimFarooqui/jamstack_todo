import React, { useContext } from 'react';
import { Router, Link } from '@reach/router';
import { Container, NavLink, Flex, Button, Heading } from 'theme-ui'
import { IDcontext } from '../../netlifyID';
import Dash from '../components/Dashboard'

let DashLoggedOut = () => {
    const {user, identity: netlifyID } = useContext(IDcontext);
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