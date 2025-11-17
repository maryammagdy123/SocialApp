import { useContext } from "react"
import toast from "react-hot-toast"
import { UserDataContext } from "../Context/UserDataContext"
import { useNavigate } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { loginUser, RegisterUser } from "../services/apiServices"

export function useAuthentication() {
	let { getLoggedUserData } = useContext(UserDataContext)
	let navg = useNavigate()




	const { mutate: Login, isPending: loginLoading } = useMutation({
		mutationFn: loginUser,

		onSuccess: (data) => {
			console.log("dataaaa", data)
			if (data.message === "success") {
				// Save token
				localStorage.setItem("token", data.token);

				// Success message
				toast.success("Logged in successfully");


				getLoggedUserData();

				// Navigate to home
				navg("/");
			}
		},

		onError: (error) => {
			toast.error(error.response.data.error);
		},
	});




	const { mutate: Register, isPending: registerLoading } = useMutation({
		mutationFn: RegisterUser,
		onSuccess: (data) => {
			if (data.message === "success") {
				toast.success("Account created  successfully")
				navg("/login");
			}
		},
		onError: (error) => {
			toast.error(error.response.data.error)
		}
	})


	return {
		Login,
		loginLoading,
		Register,
		registerLoading,
	}
}


