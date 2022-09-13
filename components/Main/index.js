import {useState, useEffect} from "react"
import {SocketProvider} from "../../utils/socket"

import {getData, setData} from "../../utils/storage"

import Settings from "../Settings"

import {SERVER} from "../../contants"

const Main = ({children}) => {
	const [server, setServer] = useState(null)
	const [isSettingsVisible, setIsSettingsVisible] = useState(false)

	useEffect(() => {
		getData("ipserver").then((server) => {
			setServer(server)
		})
	}, [])

	const onInitProvider = (client) => {
		client.on("connect", () => {
			console.log("server connected")
			setIsSettingsVisible(false)
		})

		client.on("connect_error", () => {
			client.close()
			console.log("error at", server)
			setIsSettingsVisible(true)
		})
	}

	const onSaveSettings = (ip) => {
		setData("ipserver", ip).then(() => {
			setServer(ip)
			setIsSettingsVisible(false)
		})
	}

	const onCancelSettings = () => {
		setIsSettingsVisible(false)
	}

	return (
		<>
			<SocketProvider server={server} onInit={onInitProvider}>
				{children}
			</SocketProvider>
			<Settings
				server={server}
				visible={isSettingsVisible}
				onOkPress={onSaveSettings}
				onCancelPress={onCancelSettings}
			/>
		</>
	)
}

export default Main
