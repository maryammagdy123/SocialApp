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

// get all posts on feed page
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
// create new post
export const createPostApi = async (formData) => {
	const { data } = await axios.post('https://linked-posts.routemisr.com/posts', formData, {
		headers: { token: localStorage.getItem("token") }
	});
	return data
}
// update / edit post
export const updatePostApi = async ({ formData, _id }) => {
	const { data } = await axios.put(`https://linked-posts.routemisr.com/posts/${_id}`, formData, {
		headers: { token: localStorage.getItem("token") }
	})
	return data;
}