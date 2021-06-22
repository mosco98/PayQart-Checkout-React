import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import FileUpload from "../components/FileUpload"
import {
  getDocumentDetails,
  uploadDocument,
  successToast,
  verifyFeePayment
} from "../services/creditFormService"
import "../stylesheets/css/successScreen.css"

const SuccessScreen = (props) => {
  const [documentStatus, setDocumentStatus] = useState({
    govtIdSubmitted: 0,
    workIdSubmitted: 0,
    passportPhotoSubmitted: 0,
    proofOfAddressSubmitted: 0
  })

  useEffect(() => {
    checkReference()
    retrieveDocumentStatus()
  }, [])

  const retrieveDocumentStatus = async () => {
    await getDocumentDetails()
      .then((res) => {
        if (!res.data || !res.data.status) return
        console.log(res.data)
        setDocumentStatus({ ...documentStatus, ...res.data.status })
      })
      .catch(() => {})
  }

  const checkReference = async () => {
    const user = JSON.parse(localStorage.getItem("userObjFromBckEnd"))
    const reference = localStorage.getItem("current_reference")
    if (!reference) return
    const data = { reference, email: user.email }
    await verifyFeePayment(data)
      .then((res) => {
        localStorage.removeItem("current_reference")
      })
      .catch(() => {})
  }

  const saveDocument = async (file, name, statusField) => {
    // handleDocStatus({...documentStatus, [statusField]: 1 });
    console.log(statusField)
    const myDoc = { [statusField]: 1, [name]: file }
    await uploadDocument(myDoc)
      .then((res) => {
        successToast(res.data)
        console.log([statusField])
        handleDocStatus({ ...documentStatus, [statusField]: 1 })
      })
      .catch(() => {})
  }

  const handleDocStatus = (obj) => {
    setDocumentStatus(obj)
  }

  const routeToMono = () => {
    window.location.href = "https://mono.co/statements/3e5AuEa"
  }

  return (
    <Container className="success" fluid>
      <Row className="justify-content-md-center">
        <Col md={9}>
          <div className="top-text text-center mb-4">
            <h2 className="mb-3">
              <strong>Success!</strong>
            </h2>
            <p>
              Your application has been submitted successfully. <br /> Next
              Steps, please provide the required documents below:
            </p>
          </div>
          <Row className="uploadforms text-center justify-content-md-center">
            <p>REQUIRED DOCUMENTS</p>
            <Col md={5} className="file-upload">
              {/* <FileUpload name='Bank Statement' /> */}
              <div className="fileUpload text-center">
                <p>
                  <strong>Bank Statement</strong>
                </p>
                <label onClick={routeToMono} className="lablef">
                  Generate
                </label>
              </div>
              {/* {documentUploadArray.map((obj) => (
                <FileUpload
                  uploadObj={obj}
                  documentStatus={documentStatus}
                  handleDocStatus={handleDocStatus}
                  saveDocument={(file) => saveDocument(file, [obj.name], [obj.statusField])}
                />
              ))} */}
              <FileUpload
                uploadObj={govtID}
                documentStatus={documentStatus}
                handleDocStatus={handleDocStatus}
                saveDocument={(file) =>
                  saveDocument(file, [govtID.name], [govtID.statusField])
                }
              />
              <FileUpload
                uploadObj={workID}
                documentStatus={documentStatus}
                handleDocStatus={handleDocStatus}
                saveDocument={(file) =>
                  saveDocument(file, [workID.name], [workID.statusField])
                }
              />
              <FileUpload
                uploadObj={proofOfAddress}
                documentStatus={documentStatus}
                handleDocStatus={handleDocStatus}
                saveDocument={(file) =>
                  saveDocument(
                    file,
                    [proofOfAddress.name],
                    [proofOfAddress.statusField]
                  )
                }
              />
              <FileUpload
                uploadObj={passportPhoto}
                documentStatus={documentStatus}
                handleDocStatus={handleDocStatus}
                saveDocument={(file) =>
                  saveDocument(
                    file,
                    [passportPhoto.name],
                    [passportPhoto.statusField]
                  )
                }
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <div className="btn-buttons text-center">
                <a href="mailto: ">Send via email</a> <span>Instead?</span>
                <div className="btom-butn text-center mt-5">
                  <Button onClick={() => props.history.push("/")}>
                    Back To Store
                  </Button>
                  <Button>Go To Dashboard</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default SuccessScreen

// const documentUploadArray = [
//   { label: 'Govt Issued ID', name: 'govtId', statusField: 'govtIdSubmitted' },
//   { label: 'Work ID', name: 'workId', statusField: 'workIdSubmitted' },
//   { label: 'Proof Of Address', name: 'proofOfAddress', statusField: 'proofOfAddressSubmitted' },
//   { label: 'Passport Photo', name: 'passportPhoto', statusField: 'passportPhotoSubmitted' }
// ];

const govtID = {
  id: "actual-btn-1",
  label: "Govt Issued ID",
  name: "govtId",
  statusField: "govtIdSubmitted"
}
const workID = {
  id: "actual-btn-2",
  label: "Work ID",
  name: "workId",
  statusField: "workIdSubmitted"
}
const proofOfAddress = {
  id: "actual-btn-3",
  label: "Proof Of Address",
  name: "proofOfAddress",
  statusField: "proofOfAddressSubmitted"
}
const passportPhoto = {
  id: "actual-btn-4",
  label: "Passport Photo",
  name: "passportPhoto",
  statusField: "passportPhotoSubmitted"
}
