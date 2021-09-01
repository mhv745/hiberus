import axios from 'axios'

import https from 'https'

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

const getHeaders = token => {
  return {
    headers: {
      Authorization: `${token.tokenType} ${token.accessToken}`
    }
  }
}

export const me = async (token) => {
  try {
    return await instance.get(`${process.env.REACT_APP_BASE_API}users/me`, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const getAll = async (token) => {
  try {
    return await instance.get(`${process.env.REACT_APP_BASE_API}users`, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const get = async (token, id) => {
  try {
    return await instance.get(`${process.env.REACT_APP_BASE_API}users/${id}`, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const add = async (token, data) => {
  try {
    return await instance.post(`${process.env.REACT_APP_BASE_API}users`, data, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const update = async (token, id, data) => {
  try {
    return await instance.put(`${process.env.REACT_APP_BASE_API}users/${id}`, data, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}

export const remove = async (token, id) => {
  try {
    return await instance.delete(`${process.env.REACT_APP_BASE_API}users/${id}`, getHeaders(token)).then(res => res.data)
  } catch (error) {
    console.error('Error recibiendo usuario', error)
  }
}
