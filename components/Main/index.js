import { useState, useEffect } from "react"
import { SocketProvider } from "../../utils/socket"

import { getData, setData } from "../../utils/storage"

import Settings from "../Prompt"

import { SERVER } from "../../contants"
import styled from "@emotion/native"

const ImageButton = styled.Image`
	width: 25px;
	height: 25px;
`
const Button = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	align-items: center;
	justify-content: center;
	text-align: center;
	margin: 10px;
	position: absolute;
	right: 0;
`

const Main = ({ children }) => {

	const [server, setServer] = useState(null)
	const [isSettingsVisible, setIsSettingsVisible] = useState(false)
	const [statusSocket, setStatusSocket] = useState()

	useEffect(() => {
		getData("ipserver").then((server) => {
			setServer(server)
		})
	}, [])

	const onInitProvider = (client) => {
		client.on("connect", () => {
			console.log("server connected")
			setStatusSocket("Conectado 🆗")
			setIsSettingsVisible(false)
		})

		client.on("connect_error", () => {
			client.close()
			console.log("error at", server)
			setStatusSocket("Desconectado ❌")
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

	const handlePressSettings = () => {
		setIsSettingsVisible(true)
	}

	return (
		<>
			{/* <SocketProvider server={server} onInit={onInitProvider}>
				{children}
			</SocketProvider> */}

			{children}

			{/* <Settings
				server={server}
				visible={isSettingsVisible}
				onOkPress={onSaveSettings}
				onCancelPress={onCancelSettings}
				statusSocket={statusSocket}
			/> */}

			<Button onPress={handlePressSettings}>
				<ImageButton source={require("../../assets/setting.png")} resizeMode="contain" />
			</Button>

		</>
	)
}

export default Main
