import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'
const GithubContext = React.createContext()
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)

  // request loading
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // error
  const [error, setError] = useState({ show: false, msg: '' })

  const Checkdata = () => {
    axios('https://api.github.com/rate_limit')
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(0)
        if (remaining === 0) {
          //throw error
        }
      })
      .catch((err) => console.log(err))
  }
  useEffect(Checkdata, [])
  return (
    <GithubContext.Provider
      value={{ githubUser, repos, followers, requests, isLoading, error }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export { GithubProvider, GithubContext }
