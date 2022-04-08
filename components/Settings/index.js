import {useState, useEffect} from "react"
import {Platform} from "react-native-web"

import styled from "@emotion/native"

const Container = styled.KeyboardAvoidingView`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	z-index: 100;
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0);
`

const Content = styled.View`
	width: 250px;
	height: 150px;
	background-color: #ccc;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
`

export const Footer = styled.View`
	display: flex;
	flex-direction: row;
`

const TextBlock = styled.Text`
	color: #000;
	font-size: 18px;
	text-align: center;
	text-align: center;
	font-weight: bold;
`

const Button = styled.TouchableOpacity`
	width: 40%;
	height: 30px;
	// min-width: 130px;

	display: flex;
	align-items: center;
	justify-content: center;
	margin: 5px;
	border-radius: 5px;
	border: 2px solid #bcb7d3;
	color: #d3c7b7;
	font-weight: bold;
`

const Input = styled.TextInput`
	width: 200px;
	height: 30px;
	padding: 2px 10px;
	border: 1px solid #222;
	margin-top: 20px;
`

function Settings({server, visible = false, onOkPress = () => {}, onCancelPress = () => {}}) {
	const [ip, setIp] = useState(server)

	useEffect(() => {
		setIp(server)
	}, [server])

	if (!visible) return <></>

	return (
		<Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<Content>
				<TextBlock>Socket Settings:</TextBlock>

				<Input>{ip}</Input>

				<Footer>
					<Button
						onPress={() => {
							onOkPress(ip)
						}}
					>
						<TextBlock>Guardar</TextBlock>
					</Button>
					<Button onPress={onCancelPress}>
						<TextBlock>Cancelar</TextBlock>
					</Button>
				</Footer>
			</Content>
		</Container>
	)
}

export default Settings
