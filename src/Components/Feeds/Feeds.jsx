import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import LoadingSkeleton from '../LoadingSketlon/LoadingSketlon';
import CreatePost from '../CreatePost/CreatePost';

export default function Feeds() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		try {
			const { data } = await axios.get(
				`https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt`,
				{
					headers: {
						token: localStorage.getItem("token"),
					},
				}
			);
			setPosts(data?.posts);
			setError(null);
			console.log(data)
		} catch (err) {
			console.error("Error fetching posts:", err);
			setError("Failed to load posts. Please try again later.");
		} finally {
			setLoading(false);
		}
	}
	return (
		<div className="min-h-screen w-full lg:w-[80%] py-8 px-3 flex flex-col items-center mt-12 lg:ml-56 sm:mx-auto">
			{/* Title */}
			<h1 style={{ color: "var(--text-main)" }} className="text-2xl font-bold mb-6 text-center">
				Home Feeds..
			</h1>

			<div className="w-full max-w-2xl space-y-6">
				{/* Create Post Card */}
				<div
					style={{
						background: "var(--card-bg)",
						boxShadow: "var(--shadow-sm)",
						borderRadius: "var(--radius-md)",
						padding: "var(--space-4)",
					}}
				>
					<CreatePost />
				</div>

				{/* Loading / Error / Posts */}
				{loading ? (
					<LoadingSkeleton />
				) : error ? (
					<div
						style={{
							color: "var(--error)",
							background: "rgba(239, 68, 68, 0.1)",
							borderRadius: "var(--radius-md)",
							padding: "var(--space-3) var(--space-4)",
						}}
						className="text-center"
					>
						{error}
					</div>
				) : posts.length > 0 ? (
					posts.map((post) => (
						<div
							key={post._id}
							style={{
								background: "var(--card-bg)",
								boxShadow: "var(--shadow-sm)",
								borderRadius: "var(--radius-md)",
								padding: "var(--space-4)",
							}}
						>
							<Post post={post} showAllComments={false} />
						</div>
					))
				) : (
					<div className="text-center mt-10" style={{ color: "var(--text-soft)" }}>
						<p className="text-lg font-medium">No posts available right now.</p>
						<p className="text-sm">Check back later or try refreshing the page.</p>
					</div>
				)}
			</div>
		</div>
	);
}

