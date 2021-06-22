import axios from "axios"
import { toast } from "react-toastify"

// Add a request interceptor
axios.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json"

  const userID = JSON.stringify(
    localStorage.getItem("userObjFromBckEnd")
  ).authid

  config.headers["authid"] = userID

  return config
})

// Add a response interceptor
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

  console.log(error.response)

  if (!expectedError && !error.response.data) {
    errorToast("An unexpected error occurrred.")
  } else if (expectedError && !error.response.data) {
    errorToast("An unexpected error occurrred.")
  } else {
    errorToast(error.response.data)
  }

  return Promise.reject(error)
})

function setJwt(jwt) {
  axios.defaults.headers.common["Content-Type"] = "application/json"
  axios.defaults.headers.common["x-auth-token"] = jwt
}

export function errorToast(msg) {
  toast.error(msg, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
}

export default http
