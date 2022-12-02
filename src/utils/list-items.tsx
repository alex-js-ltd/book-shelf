import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'

import { useClient } from './use-client'

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

const useFinishedList = () => {
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const result = useQuery({
		queryKey: ['finished', userId],
		queryFn: () => read(`finished?userId=${userId}`),
	})

	return result?.data ?? []
}

export { useReadingList, useFinishedList }
