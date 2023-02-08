import { StatusBar } from "expo-status-bar"

import styled from "@emotion/native"

import Header from "./components/Header"
import Menu from "./components/Menu"
import Controls from "./components/Controls"
import Footer from "./components/Footer"
import Main from "./components/Main"
import { useEffect, useState } from "react"
import Prompt from "./components/Prompt"
import { ImageBackground, View } from "react-native"

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

		<ImageBackground
			source={require("./assets/background.png")}
			style={{ width: '100%', height: '100%' }}
		>
			<View style={{ flex: 1, padding: 20 }}>
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
			</View>

		</ImageBackground>
	)
}

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