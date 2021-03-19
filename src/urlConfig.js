
const baseUrl = 
    location.hostname === "localhost" 
    ? "http://localhost:2000"
    : "https://flipkart-backend-1.herokuapp.com/"

export const api = `${baseUrl}/api`;
export const generatePicture = (picName) => {
    return `${baseUrl}/${picName}`
}