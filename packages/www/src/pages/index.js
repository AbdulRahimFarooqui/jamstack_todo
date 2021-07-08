import React, { useEffect } from 'react';
import { Container, Button, Flex, Heading } from 'theme-ui'
import netlifyID from 'netlify-identity-widget'

export default props => {

    useEffect(() => {
        netlifyID.init({})
    }, [])

    return (
        <Container>
            <Flex sx={{ flexDirection: "column", padding: 5 }}>
                <Heading as="h1">Todo App</Heading>
                <Button sx={{ marginTop: 3 }}
                    onClick={() => { netlifyID.open() }}
                >Login</Button>
            </Flex>
        </Container>
    )
}