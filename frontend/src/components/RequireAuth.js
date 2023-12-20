import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios'

const RequireAuth = ({ children }) => {
    const location = useLocation()
    const nevigate = useNavigate()

    // check pages that are locked ? 
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3001/read-session')
            .then(res => {
                if (res.data.state === 'user') {
                    if (location.pathname === '/dash-a') nevigate('/dash-u')
                    else nevigate('/login', { state: { path: location.pathname } })
                }
            }
            )
            .catch(err => console.log(err))
    }, [])

    return children
}

export default RequireAuth