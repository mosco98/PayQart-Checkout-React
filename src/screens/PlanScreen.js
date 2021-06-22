import React, { useEffect, useState } from "react"
import { Row, Col, Form, Button, Container, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import ProgressSteps from "../components/ProgressSteps"
import "../stylesheets/css/planscreen.css"
import { employeeDti, setStatus } from "../services/Formulae"
import Message from "../components/Message"
import { inititiateCredit } from "../services/creditFormService"
import axios from "axios"

const PlanScreen = (props) => {
  const data = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {}
  // console.log(data)

  const [plans, setPlans] = useState([])
  const [cartValue, setCartValue] = useState(80500)
  const [downPayment, setDownPayment] = useState(cartValue * 0.3)
  const [payInfo, setPayInfo] = useState({})
  const [tenure, setTenure] = useState("")
  const [tenureNum, setTenureNum] = useState(Number)
  const [monthlyRepay, setMonthlyRepay] = useState([])
  const [updatedDownPayment, setUpdatedDownPayment] = useState("")
  const [info, setInfo] = useState({})
  const [monthlyAmount, setMonthlyAmount] = useState(Number)
  const [textString, setTextString] = useState(String)
  const [error, setError] = useState("")
  const [showBreakdown, setShowBreakdown] = useState(Boolean)
  // console.log(Number(updatedDownPayment.split(',').join('')))
  // console.log(monthlyAmount.toString())

  const income = data.income
  const loanAmount = data.loanAmount
  const monthlyExpense = data.monthlyExpense
  const interestRate = 0.04

  useEffect(() => {
    const info = setStatus(
      cartValue,
      income,
      monthlyExpense,
      loanAmount,
      interestRate,
      downPayment,
      tenureNum > 0 ? tenureNum : 1
    )
    // console.log(info)
    setInfo(info)
    setTextString(info.textString)
    setPlans(info.monthsArray)
    setPayInfo(info.data)
    setMonthlyRepay(info.monthlyRepay)
    // setTenureNum(4)
    setMonthlyAmount(info.repay)
  }, [cartValue, downPayment, income, loanAmount, monthlyExpense, tenureNum])

  const formSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (Number(updatedDownPayment.split(",").join("")) < cartValue * 0.3) {
      setError(
        `Down Payment cannot be lower than 30% of cart value (${
          cartValue * 0.3
        })`
      )
      return
    }
    if (Number(updatedDownPayment.split(",").join("")) > cartValue) {
      setError(`Down Payment cannot be greater than cart value (${cartValue})`)
      return
    }
    setDownPayment(Number(updatedDownPayment.split(",").join("")))
  }

  async function initiateCreditApplication() {
    const existingLoan = loanAmount ? "Yes" : "No"
    const loanObj = {
      ramount: payInfo.shoppingCredit,
      rsalary: income,
      expenses: data.monthlyExpense,
      existingloan: existingLoan,
      typeofbusiness: data.employmentType,
      currentrepayment: loanAmount,
      rduration: tenureNum,
      downpayment: downPayment,
      debtincomeratio: payInfo.dti,
      rpaydate: "23"
    }

    try {
      const response = await axios.post(
        "https://cryptic-reef-51266.herokuapp.com/user/initiate-credit",
        loanObj
      )

      const { data: loanid } = response

      if (loanid) {
        localStorage.setItem("loanId", response.data.loanid)
        const nextRoute = localStorage.getItem("nextRoute")
        if (nextRoute) return props.history.push(nextRoute)
        props.history.push("/signup/1")
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }

    // inititiateCredit(loanObj)
    //   .then((response) => {
    //     localStorage.setItem("loanId", response.data.loanid)
    //     const nextRoute = localStorage.getItem("nextRoute")
    //     if (nextRoute) return props.history.push(nextRoute)
    //     props.history.push("/signup/1")
    //   })
    //   .catch(() => {})
  }

  return (
    <div className="planScreen">
      <div className="topsection">
        <Link to="/employmentscreen">
          <i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i>{" "}
          Back
        </Link>
      </div>
      <div className="steps">
        <ProgressSteps step1 complete />
      </div>
      <Row className="justify-content-md-center">
        <Col>
          <div className="plans">
            <h3
              style={{
                color: "#720056",
                textAlign: "center"
              }}
            >
              Choose Your Plan
            </h3>
            <Container fluid>
              <Row>
                {plans.map((item) => (
                  <Col
                    key={item.id}
                    className={`boxz ${tenureNum === item.id && `focused`}`}
                    tabIndex={`${item.id}`}
                    md={2}
                    xs={3}
                    onClick={() => {
                      setShowBreakdown(true)
                      setTenure(
                        `${
                          item.id > 1 ? `${item.id} months` : `${item.id} month`
                        }`
                      )
                      setTenureNum(item.id)
                      setTextString(plans[item.id - 1].description)
                      setMonthlyAmount(plans[item.id - 1].monthlyRepayment)
                    }}
                  >
                    <div className={`top top${item.id}`}></div>
                    <div className="content text-center">
                      <p>{showBreakdown === true && item.text}</p>
                      <h5>{`${item.id}`}</h5>
                      <p>{`${item.id > 1 ? "months" : "month"}`}</p>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row className="text-center infotext">
                <p>{showBreakdown === true && textString}</p>
              </Row>
            </Container>
            <Row className="justify-content-md-center text-center mt-5">
              {showBreakdown === true && (
                <h3
                  style={{
                    color: "#720056"
                  }}
                >
                  Payment Breakdown
                </h3>
              )}
              {showBreakdown === true && (
                <div className="paymentbreakdown">
                  <Container fluid>
                    {error && (
                      <Message variant="info">
                        {error}{" "}
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => setError("")}
                          className="far fa-times-circle"
                        ></i>
                      </Message>
                    )}
                    <Row className="justify-content-md-center ">
                      <Col className="brkdwn" md={8}>
                        <Row className="bkdn py-2 justify-content-md-center">
                          <Row className="">
                            <Col md={6} xs={6}>
                              <p className="bdtxt text-muted">
                                <b>Down Payment</b>
                              </p>
                            </Col>
                            <Col className="lbl" md={6} xs={6}>
                              <p className="lbo">
                                <b>{`₦ ${downPayment
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</b>
                              </p>
                            </Col>
                          </Row>
                          <Row className="sumry">
                            <Col md={6} xs={6}>
                              <p className="bdtxt text-muted">
                                Shopping Credit
                              </p>
                            </Col>
                            <Col className="lbl" md={6} xs={6}>
                              <p className="lbo">{`₦ ${
                                payInfo.shoppingCredit
                                  ? payInfo.shoppingCredit
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                  : ""
                              }`}</p>
                            </Col>
                          </Row>
                          <Row className="">
                            <Col md={6} xs={6}>
                              <p className="bdtxt text-muted">
                                Monthly Installment
                              </p>
                            </Col>
                            <Col className="lbl" md={6} xs={6}>
                              <p className="lbo">{`₦ ${monthlyAmount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                            </Col>
                          </Row>
                          <Row className="">
                            <Col md={6} xs={6}>
                              <p className="bdtxt text-muted">Tenure</p>
                            </Col>
                            <Col className="lbl" md={6} xs={6}>
                              <p className="lbo">{tenure}</p>
                            </Col>
                          </Row>
                        </Row>
                      </Col>

                      <Col className="customside" md={4}>
                        <span>Customize Down Payment</span>
                        <Row className="justify-content-md-center ">
                          <Col md={9} xs={6} lg={9}>
                            <Form className="frmctn" onSubmit={formSubmit}>
                              <Form.Group>
                                <InputGroup>
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend2">
                                      <span className="inputicon">₦</span>
                                    </InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <Form.Control
                                    type="text"
                                    className="frm"
                                    placeholder={`${(cartValue * 0.3)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                    value={updatedDownPayment}
                                    onChange={(e) => {
                                      const {
                                        target: { value }
                                      } = e
                                      setUpdatedDownPayment(
                                        (
                                          Number(value.replace(/\D/g, "")) || ""
                                        ).toLocaleString()
                                      )
                                      // setUpdatedDownPayment(e.target.value)
                                    }}
                                    required
                                  />
                                </InputGroup>
                              </Form.Group>
                              <div className="subbtn text-center mx-auto">
                                <Button
                                  style={{
                                    border: "2px solid #fff",
                                    width: "100%",
                                    borderRadius: "7px"
                                  }}
                                  type="submit"
                                  variant="outline-success"
                                  id="sub-btn"
                                  disabled={!updatedDownPayment}
                                >
                                  <span className="uptbtn">Update</span>
                                </Button>
                              </div>
                            </Form>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </div>
              )}
              <div className="btmbtn text-center mx-auto">
                <Button
                  id="btmbtn"
                  onClick={initiateCreditApplication}
                  disabled={!showBreakdown}
                >
                  Continue
                </Button>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PlanScreen
