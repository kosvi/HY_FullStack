import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../misc/queries'

const LoginForm = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            props.setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    const submit = (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    if (!props.show) {
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                username: <input type="text" onChange={({ target }) => setUsername(target.value)} /><br />
                password: <input type="password" onChange={({ target }) => setPassword(target.value)} /><br />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm