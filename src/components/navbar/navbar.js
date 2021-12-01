import React from 'react'
import { Container, Navbar, Nav, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'

export default class menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Navbar fixed="top" bg="primary" variant="dark" id="navbar">
                <Container>
                    <Navbar.Brand href="#home">
                        Store Control <span id="usuario-sub-branm"></span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" id="menu-usuario">
                            {/* <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link> */}
                            <DropdownButton id="dropdown-basic-button" title="Usuario">
                                <Dropdown.Header id="dropdown-header">
                                    <Row class="row">
                                        <FontAwesomeIcon icon={faUserCircle} />
                                    </Row>
                                    {/* <Dropdown.Divider /> */}
                                    <Row class="row">
                                        #USUARIO#
                                    </Row>
                                </Dropdown.Header>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-1">
                                    <h4 id="textoCentrado">Cerrar Sesión</h4>
                                </Dropdown.Item>
                                {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                            </DropdownButton>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
