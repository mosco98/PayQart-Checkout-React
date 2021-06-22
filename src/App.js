import { Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Cart from "./components/Cart";
import PlanScreen from "./screens/PlanScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import CreditScreen from "./screens/CreditScreen";
import CreditApplicationScreen from "./screens/CreditApplicationScreen";
import EmploymentScreen from "./screens/EmploymentScreen";
import WalletStatusScreen from "./screens/WalletStatusScreen";
import EligibilityScreen from "./screens/EligibilityScreen";
import SuccessScreen from "./screens/SuccessScreen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() { 
  return (
    <Router>
      <>
        <ToastContainer />
        <Row className='app'>
          <Route exact path='/'>
            <Col className='eligibityscreen' md={12}>
              <Route exact path='/' component={WalletStatusScreen} />
            </Col>
          </Route>
          <Route exact path='/eligibityscreen'>
            <Col className='eligibityscreen' md={12}>
              <Route exact path='/eligibityscreen' component={EligibilityScreen} />
            </Col>
          </Route>
          <Route exact path='/employmentscreen'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/employmentscreen' component={EmploymentScreen} />
            </Col>
          </Route>
          <Route exact path='/planscreen'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/planscreen' component={PlanScreen} />
            </Col>
          </Route>

          <Route exact path='/signup/:status'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/signup/:status' component={SignUpScreen} />
            </Col>
          </Route>

          <Route exact path='/signin/:status'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/signin/:status' component={SignInScreen} />
            </Col>
          </Route>

          <Route exact path='/forgotpassword'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/forgotpassword' component={ForgotPasswordScreen} />
            </Col>
          </Route>

          <Route exact path='/creditscreen'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/creditscreen' component={CreditScreen} />
            </Col>
          </Route>

          <Col md={12}>
            <Route exact path='/creditapplication' component={CreditApplicationScreen} />
          </Col>

          <Col className='successScreen' md={12}>
            <Route exact path='/success' component={SuccessScreen} />
          </Col>
        </Row>
      </>
    </Router>
  );
}

export default App;
