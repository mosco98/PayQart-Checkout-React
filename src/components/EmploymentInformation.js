import React, { useState, useEffect } from "react"
import CreditForm from "./CreditForm"
import {
  successToast,
  submitEmploymentInfo,
  getLoanDetails
} from "../services/creditFormService"
import "../stylesheets/css/creditapplicationscreen.css"

const EmploymentInformation = ({ setPage, setEmploymentdone }) => {
  const [employmentInfo, setEmploymentInfo] = useState({
    employername: "",
    employeraddress: "",
    workduration: "",
    employmenttype: "",
    designation: "",
    employmentmode: "",
    city: "",
    state: ""
  })
  const [loading, setLoading] = useState(Boolean)

  const handleChange = (name, e) => {
    setEmploymentInfo({ ...employmentInfo, [name]: e.target.value })
  }

  useEffect(() => {
    retrieveLoanDetails()
  }, [])

  const retrieveLoanDetails = async () => {
    const user = JSON.parse(localStorage.getItem("userObjFromBckEnd"))
    if (!user || user.newUser) return

    await getLoanDetails()
      .then((res) => {
        if (!res.data) return
        const loanInfo = (({
          employername,
          employeraddress,
          workduration,
          designation,
          employmentmode,
          city,
          state
        }) => ({
          employername,
          employeraddress,
          workduration,
          designation,
          employmentmode,
          city,
          state
        }))(res.data)
        setEmploymentInfo(loanInfo)
        console.log(employmentInfo)
      })
      .catch(() => {})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(employmentInfo)
    submitEmploymentInfo(employmentInfo)
      .then((res) => {
        successToast(res.data)
        setPage("bankInfo")
        setLoading(false)
        setEmploymentdone(true)
      })
      .catch(() => {})
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "Employment Type",
            type: "select",
            options: [
              "Select",
              "Salary Earner",
              "Self Employed",
              "Business Owner"
            ],
            value: employmentInfo.employmenttype,
            name: "employmenttype",
            handleChange: handleChange
          },
          employmentInfo.employmenttype === "Salary Earner"
            ? {
                label: "Employer's Name",
                type: "text",
                value: employmentInfo.employername,
                name: "employername",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Business Owner"
            ? {
                label: "Business Name",
                type: "text",
                // change value and name to business name
                value: employmentInfo.employername,
                name: "employername",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Self Employed"
            ? {
                label: "Business Name",
                type: "text",
                // change value and name to business name
                value: employmentInfo.employername,
                name: "employername",
                handleChange: handleChange
              }
            : {
                label: "Employer's Name",
                type: "text",
                value: employmentInfo.employername,
                name: "employername",
                handleChange: handleChange
              }
        ]}
        formDetails2={[
          {
            label: "Designation",
            type: "text",
            value: employmentInfo.designation,
            name: "designation",
            handleChange: handleChange
          },
          employmentInfo.employmenttype === "Salary Earner"
            ? {
                label: "How Long Have You Worked Here?",
                type: "select",
                options: [
                  "Select",
                  "Less than 6 months",
                  "Between 6 months - 1 year",
                  "1-2 years",
                  "2-3 years",
                  "3 years and above"
                ],
                value: employmentInfo.workduration,
                name: "workduration",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Business Owner"
            ? {
                label: "Business Type",
                type: "select",
                options: [
                  "Select",
                  "Business Name",
                  "Limited Liability",
                  "Unregistered"
                ],
                // change value
                value: employmentInfo.workduration,
                name: "workduration",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Self Employed"
            ? {
                label: "Business Type",
                type: "select",
                options: [
                  "Select",
                  "Business Name",
                  "Limited Liability",
                  "Unregistered"
                ],
                // change value
                value: employmentInfo.workduration,
                name: "workduration",
                handleChange: handleChange
              }
            : {
                label: "How Long Have You Worked Here?",
                type: "select",
                options: [
                  "Select",
                  "Less than 6 months",
                  "Between 6 months - 1 year",
                  "1-2 years",
                  "2-3 years",
                  "3 years and above"
                ],
                value: employmentInfo.workduration,
                name: "workduration",
                handleChange: handleChange
              }
        ]}
        formDetails3={[
          employmentInfo.employmenttype === "Salary Earner"
            ? {
                label: "Employer's Address",
                type: "text",
                value: employmentInfo.employeraddress,
                name: "employeraddress",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Business Owner"
            ? {
                label: "Business Address",
                type: "text",
                // change
                value: employmentInfo.employeraddress,
                name: "employeraddress",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Self Employed"
            ? {
                label: "Business Address",
                type: "text",
                // change
                value: employmentInfo.employeraddress,
                name: "employeraddress",
                handleChange: handleChange
              }
            : {
                label: "Employer's Address",
                type: "text",
                value: employmentInfo.employeraddress,
                name: "employeraddress",
                handleChange: handleChange
              },

          employmentInfo.employmenttype === "Salary Earner"
            ? {
                label: "Employment Mode",
                type: "select",
                options: ["Select", "Full Time", "Part Time", "Contract"],
                value: employmentInfo.employmentmode,
                name: "employmentmode",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Select"
            ? {
                label: "Employment Mode",
                type: "select",
                options: ["Select", "Full Time", "Part Time", "Contract"],
                value: employmentInfo.employmentmode,
                name: "employmentmode",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Business Owner"
            ? {
                label: "Sector",
                type: "text",
                value: employmentInfo.employmentmode,
                name: "employmentmode",
                handleChange: handleChange
              }
            : {
                label: "Sector",
                type: "text",
                value: employmentInfo.employmentmode,
                name: "employmentmode",
                handleChange: handleChange
              }
        ]}
        formDetails4={[
          {
            label: "City",
            type: "text",
            value: employmentInfo.city,
            name: "city",
            handleChange: handleChange
          },
          {
            label: "State",
            type: "select",
            options: [
              "Select",
              "Abia",
              "Adamawa",
              "Akwa Ibom",
              "Anambra",
              "Bauchi",
              "Bayelsa",
              "Benue",
              "Borno",
              "Cross River",
              "Delta",
              "Ebonyi",
              "Edo",
              "Ekiti",
              "Enugu",
              "FCT - Abuja",
              "Gombe",
              "Imo",
              "Jigawa",
              "Kaduna",
              "Kano",
              "Katsina",
              "Kebbi",
              "Kogi",
              "Kwara",
              "Lagos",
              "Nasarawa",
              "Niger",
              "Ogun",
              "Ondo",
              "Osun",
              "Oyo",
              "Plateau",
              "Rivers",
              "Sokoto",
              "Taraba",
              "Yobe",
              "Zamfara"
            ],
            value: employmentInfo.state,
            name: "state",
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

export default EmploymentInformation
