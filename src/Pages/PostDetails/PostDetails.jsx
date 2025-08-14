// when clickin on (see post details it will take us to this page) 
// this page shows the clicked post details
// getSinglePost()
import { BiArrowBack } from 'react-icons/bi';
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import Post from '../../Components/Post/Post'
import axios from 'axios'
import LoadingSkeleton from '../../Components/LoadingSketlon/LoadingSketlon'

export default function PostDetails() {
	let { id } = useParams()
	let [post, setPost] = useState({})
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getSinglePost()
	}, [id])

	async function getSinglePost() {

		let { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
			headers: {
				token: localStorage.getItem("token")
			}
		})

		if (data.message === "success") {

			setPost(data?.post)
			setLoading(false)
		}




	}



	return (
		<>
			<div className="min-h-screen flex items-center justify-center px-4 py-8">
				<div className="w-full max-w-2xl">
					{post && post._id ? (
						<Post post={post} showDetailsButton={false} showComments={true} />
					) : loading ? (
						<LoadingSkeleton />
					) : (
						<div className="text-center text-gray-500">
							<p className="text-xl">No post found</p>
						</div>
					)}
				</div>
			</div>


		</>
	);
}
