import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { createPostApi } from '../services/apiServices'
import toast from 'react-hot-toast';

export default function usePost(fileInput, reset, setShowModal) {
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

	// 

	return {
		createPost, createPostLoading
	}
}
