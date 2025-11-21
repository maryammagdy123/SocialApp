import React from 'react';
import Post from '../Post/Post';
import LoadingSkeleton from '../LoadingSketlon/LoadingSketlon';
import CreatePost from '../CreatePost/CreatePost';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../services/apiServices';
import EmptyPosts from '../MyPosts/EmptyPosts';

export default function Feeds() {
	const { data: posts, isError, isLoading, error } = useQuery({
		queryFn: getPosts,
		queryKey: ['posts'],
		refetchOnWindowFocus: true,
	})


	const renderPost = () => {
		if (isLoading) return <LoadingSkeleton />;

		if (isError)
			return (
				<div className="text-red-600 text-center bg-red-100 px-4 py-2 rounded-md">
					{error?.message || 'Something went wrong.'}
				</div>
			);

		if (posts?.length > 0)
			return posts.map((post) => (
				<Post key={post._id} post={post} showAllComments={false} />
			));

		return <EmptyPosts />;
	};

	return (
		<div className="min-h-screen w-full lg:w-[80%] py-8 px-3 flex flex-col items-center mt-12 lg:ml-56 mx-auto">

			<h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Home Feeds..</h1>


			<div className="w-full   max-w-2xl space-y-6">
				<CreatePost />

				{renderPost()}
			</div>
		</div>

	);
}

