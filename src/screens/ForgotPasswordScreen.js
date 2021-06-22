import React, { useState } from "react"
import { Col, Form, Row, Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import ProgressSteps from "../components/ProgressSteps"
import { successToast, doPasswordReset } from "../services/authService"

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState("")

  const resetUserPassword = (e) => {
    e.preventDefault()
    const user = { email: email }
    doPasswordReset(user)
      .then((res) => {
        successToast(res.data)
        props.history.push("/signin")
      })
      .catch(() => {})
  }

  return (
    <div className="signup">
      <div className="top-section">
        <Link to="/signin">
          <i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i>{" "}
          Back
        </Link>
      </div>
      <div className="steps s-checks">
        <ProgressSteps step1 step2 complete />
      </div>

      <Row className="justify-content-md-center text-center">
        <Col md={8}>
          <div className="suform">
            <h3
              style={{
                color: "#720056",
                textAlign: "center"
              }}
            >
              Reset Password
            </h3>

            <Container fluid>
              <Form className="form_" onSubmit={resetUserPassword}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    className="form-control_"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="contdbtn">
                  <Button id="btmbtn" type="submit">
                    Reset Password
                  </Button>
                </div>
              </Form>
            </Container>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPasswordScreen
