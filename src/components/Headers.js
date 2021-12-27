import React from "react";
import {
    Navbar,
    Container,
    NavbarBrand,
} from 'reactstrap';

function Headers() {
    return (
        <>
            <Navbar
                color="dark"
                variant="dark"
            >
                <Container className="mx-0">
                    <NavbarBrand className="text-white" href="#">
                        DEMO
                    </NavbarBrand>
                </Container>
            </Navbar>
        </>
    );
}

export default Headers;
