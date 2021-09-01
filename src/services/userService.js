import axios from 'axios'

const getHeaders = token => {
  return {
    headers: {
      Authorization: `${token.tokenType} ${token.accessToken}`
    }
  }
}

export const me = async (token) => {
  try {
    return await axios.get(`${process.env.REACT_APP_BASE_API}users/me`, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const getAll = async (token) => {
  try {
    return await axios.get(`${process.env.REACT_APP_BASE_API}users`, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const get = async (token, id) => {
  try {
    return await axios.get(`${process.env.REACT_APP_BASE_API}users/${id}`, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const add = async (token, data) => {
  try {
    return await axios.post(`${process.env.REACT_APP_BASE_API}users`, data, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const update = async (token, id, data) => {
  try {
    return await axios.put(`${process.env.REACT_APP_BASE_API}users/${id}`, data, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const remove = async (token, id) => {
  try {
    return await axios.delete(`${process.env.REACT_APP_BASE_API}users/${id}`, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}
