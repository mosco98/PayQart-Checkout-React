import React, { useState, useEffect } from "react"
import CreditForm from "./CreditForm"
import { successToast, submitPersonalInfo } from "../services/creditFormService"
import "../stylesheets/css/creditapplicationscreen.css"

const PersonalInformation = ({ setPage, setPersonaldone }) => {
  const [personalInfo, setPersonalInfo] = useState({
    title: "",
    gender: "",
    firstname: "",
    lastname: "",
    middlename: "",
    maritalstatus: "",
    educationlevel: "",
    children: "",
    bvn: "",
    dob: ""
  })
  const [readOnly, setReadOnly] = useState(false)
  const [loading, setLoading] = useState(Boolean)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("userObjFromBckEnd")).user

    if (!user) return

    if (user.newUser) return setPersonalInfo({ ...personalInfo, bvn: user.bvn })

    setReadOnly(true)

    // const userInfo = {
    //   title: user.title,
    //   gender: user.gender,
    //   firstname: user.firstName
    // }

    console.log(personalInfo)

    const userInfo = (({
      title,
      gender,
      firstname,
      lastname,
      middlename,
      maritalstatus,
      educationlevel,
      children,
      dob,
      bvn
    }) => ({
      title,
      gender,
      firstname,
      lastname,
      middlename,
      maritalstatus,
      educationlevel,
      children,
      dob,
      bvn
    }))(user)

    setPersonalInfo(userInfo)
  }

  const handleChange = (name, e) => {
    setPersonalInfo({ ...personalInfo, [name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(personalInfo)
    submitPersonalInfo(personalInfo)
      .then((res) => {
        successToast(res.data)
        setLoading(false)
        setPage("contactInfo")
        setPersonaldone(true)
      })
      .catch(() => {})
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "Title",
            type: "select",
            options: ["Select", "Dr", "Mrs", "Mr", "Miss", "Prof"],
            value: personalInfo.title,
            name: "title",
            readOnly: { readOnly },
            handleChange: handleChange
          },
          {
            label: "First Name",
            type: "text",
            value: personalInfo.firstname,
            name: "firstname",
            readOnly: { readOnly },
            handleChange: handleChange
          }
        ]}
        formDetails2={[
          {
            label: "Middle Name",
            type: "text",
            value: personalInfo.middlename,
            name: "middlename",
            readOnly: { readOnly },
            handleChange: handleChange
          },
          {
            label: "Last Name",
            type: "text",
            value: personalInfo.lastname,
            name: "lastname",
            readOnly: { readOnly },
            handleChange: handleChange
          }
        ]}
        formDetails3={[
          {
            label: "Gender",
            type: "select",
            options: ["Select", "Female", "Male"],
            value: personalInfo.gender,
            name: "gender",
            readOnly: { readOnly },
            handleChange: handleChange
          },
          {
            label: "Marital Status",
            type: "select",
            options: ["Select", "Single", "Married", "Widowed", "Divorced"],
            value: personalInfo.maritalstatus,
            name: "maritalstatus",
            handleChange: handleChange
          }
        ]}
        formDetails4={[
          {
            label: "Education Level",
            type: "select",
            options: [
              "Select",
              "WAEC",
              "BSc",
              "Msc",
              "PHD",
              "OND",
              "HND",
              "Others"
            ],
            value: personalInfo.educationlevel,
            name: "educationlevel",
            handleChange: handleChange
          },
          {
            label: "Number Of Children/Dependants",
            type: "number",
            value: personalInfo.children,
            name: "children",
            handleChange: handleChange
          }
        ]}
        formDetails5={[
          {
            label: "Bank Verification Number",
            type: "number",
            value: personalInfo.bvn,
            name: "bvn",
            readOnly: { readOnly },
            disabled: true,
            handleChange: handleChange
          },
          {
            label: "Date Of Birth",
            type: "date",
            value: personalInfo.dob,
            name: "dob",
            readOnly: { readOnly },
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

export default PersonalInformation
