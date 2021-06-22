import React from "react"
import { Col, Row, Image } from "react-bootstrap"

const CartItem = () => {
  return (
    <Row className="">
      <Col md={12}>
        <Row className="cart-card mb-5">
          <Col className="m-4">
            <div className="cart-item">
              <Row className="item-row">
                <Col>
                  <div className="image">
                    <Image
                      style={{
                        border: "1px solid #DCDCDC",
                        padding: "0px",
                        height: "80px",
                        borderRadius: "5px"
                      }}
                      fluid
                      src="https://i2.wp.com/mobilityarena.com/wp-content/uploads/2020/11/Meeysoo-P45-Pro.jpg"
                    />
                  </div>
                </Col>
                <Col className=" text-muted item-text my-auto">
                  <span className="lh-1">Meeysoo P43 Pro</span>
                  <span className="lh-1">₦ 40,250</span>
                  <span className="lh-1">Qty: 2</span>
                </Col>
              </Row>
              <Row className="item-row">
                <Col>
                  <div className="image">
                    <Image
                      style={{
                        border: "1px solid #DCDCDC",
                        padding: "0px",
                        height: "80px",
                        borderRadius: "5px"
                      }}
                      fluid
                      src="https://i2.wp.com/mobilityarena.com/wp-content/uploads/2020/11/Meeysoo-P45-Pro.jpg"
                    />
                  </div>
                </Col>
                <Col className=" text-muted item-text my-auto">
                  <span className="lh-1">Meeysoo P43 Pro</span>
                  <span className="lh-1">₦ 40,250</span>
                  <span className="lh-1">Qty: 2</span>
                </Col>
              </Row>

              <Row className="item-row">
                <Col>
                  <div className="image">
                    <Image
                      style={{
                        border: "1px solid #DCDCDC",
                        padding: "0px",
                        height: "80px",
                        borderRadius: "5px"
                      }}
                      fluid
                      src="https://i2.wp.com/mobilityarena.com/wp-content/uploads/2020/11/Meeysoo-P45-Pro.jpg"
                    />
                  </div>
                </Col>
                <Col className=" text-muted item-text my-auto">
                  <span className="lh-1">Meeysoo P43 Pro</span>
                  <span className="lh-1">₦ 40,250</span>
                  <span className="lh-1">Qty: 2</span>
                </Col>
              </Row>
            </div>
            <br />
            <br />
            <hr />

            <Row className="mt-3 total">
              <Col>
                <span className="text-muted">Total Cart Value:</span>
              </Col>
              <Col>
                <span className="price">
                  <strong>₦ 80,500</strong>
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default CartItem
