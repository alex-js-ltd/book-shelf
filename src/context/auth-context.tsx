import React, {
	createContext,
	useContext,
	useEffect,
	ReactNode,
	useCallback,
	useMemo,
	MouseEventHandler,
} from 'react'
import { queryClient } from 'context'
import * as auth from 'auth-provider'
import { useAsync } from 'utils/hooks'
import { FormData } from 'types'

type AuthProviderProps = { children: ReactNode }

const AuthContext = createContext<
	| {
			user: any
			login: Function
			register: Function
			logout: MouseEventHandler<HTMLButtonElement>
	  }
	| undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

// fetch user before auth provider mounts
const userPromise = auth.getUser()

const AuthProvider = ({ children }: AuthProviderProps) => {
	const {
		data: user,

		run,
		setData,
	} = useAsync()

	useEffect(() => {
		console.log('useEffect')
		run(userPromise)
	}, [run])

	const login = useCallback(
		(form: FormData) => auth.login(form).then(user => setData(user)),
		[setData],
	)

	const register = useCallback(
		(form: FormData) => auth.register(form).then(user => setData(user)),
		[setData],
	)

	const logout = useCallback(() => {
		auth.logout()
		queryClient.clear()
		setData(null)
	}, [setData])

	const value = useMemo(
		() => ({ user, login, logout, register }),
		[login, logout, register, user],
	)

	return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>
}

const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthContext provider`)
	}
	return context
}

export { AuthProvider, useAuth }
