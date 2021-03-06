import { React, useContext, useState } from 'react';
import './login.css';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { UserContext } from '../../states/contexts/UserContext';
import ApiService from '../../../helpers/ApiServices';
import { TokenService } from '../../../helpers/StorageServices';
import { Link } from 'react-router-dom';


export default function Login() {
    const [show, setShow] = useState(false);

    const { dispatch, isFetching } = useContext(UserContext)


    const loginFormSubmitHandler = async (e) => {
        e.preventDefault();
        const dataArr = [...new FormData(e.currentTarget)];
        const data = Object.fromEntries(dataArr);
        try {
            setShow(false)
            dispatch({ type: "LOGIN_START" });
            const response = await ApiService.post('employee/login', data);
            console.log(response)
            if (response.data.isSuccess) {
                TokenService.saveToken(response.data.token)
                ApiService.setHeader();
                dispatch({ type: "LOGIN_SUCCESS", payload: response.data.document });
            } else {
                setShow(true)
                dispatch({ type: "LOGIN_FAILURE" });
            }

        } catch (error) {
            setShow(true)
            dispatch({ type: "LOGIN_FAILURE" });

        }

    }
    return (
        <div className="loginPage">
            <Container className="loginForm">
                <Row className="justify-content-center">
                    <Col xxl={12} xs={12} sm={10} md={6} lg={4} xl={3}>
                        <Card className="shadow loginForm" style={{ width: '100%', padding: '1rem' }}>
                            <div className="companyLogo">
                                <Card.Img variant="top" style={{ width: '4rem' }} src="/static/img/companyLogo.png" />
                                <h1>PCTeRP</h1>
                            </div>
                            <Form className="p-3 mt-4" onSubmit={loginFormSubmitHandler}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <Alert show={show} variant="danger">
                                    Your email or password is incorrect! Please try again.
                                </Alert>
                                <Button style={{ width: '100%' }} variant="primary" type="submit">
                                    SIGN IN
                                </Button>
                                <div className="loginFormFooter">
                                    <span>Don't have an account?</span>
                                    <span>Reset password</span>
                                </div>
                                <div className="loginFormFooter mt-4">
                                    <span>By clicking on the Log In button,
                                        you understand and agree to<Link to='/terms'> PCT Terms of Use </Link>
                                        and <Link to='/terms'> PCT Privacy Policy</Link></span>
                                </div>
                            </Form>


                        </Card>

                    </Col>
                </Row>
            </Container>


        </div>
    )
}
