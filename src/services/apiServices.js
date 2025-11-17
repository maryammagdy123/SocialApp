import axios from "axios";

export const loginUser = async (value) => {
	const { data } = await axios.post(
		`https://linked-posts.routemisr.com/users/signin`,
		value
	);
	return data;
};

export const RegisterUser = async (value) => {
	const { data } = await axios.post(
		`https://linked-posts.routemisr.com/users/signup`,
		value
	);
	return data

};