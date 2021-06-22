import React, { useState, useEffect } from "react"
import CreditForm from "./CreditForm"
import {
  successToast,
  submitBankInfo,
  getLoanDetails
} from "../services/creditFormService"
import "../stylesheets/css/creditapplicationscreen.css"

const BankInformation = ({ setPage, setBankdone }) => {
  const [bankInfo, setBankInfo] = useState({
    incomebanktype: "",
    incomeaccounttype: "",
    bankname: "",
    accountnumber: ""
  })
  const [loading, setLoading] = useState(Boolean)

  useEffect(() => {
    retrieveLoanDetails()
  }, [])

  const handleChange = (name, e) => {
    setBankInfo({ ...bankInfo, [name]: e.target.value })
  }

  const retrieveLoanDetails = async () => {
    const user = JSON.parse(localStorage.getItem("userObjFromBckEnd"))
    if (!user || user.newUser) return

    await getLoanDetails()
      .then((res) => {
        if (!res.data) return
        const loanInfo = (({
          incomebanktype,
          incomeaccounttype,
          bankname,
          accountnumber
        }) => ({ incomebanktype, incomeaccounttype, bankname, accountnumber }))(
          res.data
        )
        setBankInfo(loanInfo)
        console.log(loanInfo)
      })
      .catch(() => {})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    submitBankInfo(bankInfo)
      .then((res) => {
        successToast(res.data)
        setLoading(false)
        setPage("refInfo")
        setBankdone(true)
      })
      .catch(() => {})
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "Income Account Type",
            type: "select",
            options: [
              "Select",
              "Salary Account",
              "Business Account",
              "Personal Savings Account"
            ],
            value: bankInfo.incomeaccounttype,
            name: "incomeaccounttype",
            handleChange: handleChange
          },
          {
            label: "Income Bank Type",
            type: "select",
            options: [
              "Select",
              "Commercial Bank",
              "Microfinance Bank",
              "Mobile Money/E-Wallet"
            ],
            value: bankInfo.incomebanktype,
            name: "incomebanktype",
            handleChange: handleChange
          }
        ]}
        formDetails2={[
          {
            label: "Bank Name",
            type: "select",
            options: listOfBanks,
            extraOptions: true,
            value: bankInfo.bankname,
            name: "bankname",
            handleChange: handleChange
          },
          {
            label: "Account Number",
            type: "number",
            value: bankInfo.accountnumber,
            name: "accountnumber",
            handleChange: handleChange
          }
        ]}
        formDetails3={[
          {
            label: "Microfinace Bank Name",
            type: "text",
            value: bankInfo.bankname,
            name: "bankname",
            handleChange: handleChange
          },
          {
            label: "Account Number",
            type: "number",
            value: bankInfo.accountnumber,
            name: "accountnumber",
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

export default BankInformation

const listOfBanks = [
  { id: "Select", desc: "Select" },
  { id: "044", desc: "Access Bank Nigeria Plc" },
  { id: "050", desc: "Ecobank Nigeria" },
  { id: "084", desc: "	Enterprise Bank Plc" },
  { id: "070", desc: "Fidelity Bank Plc" },
  { id: "011", desc: "First Bank of Nigeria Plc" },
  { id: "214", desc: "First City Monument Bank" },
  { id: "058", desc: "Guaranty Trust Bank Plc" },
  { id: "030", desc: "Heritaage Banking Company Ltd" },
  { id: "301", desc: "Jaiz Bank" },
  { id: "082", desc: "Keystone Bank Ltd" },
  { id: "014", desc: "Mainstreet Bank Plc" },
  { id: "076", desc: "Skye Bank Plc" },
  { id: "039", desc: "Stanbic IBTC Plc" },
  { id: "232", desc: "Sterling Bank Plc" },
  { id: "032", desc: "Union Bank Nigeria Plc" },
  { id: "033", desc: "United Bank for Africa Plc" },
  { id: "215", desc: "Unity Bank Plc" },
  { id: "035", desc: "WEMA Bank Plc" },
  { id: "057", desc: "Zenith Bank International" }
]
