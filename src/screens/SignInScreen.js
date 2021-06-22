import React, { useState } from "react"
import {
  Col,
  Form,
  Row,
  Container,
  Button,
  InputGroup,
  Image
} from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import ProgressSteps from "../components/ProgressSteps"
import eye from "../images/Path 38.png"
import { successToast, doLogin } from "../services/authService"
import axios from "axios"

const SignInScreen = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState("")
  const [agree, setAgree] = useState("")
  const { status } = useParams()

  async function loginUser(e) {
    e.preventDefault()
    const userInfo = { email: email, pin: password }

    try {
      const response = await axios.post(
        "https://cryptic-reef-51266.herokuapp.com/user/login",
        userInfo
      )
      const { data: user } = response

      if (user) {
        localStorage.setItem("userObjFromBckEnd", JSON.stringify(user))
        successToast(response.data.message)
        props.history.push("/creditscreen")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="signup">
      <div className="top-section">
        <Link to={{ pathname: `/signup/${status}` }}>
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
              Sign In To Payqart
            </h3>

            <Container fluid>
              <Form className="form_" onSubmit={loginUser}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Email Address"
                    className="form-control_"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <InputGroup className="inputgroup_">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="form-control_"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span>
                      <Image src={eye} fluid />
                    </span>
                  </InputGroup>
                </Form.Group>

                {status === "1" ? (
                  <p className="text-center sitxt">
                    Don't have an account?{" "}
                    <Link to={{ pathname: `/signup/${status}` }}>Sign Up.</Link>
                  </p>
                ) : (
                  <p className="text-center sitxt">
                    Don't have an account?{" "}
                    <Link to="/eligibityscreen">
                      Proceed to check eligibility.
                    </Link>
                  </p>
                )}

                <div className="forgotpass">
                  <Link to="/forgotpassword">Forgot Password?</Link>
                </div>

                <div className="check">
                  <Form.Group>
                    <Form.Label>
                      <Form.Check
                        type="checkbox"
                        label=""
                        className="form-check-inline checker"
                        name="Details"
                        value="Yes"
                        onChange={(e) => setRemember(e.target.value)}
                      />
                      <span
                        style={{
                          color: "#720056",
                          fontSize: "13px",
                          fontWeight: "bold",
                          position: "absolute",
                          left: "30px"
                        }}
                      >
                        Remember Sign In Details.
                      </span>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <Form.Check
                        type="checkbox"
                        label=""
                        className="form-check-inline checker"
                        name="Terms"
                        value="agree"
                        onChange={(e) => setAgree(e.target.value)}
                        required
                      />
                      <span
                        style={{
                          color: "#720056",
                          fontSize: "13px",
                          fontWeight: "bold",
                          // position: "absolute",
                          left: "23px"
                        }}
                      >
                        I am over 22years and I have read and agree to PayQart's
                        Terms and Condtions. I agree that the information are
                        accurate and can be verified by PayQart.
                      </span>
                    </Form.Label>
                  </Form.Group>
                </div>
                <div className="contdbtn">
                  <Button
                    id="btmbtn"
                    // onClick={() => props.history.push('/creditscreen')}
                    type="submit"
                  >
                    Sign In
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

export default SignInScreen
