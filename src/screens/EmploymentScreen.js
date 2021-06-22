import React, { useState } from "react"
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap"
import InputField from "../components/InputField"
import "../stylesheets/css/employementscreen.css"
import paid from "../images/image 4.png"
import free from "../images/image 5.png"
import coop from "../images/image 6.png"
import ProgressSteps from "../components/ProgressSteps"

const EmploymentScreen = (props) => {
  const [employmentType, setEmploymentType] = useState("")
  const [show, setShow] = useState(false)
  const [existingLoan, setExistingLoan] = useState(false)
  const [payDate, setPayDate] = useState(new Date())
  const [salary, setSalary] = useState("")
  const [monthlyExpense, setMonthlyExpense] = useState("")
  const [loanAmount, setLoanAmount] = useState("")

  const dateValue = payDate.toDateString()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        income: Number(salary.split(",").join("")),
        monthlyExpense: Number(monthlyExpense.split(",").join("")),
        loanAmount: Number(loanAmount.split(",").join("")),
        employmentType
      })
    )
    props.history.push("/planscreen")
  }
  return (
    <div className="pager">
      <Container fluid>
        <div className="stps">
          <ProgressSteps />
        </div>
        <Row className="justify-content-md-center f-row mt-3">
          <Col md={9} xs={12}>
            <h5 id="occu-text" className="text-center my-3">
              Select Your Employment Type
            </h5>
            <Row className="justify-content-md-center mb-4">
              <Col className="mx-3 boxs" md={3}>
                <div
                  className="options"
                  tabIndex="1"
                  onClick={() => setEmploymentType("Paid employment")}
                >
                  <div>
                    <Image fluid src={paid} />
                  </div>
                  <span className="imgtxt">Paid Employment</span>
                </div>
              </Col>

              <Col className="mx-3 boxs" md={3}>
                <div
                  className="options"
                  tabIndex="2"
                  onClick={() => setEmploymentType("self employed/ freelance")}
                >
                  <div>
                    <Image fluid src={free} />
                  </div>
                  <span className="imgtxt">Self Employed/ Freelance</span>
                </div>
              </Col>

              <Col className="mx-3 boxs" md={3}>
                <div
                  className="options"
                  tabIndex="3"
                  onClick={() => setEmploymentType("small business")}
                >
                  <div>
                    <Image fluid src={coop} />
                  </div>
                  <span className="imgtxt">Small Business</span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="formdiv" md={8} xs={12}>
            <Form onSubmit={handleSubmit}>
              {employmentType === "Paid employment" && (
                <Row>
                  <InputField
                    label1="How much do you get paid monthly?"
                    employmentType={employmentType}
                    existingLoan={existingLoan}
                    setExistingLoan={setExistingLoan}
                    show={show}
                    setShow={setShow}
                    value1={salary}
                    setValue1={setSalary}
                    value2={payDate}
                    setValue2={setPayDate}
                    dateValue={dateValue}
                    value3={loanAmount}
                    setValue3={setLoanAmount}
                  />
                </Row>
              )}
              {employmentType === "small business" && (
                <Row>
                  <InputField
                    label1="What is your average monthly revenue?"
                    label2="What is your average monthly expense?"
                    existingLoan={existingLoan}
                    setExistingLoan={setExistingLoan}
                    show={show}
                    setShow={setShow}
                    value1={salary}
                    setValue1={setSalary}
                    value2={monthlyExpense}
                    setValue2={setMonthlyExpense}
                    value3={loanAmount}
                    setValue3={setLoanAmount}
                  />
                </Row>
              )}
              {employmentType === "self employed/ freelance" && (
                <Row>
                  <InputField
                    label1="What is your average monthly revenue?"
                    label2="What is your average monthly expense?"
                    existingLoan={existingLoan}
                    setExistingLoan={setExistingLoan}
                    show={show}
                    setShow={setShow}
                    value1={salary}
                    setValue1={setSalary}
                    value2={monthlyExpense}
                    setValue2={setMonthlyExpense}
                    value3={loanAmount}
                    setValue3={setLoanAmount}
                  />
                </Row>
              )}

              <div className="continuebutton text-center">
                <Button
                  type="submit"
                  id="bottombutton"
                  // onClick={() => props.history.push('/planscreen')}
                  disabled={employmentType === ""}
                >
                  Continue
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EmploymentScreen
