import React from "react"
import { Row, Col, Image } from "react-bootstrap"
import logo from "../images/Path 26.png"
import "../stylesheets/css/cart.css"
import CartItem from "./CartItem"

const SideScreen = () => {
  return (
    <Row>
      <Col md={6} className="sidescreen">
        <div className="backtostore">
          <a href="/">
            <i style={{ color: "white" }} className="fas fa-arrow-left"></i>{" "}
            Back To Store
          </a>
        </div>

        <div className="logo">
          <Image fluid src={logo} />
        </div>

        <div className="bottomtext">
          <div id="bottomul">
            <ul>
              <li>
                <span>Get pre-approved instantly.</span>
              </li>
              <li>
                <span>Spread payment for up to 6 months.</span>
              </li>
              <li>
                <span>Provide some basic information to get started.</span>
              </li>
            </ul>
          </div>
        </div>
      </Col>

      <Col md={6} className="cart">
        <div className="cart-section">
          <small id="ordersummary">ORDER SUMMARY</small>
          <CartItem />
        </div>
      </Col>
    </Row>
  )
}

export default SideScreen
