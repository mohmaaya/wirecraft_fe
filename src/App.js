import SignUpPage from "./SignUpPage"
import LoginPage from "./LoginPage"
import UserIndex from './UserIndex'
import {useState} from 'react'

export default function App() {

    const [loggedUsername, setLoggedUsername] = useState(null)

    return (

        <>
            <SignUpPage />
          
            <LoginPage callbackFnc={(username) => { setLoggedUsername(username) }}/>

            {loggedUsername && <UserIndex username={loggedUsername} /> }

        </>
        );

}
