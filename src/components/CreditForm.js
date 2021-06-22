import React from "react"
import { Row, Col, Container, Form, Button, Spinner } from "react-bootstrap"
import "../stylesheets/css/creditapplicationscreen.css"

const CreditForm = (props) => {
  let maxDate = new Date()
  maxDate.setFullYear(new Date().getFullYear() - 22)

  const formFunction = (props) => {
    return (
      <>
        {props.map(
          ({
            label,
            type,
            options,
            className,
            value,
            name,
            handleChange,
            extraOptions = false,
            disabled = false
          }) => (
            <Form.Group
              key={label}
              className={`frm-grp mb-3 ${className}`}
              as={Col}
            >
              <Form.Label className="frm-lbl">{label}</Form.Label>
              {type === "select" ? (
                extraOptions ? (
                  <Form.Control
                    required
                    className="frm-ctrl slt"
                    as="select"
                    value={value}
                    onChange={(text) => handleChange(name, text)}
                  >
                    {options.map((option, ind) => (
                      <option
                        key={ind}
                        selected={option.id === "Select"}
                        disabled={option.id === "Select"}
                        value={option.id === "Select" ? "" : option.id}
                      >
                        {option.desc}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    required
                    className="frm-ctrl slt"
                    as="select"
                    value={value}
                    onChange={(text) => handleChange(name, text)}
                  >
                    {options.map((option, ind) => (
                      <option
                        key={ind}
                        selected={option === "Select"}
                        disabled={option === "Select"}
                        value={option === "Select" ? "" : option}
                      >
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                )
              ) : type === "date" ? (
                <Form.Control
                  className="frm-ctrl"
                  type={type}
                  value={value}
                  // max="2019-12-25"
                  max={maxDate.toISOString().split("T")[0]}
                  onChange={(text) => handleChange(name, text)}
                  required
                />
              ) : (
                <Form.Control
                  className="frm-ctrl"
                  type={type}
                  readOnly={disabled}
                  value={value}
                  onChange={(text) => handleChange(name, text)}
                  required
                />
              )}
            </Form.Group>
          )
        )}
      </>
    )
  }

  return (
    <Container fluid>
      <Form className="crdfrm" onSubmit={props.handleSubmit}>
        {props.formDetails && (
          <Row className="justify-content-md-center">
            {formFunction(props.formDetails)}
          </Row>
        )}
        {props.formDetails2 && (
          <Row className="justify-content-md-center">
            {formFunction(props.formDetails2)}
          </Row>
        )}
        {props.formDetails3 && (
          <Row className="justify-content-md-center">
            {formFunction(props.formDetails3)}
          </Row>
        )}
        {props.formDetails4 && (
          <Row className="justify-content-md-center">
            {formFunction(props.formDetails4)}
          </Row>
        )}
        {props.formDetails5 && (
          <Row className="justify-content-md-center">
            {formFunction(props.formDetails5)}
          </Row>
        )}
        <div className="cont-btn text-center">
          <Button type="submit">
            {props.loading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              props.buttonText
            )}
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default CreditForm
