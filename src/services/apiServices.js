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

export const getPosts = async () => {
	const { data } = await axios.get(
		`https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt`,
		{
			headers: {
				token: localStorage.getItem("token"),
			},
		}
	);
	return data.posts
}