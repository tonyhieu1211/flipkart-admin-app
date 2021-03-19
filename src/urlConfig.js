
const baseUrl = "https://flipkart-backend-1.herokuapp.com";

export const api = `${baseUrl}/api`;
export const generatePicture = (picName) => {
    return `${baseUrl}/public/${picName}`
}