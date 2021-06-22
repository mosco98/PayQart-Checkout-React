import React, { useState } from "react"
import { Row, Col, Image, Button } from "react-bootstrap"
import logo from "../images/pink-logo.svg"
import emptyWalletIcon from "../images/empty-wallet.svg"
import fundedWalletIcon from "../images/funded-wallet.svg"
import "../stylesheets/css/walletStatusScreen.css"

const WalletStatusScreen = (props) => {
  const [statusSelected, setStatus] = useState("")

  const signIn = () => {
    setStatus("/signin/1")
    localStorage.removeItem("loanId")
  }

  return (
    <div className="wallet-root-class">
      <div fluid className="container">
        <Row className="justify-content-md-center">
          <Col className="text-center">
            <div className="logo">
              <Image fluid src={logo} />
            </div>
            <h3 className="header">Choose Your PayQart Wallet Status</h3>
            <p className="text-p">
              Please select the statement that best matches you
            </p>

            <Row className="justify-content-md-center mb-4">
              <Col md={4}>
                <div className="wallet-card" tabIndex="1">
                  <div className="shared-card-div">
                    <div className="logo">
                      <Image fluid src={fundedWalletIcon} />
                    </div>
                    <h3>My PayQart Wallet is funded</h3>
                    <p>I have shopping credit</p>
                    <div className="wallet-button text-center">
                      <Button
                        variant="outline-secondary"
                        id="wallet-button-id"
                        onClick={signIn}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="wallet-card" tabIndex="1">
                  <div className="shared-card-div">
                    <div className="logo mt-10">
                      <Image fluid src={emptyWalletIcon} />
                    </div>
                    <h3>My PayQart Wallet is not funded</h3>
                    <p>I don't have shopping credit</p>
                    <div className="wallet-button text-center">
                      <Button
                        variant="outline-secondary"
                        id="wallet-button-id"
                        onClick={() => setStatus("/eligibityscreen")}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="wallet-card" tabIndex="1">
                  <div className="shared-card-div">
                    <div className="logo mt-10">
                      <Image fluid src={emptyWalletIcon} />
                    </div>
                    <h3>I don't know my PayQart wallet status.</h3>
                    <p>This is the first time I am seeing this.</p>
                    <div className="wallet-button text-center">
                      <Button
                        variant="outline-secondary"
                        id="wallet-button-id"
                        onClick={() => setStatus("/eligibityscreen")}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Button
              className="proceed-button"
              disabled={statusSelected === ""}
              onClick={() => {
                props.history.push(statusSelected)
              }}
            >
              Proceed
            </Button>
          </Col>
        </Row>
      </div>
      <div className="background"></div>
    </div>
  )
}

export default WalletStatusScreen
