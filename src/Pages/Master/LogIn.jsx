import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { LogInService } from '../../API/Service/Masterservice';
import { useNavigate } from 'react-router-dom';


const InitialFormvalue = {
    mailId: "",
    password: ""

};

export default function LogIn() {
    const navigate = useNavigate();
 

useEffect(() => {
    const tokaen = localStorage.getItem("token");
    console.log("tokaen login page", tokaen);
    // If already logged in
    if (tokaen) {
        navigate("/getstu");
    }
}//, [navigate]
);



    const FormickObj = useFormik({
        initialValues: InitialFormvalue,
        onSubmit: (values) => {
            LogInService(values)
                .then(Response => {
                    const { token, expiryTime } = Response.data;
                    const { Status, Message, Token } = Response.data;
                    if (token && token !== "") {
                        
                        localStorage.setItem("token", token);
                        localStorage.setItem(
                            "expiryTime",
                            new Date(expiryTime).getTime()
                        );
                        console.log(expiryTime);
                        alert("Login Successful");
                          window.location.href = "/getstu";
                    }
                    else {
                        alert("Invalid Username or Password");
                    }
                })
                .catch(Error => {
                    console.log("Error", Error);
                });
            console.log('values', values);
        }
    });

    const handlereset = () => {
        FormickObj.resetForm();
    };

    return (
        <Container className="mt-4">
            <Card className="shadow border-0">

                <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Add User</h5>
                </Card.Header>

                <Card.Body>
                    <Form onSubmit={FormickObj.handleSubmit}>

                        {/* Row 1 */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="mailId"
                                        value={FormickObj.values.mailId}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter Email"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="password"
                                        value={FormickObj.values.password}
                                        onChange={FormickObj.handleChange}
                                        placeholder="Enter Password"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                        {/* Buttons */}
                        <div className="text-end mt-4">

                            <Button variant="success" type="submit">
                                LogIn
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}