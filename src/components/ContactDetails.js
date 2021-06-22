import React, { useState, useEffect } from "react"
import CreditForm from "./CreditForm"
import { successToast, submitContactInfo } from "../services/creditFormService"
import "../stylesheets/css/creditapplicationscreen.css"

const ContactDetails = ({ setPage, setContactdone }) => {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    address: "",
    residentialtype: "",
    livingduration: "",
    telephone: "",
    city: "",
    state: ""
  })
  const [readOnly, setReadOnly] = useState(false)
  const [loading, setLoading] = useState(Boolean)

  const handleChange = (name, e) => {
    console.log(contactInfo)
    setContactInfo({ ...contactInfo, [name]: e.target.value })
  }

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("userObjFromBckEnd"))

    if (!user) return

    if (user.newUser)
      return setContactInfo({ ...contactInfo, email: user.email })

    const userInfo = (({
      email,
      address,
      residentialtype,
      livingduration,
      telephone,
      city,
      state
    }) => ({
      email,
      address,
      residentialtype,
      livingduration,
      telephone,
      city,
      state
    }))(user)
    setContactInfo(userInfo)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(contactInfo)
    submitContactInfo(contactInfo)
      .then((res) => {
        localStorage.setItem("userEmail", contactInfo.email)
        successToast(res.data)
        setLoading(false)
        setPage("employmentInfo")
        setContactdone(true)
      })
      .catch(() => {})
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "Telephone Number",
            type: "text",
            value: contactInfo.telephone,
            name: "telephone",
            handleChange: handleChange
          },
          {
            label: "Email Address",
            type: "email",
            value: contactInfo.email,
            name: "email",
            readOnly: { readOnly },
            disabled: true,
            handleChange: handleChange
          }
        ]}
        formDetails2={[
          {
            label: "Home Address",
            type: "text",
            value: contactInfo.address,
            name: "address",
            handleChange: handleChange,
            className: "single-frm"
          }
        ]}
        formDetails3={[
          {
            label: "City",
            type: "text",
            value: contactInfo.city,
            name: "city",
            handleChange: handleChange
          },
          {
            label: "State",
            type: "select",
            options: ["Select", "Lagos", "Abuja", "Ondo", "Ogun", "Rivers"],
            value: contactInfo.state,
            name: "state",
            handleChange: handleChange
          }
        ]}
        formDetails4={[
          {
            label: "Residence Type",
            type: "select",
            options: ["Select", "Owned", "Rented", "Employer Provided"],
            value: contactInfo.residentialtype,
            name: "residentialtype",
            handleChange: handleChange
          },
          {
            label: "Years Of Residence",
            type: "select",
            options: [
              "Select",
              "Less than 6 months",
              "Between 6 months - 1 year",
              "1-2 years",
              "2-3 years",
              "3 years and above"
            ],
            value: contactInfo.livingduration,
            name: "livingduration",
            handleChange: handleChange
          }
        ]}
        handleSubmit={handleSubmit}
        buttonText="Continue"
        loading={loading}
      />
    </div>
  )
}

export default ContactDetails
