import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPostApi, updatePostApi } from '../services/apiServices'
import toast from 'react-hot-toast';

export default function usePost(fileInput, reset, setShowModal) {
	const queryClient = useQueryClient();
	// create post
	const { mutate: createPost, isPending: createPostLoading } = useMutation({
		mutationFn: (FormData) => createPostApi(FormData),
		onSuccess: () => {
			toast.success("Post created");
			fileInput.current.value = "";
			reset();
			setShowModal(false);
			window.location.reload()
		},
		onError: () => {
			toast.error("Failed to create post");
		}
	})

	// update post
	const { mutate: updatePost, isPending: updatePostLodaing } = useMutation({
		mutationFn: (FormData) => updatePostApi(FormData),
		onSuccess: () => {
			toast.success("Post Updated!");
			fileInput.current.value = "";
			reset();
			window.location.reload()
			queryClient.invalidateQueries(["posts"]);
		},
		onError: () => {
			toast.error("cannot update post")
		}
	})
	return {
		createPost, createPostLoading, updatePostLodaing, updatePost
	}
}
