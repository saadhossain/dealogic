import { useEffect, useState } from "react";

const useUser = (email) => {
    const [loggedInUser, setLoggedInUser] = useState([])
    const [userLoading, setUserLoading] = useState(true)
    useEffect(() => {
        fetch(`https://dealogic.vercel.app/user?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedInUser(data[0])
                setUserLoading(false)
            })
    }, [email])
    return { loggedInUser, userLoading };
}

export default useUser;