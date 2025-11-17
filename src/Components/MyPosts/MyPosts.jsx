import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Context/UserDataContext";
import axios from "axios";
import Post from "../Post/Post";

export default function MyPosts() {
	const { user } = useContext(UserDataContext);
	const USER_ID = user?._id;

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (USER_ID) getMyPosts();
	}, [USER_ID]);

	async function getMyPosts() {
		try {
			const { data } = await axios.get(
				`https://linked-posts.routemisr.com/users/${USER_ID}/posts?limit=10`,
				{
					headers: { token: localStorage.getItem("token") },
				}
			);
			if (data.message === "success") setPosts(data.posts);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="my-6 space-y-6">
			<div className="flex flex-col justify-center text-text-main my-4">
				<h1 className="text-2xl p-2">Posts</h1>
				<div className="w-[20%] rounded-2xl h-[10px] bg-primary-500"></div>
			</div>

			{loading ? (
				<p style={{ color: "var(--text-soft)" }}>Loading...</p>
			) : (
				posts.map((post) => (
					<div
						key={post._id}
						className="mx-auto"
						style={{
							background: "var(--card-bg)",
							borderRadius: "var(--radius-lg)",
							boxShadow: "var(--shadow-sm)",
						}}
					>
						<Post post={post} showAllComments={false} />
					</div>
				))
			)}
		</div>
	);
}
