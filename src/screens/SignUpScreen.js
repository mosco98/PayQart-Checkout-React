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
import lock from "../images/Path 44.png"
import "../stylesheets/css/SignUpScreen.css"
import { successToast, doSignUp } from "../services/authService"
import axios from "axios"

const SignUpScreen = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bvn, setBvn] = useState("")
  const [agree, setAgree] = useState("")
  const { status } = useParams()

  async function signUpUser(e) {
    e.preventDefault()
    const userInfo = { email, pin: password, bvn }

    try {
      const response = await axios.post(
        "https://cryptic-reef-51266.herokuapp.com/user/signUp",
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
        <Link to="/planscreen">
          <i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i>{" "}
          Back
        </Link>
      </div>
      <div className="steps s-checks">
        <ProgressSteps step1 step2 complete />
      </div>
      <Row className="justify-content-md-center text-center">
        <Col md={8}>
          <div className="suform mb-3">
            <h3
              style={{
                color: "#720056",
                textAlign: "center"
              }}
            >
              Create A PayQart Account
            </h3>

            <Container fluid>
              <Form className="form_ mb-3" onSubmit={signUpUser}>
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
                    <span style={{ top: "15px" }}>
                      <Image src={eye} fluid />
                    </span>
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <InputGroup className="inputgroup_">
                    <Form.Control
                      type="text"
                      placeholder="Bank Verification Number"
                      className="form-control_"
                      value={bvn}
                      onChange={(e) => setBvn(e.target.value)}
                      required
                    />
                    <span>
                      <Image src={lock} fluid />
                    </span>
                  </InputGroup>
                </Form.Group>

                <p className="text-center sitxt">
                  Got an account?{" "}
                  <Link to={{ pathname: `/signin/${status}` }}>Sign In.</Link>
                </p>

                <div className="check">
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
                          left: "23px",
                          top: "-10px"
                        }}
                      >
                        I am over 22years and I have read and agree to PayQart's
                        Terms and Condtions. I agree that the information are
                        accurate and can be verified by PayQart.
                      </span>
                    </Form.Label>
                  </Form.Group>
                </div>

                <div className="mid"></div>
                <div className="contdbtn">
                  <Button id="btmbtn" type="submit">
                    Create Account
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

export default SignUpScreen
