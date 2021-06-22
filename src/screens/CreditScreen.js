import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import ProgressSteps from "../components/ProgressSteps"
import "../stylesheets/css/creditscreen.css"
import { getLoanStat } from "../services/creditFormService"

const CreditScreen = (props) => {
  const [loanStatus, setLoanStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLoanStatus()
  }, [])

  const getLoanStatus = () => {
    const loanid = localStorage.getItem("loanId")
    if (!loanid) {
      localStorage.setItem("nextRoute", "/creditapplication")
      return setLoading(false)
    }
    getLoanStat(loanid)
      .then((res) => {
        setLoading(false)
        if (!res.data || res.data.incomedetails !== "submitted")
          return localStorage.setItem("nextRoute", "/creditapplication")
        setLoanStatus(true)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const proceed = () => {
    if (loanStatus) return props.history.push("/creditapplication")
    props.history.push("/employmentscreen")
  }

  return (
    <div className="creditscreen">
      <div className="topsection">
        <Link to="/creditscreen">
          <i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i>{" "}
          Back
        </Link>
      </div>
      <div className="steps">
        <ProgressSteps step1 step2 step3 complete />
      </div>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col className="boxes mx-3 mb-3" xs={12} md={6}>
            <div className="text">
              <p className="mb-2">Wallet Balance</p>
              <h5 className="mb-2">₦0.00</h5>
              {/* <p className="text-muted">Expires in 29 days</p> */}
            </div>
          </Col>
          <Col className="boxes mx-3 mb-3" xs={12} md={6}>
            <div className="text">
              <p className="mb-2">Available Shopping Credit</p>
              <h5 className="mb-2">₦0.00</h5>
              {/* <p className="text-muted">Approved Tenor: 5 months</p> */}
            </div>
          </Col>
          <div className="apply-button my-3 text-center">
            <Button size="lg" disabled={loading} onClick={proceed}>
              Apply For Shopping Credit
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default CreditScreen
