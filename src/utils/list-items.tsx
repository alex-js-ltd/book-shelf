import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { useClient } from './use-client'

const useFinishedList = () => {
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const result = useQuery({
		queryKey: ['finished-list', userId],
		queryFn: () => read(`finished-list?userId=${userId}`),
	})

	return result?.data ?? []
}

const useReadingList = () => {
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const result = useQuery({
		queryKey: ['reading-list', userId],
		queryFn: () => read(`reading-list?userId=${userId}`),
	})

	return result?.data ?? []
}

export { useFinishedList, useReadingList }
