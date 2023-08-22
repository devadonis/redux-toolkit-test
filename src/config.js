// export const PUBLIC_API_URL = 'http://149.102.132.199:5000'
// export const PUBLIC_API_URL = () => {
//     if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//         return 'http://localhost:5000';
//     } else {
//         // production code
//         return ''
//     }
// }
export const PUBLIC_API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "";
//sql queries to get total sales made by each customer in the last 12 months
// Sales orders Taken Summary
