export default (endpoint, config = {}) => {
  return fetch(`https://5e7d0266a917d70016684219.mockapi.io/api/v1/${endpoint}`, config)
}