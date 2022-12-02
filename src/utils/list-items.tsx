import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'

import { useClient } from './use-client'

const useListItems = () => {
	const { read } = useClient()
	const { user } = useAuth()
	const userId = user?.localId

	const result = useQuery({
		queryKey: ['list-items', userId],
		queryFn: () => read(`users?userId=${userId}`),
	})

	return result?.data ?? []
}

export { useListItems }
