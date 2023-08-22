import axios from 'axios'
import {toast} from 'react-hot-toast'
import openLoading from "@src/views/ui-elements/LoadingToast";

// Helper function to make an axios request and display toast messages
const makeRequest = async (url,method= 'GET', config = {},  data = {}, onSuccessMessage,loadingMessage,setProgress=null) => {
    let responseData = null
    let requestError = null
    let toastId = null
    try {
        toastId=openLoading(loadingMessage)

        const response = await axios({
            method,
            url,
            data,
            ...config
        })
        toast.dismiss(toastId)
        if(setProgress){
            setProgress(100)
        }
        if (response.data && response.data.success) {
            if (onSuccessMessage) {
                toast.success(onSuccessMessage)
            }
            responseData = response.data
        } else if (response.data && response.data.error) {
            toast.error(response.data.error)
            requestError = { message: response.data.error, response }
        } else {
            toast.error('An unknown error occurred. Please try again.')
            requestError = { message: 'An unknown error occurred. Please try again.', response }
        }
    } catch (error) {
        console.log(error)
        toast.dismiss(toastId)
        if(setProgress){
            setProgress(100)
        }
        if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error)
            requestError = { message: error.response.data.error, response: error.response }
        } else if (error.request) {
            toast.error('The request was made, but no response was received.')
            requestError = { message: 'The request was made, but no response was received.', request: error.request }
        } else {
            toast.error('There was an error setting up the request.')
            requestError = { message: 'There was an error setting up the request.' }
        }
    }

    return { data: responseData, error: requestError }
}

export default makeRequest