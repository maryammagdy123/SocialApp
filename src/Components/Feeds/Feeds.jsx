import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import LoadingSkeleton from '../LoadingSketlon/LoadingSketlon';
import CreatePost from '../CreatePost/CreatePost';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../services/apiServices';

export default function Feeds() {
	const { data: posts, isError, isLoading } = useQuery({
		queryFn: getPosts,
		queryKey: ['posts'],
		refetchOnWindowFocus: true,
	})


	return (
		<div className="min-h-screen w-full lg:w-[80%] py-8 px-3 flex flex-col items-center mt-12 lg:ml-56 mx-auto">

			<h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Home Feeds..</h1>


			<div className="w-full   max-w-2xl space-y-6">
				<CreatePost />

				{isLoading ? (
					<LoadingSkeleton />
				) : isError ? (
					<div className="text-red-600 text-center bg-red-100 px-4 py-2 rounded-md">
						{isError}
					</div>
				) : posts.length > 0 ? (
					posts.map((post) => (
						<Post key={post._id} post={post} showAllComments={false} />

					))
				) : (
					<div className="text-center mt-10 text-gray-600">
						<p className="text-lg font-medium">No posts available right now.</p>
						<p className="text-sm text-gray-400">Check back later or try refreshing the page.</p>
					</div>
				)}
			</div>
		</div>

	);
}

