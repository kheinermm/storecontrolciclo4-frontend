import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container id="login-container" style={{ marginTop: 200 }}>
                <Form>
                    <Form.Group>
                        <Form.Label style={{ float: 'left' }}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label style={{ float: 'left' }}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}