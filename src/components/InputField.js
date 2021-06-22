import React, { useState } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
import Calendar from "react-calendar"
import "../stylesheets/css/inputfield.css"
import "react-calendar/dist/Calendar.css"

const InputField = (props) => {
  const [yes, setYes] = useState(false)
  const [no, setNo] = useState(false)
  const [dValue, setDValue] = useState(false)

  // dValue && props.setShow(false)
  return (
    <>
      <Form.Group className="mb-2">
        <Form.Label className="mb-2">
          <span className="formlabel">{props.label1}</span>
        </Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">
              <span className="inputicon">₦</span>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            className="formcontrol"
            onFocus={() => props.setShow(false)}
            value={props.value1}
            onChange={(e) => {
              const {
                target: { value }
              } = e
              props.setValue1(
                (Number(value.replace(/\D/g, "")) || "").toLocaleString()
              )
            }}
            required
          />
        </InputGroup>
      </Form.Group>

      {props.employmentType === "Paid employment" ? (
        <Form.Group className="mb-2">
          <Form.Label className="mb-2">
            <span className="formlabel">When is your next salary date?</span>
          </Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text
                style={{ backgroundColor: "#707070", border: "none" }}
                id="inputGroupPrepend"
              >
                <span className="inputicon" style={{ color: "white" }}>
                  <i className="fas fa-calendar-alt"></i>
                </span>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              className="formcontrol"
              type="text"
              placeholder="Select pay date"
              id="inpot"
              onFocus={() => props.setShow(true)}
              style={{ padding: "2px !important" }}
              value={dValue ? props.dateValue : ""}
              readOnly
              required
            />
          </InputGroup>
          {props.show && (
            <Form.Group className="calendar">
              <Calendar
                className="calendar"
                minDate={new Date()}
                value={props.value2}
                onChange={props.setValue2}
                next2Label={null}
                prev2Label={null}
                onClickDay={() => {
                  setDValue(true)
                  setTimeout(function () {
                    props.setShow(false)
                  }, 1000 / 5)
                }}
              />
            </Form.Group>
          )}
        </Form.Group>
      ) : (
        <Form.Group className="mb-2">
          <Form.Label className="mb-2">
            <span className="formlabel">{props.label2}</span>
          </Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                <span className="inputicon">₦</span>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              className="formcontrol"
              value={props.value2}
              onChange={(e) => {
                const {
                  target: { value }
                } = e
                props.setValue2(
                  (Number(value.replace(/\D/g, "")) || "").toLocaleString()
                )
              }}
              required
            />
          </InputGroup>
        </Form.Group>
      )}

      <div className="loan-buttons">
        <span className="formlabel">Do you have any existing loan(s)?</span>
        <Button
          variant="outline-secondary"
          className={`loan-btn ${yes && "coloradd"}`}
          onClick={() => {
            props.setShow(false)
            props.setExistingLoan(true)
            setNo(false)
            setYes((prevYes) => !prevYes)
          }}
        >
          Yes
        </Button>

        <Button
          variant="outline-secondary"
          className={`loan-btn ${no && "coloradd"}`}
          onClick={() => {
            props.setShow(false)
            props.setExistingLoan(false)
            setYes(false)
            setNo((prevNo) => !prevNo)
          }}
        >
          No
        </Button>
      </div>

      {props.existingLoan && (
        <Form.Group>
          <Form.Label className="mb-2">
            <span className="formlabel">Monthly payback on loans:</span>
          </Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                <span className="inputicon">₦</span>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              className="formcontrol"
              value={props.value3}
              onChange={(e) => {
                const {
                  target: { value }
                } = e
                props.setValue3(
                  (Number(value.replace(/\D/g, "")) || "").toLocaleString()
                )
              }}
            />
          </InputGroup>
        </Form.Group>
      )}
    </>
  )
}

export default InputField
