import {createContext, useContext, useState, useEffect} from "react"

import {io, Socket} from "socket.io-client"

export const SocketContext = createContext()

export const SocketProvider = ({server, children, onInit = () => {}}) => {
	const [client, setClient] = useState(null)

	useEffect(() => {
		const socket = io(server, {transports: ["websocket"]})
		setClient(socket)
		onInit(socket)
	}, [server])
	return <SocketContext.Provider value={client}>{children}</SocketContext.Provider>
}

/**
 * @param {()=>io} onConnect
 * @returns {Socket}
 */
export const useSocket = (onConnect = () => {}) => {
	const client = useContext(SocketContext)

	useEffect(() => {
		onConnect(client)
	}, [client])

	return client
}
