import { StatusBar } from "expo-status-bar"

import styled from "@emotion/native"

import Header from "./components/Header"
import Menu from "./components/Menu"
import Controls from "./components/Controls"
import Footer from "./components/Footer"
import Main from "./components/Main"
import { useState } from "react"
import Prompt from "./components/Prompt"

const io = require("socket.io-client")


export default function App() {
	const [serverIp, setServerIp] = useState(null)
	const [visiblePrompt, setVisiblePrompt] = useState(false)

	const handlePromptSettings = () => {
		setVisiblePrompt(true)
	}

	const handleOkPress = (ip) => {
		setServerIp(ip)
		setVisiblePrompt(false)
	}

	return (
		<Container source={require("./assets/background.png")}>
			<StatusBar style="auto" />
			<Header />

			<Menu server={serverIp} />
			<Controls server={serverIp} />

			{/* TRACKPAD */}
			<Footer server={serverIp} />

			<Prompt visible={visiblePrompt} onOkPress={(handleOkPress)} onCancelPress={() => setVisiblePrompt(false)} />

			<Button onPress={handlePromptSettings}>
				<ImageButton source={require("./assets/setting.png")} resizeMode="contain" />
			</Button>
		</Container>
	)
}

const Container = styled.ImageBackground`
	padding: 40px;
	padding-bottom: 30px;
	padding-top: 30px;
	height: 100%;
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
const ImageButton = styled.Image`
	width: 25px;
	height: 25px;
`