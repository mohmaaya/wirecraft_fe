import { useMutation } from "@tanstack/react-query"
import loginPage from "./LoginPage"

const userIndex = () => {

    const logOut = useMutation({
        mutationFn: createUser,
        onSuccess: () => {

            console.log("Looged Out");
        },
    })

    return (
        
        <>

            <button>Add Friends</button>
            <button>My Friends</button>
            <button>Pending Requests</button>
            <button>Delete a friend</button>
            <button>Friends nearby</button>

            <button onClick={() => { logOut.mutate() }}>Log Out</button>


        </>
        
        
        
        );


};

export default userIndex;