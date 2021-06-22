import React from "react"
import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import "../stylesheets/css/progressSteps.css"

const ProgressSteps = ({ step1, step2, step3, step4, complete }) => {
  return (
    <div className="check-steps">
      <Nav className="justify-content-center mb-3">
        <Nav.Item
          className={`step ${!step1 && "complete"} ${complete && "complete"}`}
        >
          {!step1 ? (
            <Nav.Link disabled>
              <span>
                <b>1</b>
              </span>
            </Nav.Link>
          ) : step1 ? (
            <LinkContainer to="/">
              <Nav.Link>
                <i className="fa fa-check"></i>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <b>1</b>
            </Nav.Link>
          )}
        </Nav.Item>

        <div className={`progressbar ${step1 && "complete"}`}></div>

        <Nav.Item className={`step ${step1 && "complete"}`}>
          {!step2 ? (
            <Nav.Link disabled>
              <span>
                <b>2</b>
              </span>
            </Nav.Link>
          ) : step2 ? (
            <LinkContainer to="/2">
              <Nav.Link>
                <i className="fa fa-check"></i>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <b>2</b>
            </Nav.Link>
          )}
        </Nav.Item>

        <div className={`progressbar ${step2 && "complete"}`}></div>

        <Nav.Item className={`step ${step2 && "complete"}`}>
          {!step3 ? (
            <Nav.Link disabled>
              <span>
                <b>3</b>
              </span>
            </Nav.Link>
          ) : step3 ? (
            <LinkContainer to="/#">
              <Nav.Link>
                <b>
                  <i className="fa fa-check"></i>
                </b>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <b>3</b>
            </Nav.Link>
          )}
        </Nav.Item>

        <div className={`progressbar ${step3 && "complete"}`}></div>

        <Nav.Item className={`step ${step3 && "complete"}`}>
          {!step4 ? (
            <Nav.Link disabled>
              <span>
                <b>4</b>
              </span>
            </Nav.Link>
          ) : step4 ? (
            <LinkContainer to="/#">
              <Nav.Link>
                <b>
                  <i className="fa fa-check"></i>
                </b>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <b>4</b>
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default ProgressSteps
