import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserDataContext = createContext();

export function UserDataContextProvider({ children }) {
	let [user, setUser] = useState(null);
	

	async function getLoggedUserData() {
		try {
			let { data } = await axios.get(
				`https://linked-posts.routemisr.com/users/profile-data`,
				{
					headers: {
						token: localStorage.getItem("token"),
					},
				}
			);

			console.log(data);
			console.log(data.user);

			if (data?.message === "success") {
				setUser(data.user);
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}

	  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedUserData();
    }
  }, []);
	return (
		<UserDataContext.Provider value={{ user, setUser, getLoggedUserData }}>
			{children}
		</UserDataContext.Provider>
	);
}
