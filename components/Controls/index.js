import styled from "@emotion/native"

const Container = styled.View`
	flex-direction: row;
	justify-content: center;
	background-color: #1c1f2e;
	width: 70%;
	min-width: 700px;
	flex-wrap: wrap;
	margin: 0 auto;
	padding: 10px 0;
	border-radius: 108px;
`

const Button = styled.TouchableOpacity`
	width: 90px;
	height: 50px;
	align-items: center;
	justify-content: center;
	text-align: center;
	/* border-radius: 9999px; */
	margin: 10px;
	/* background-color: teal; */
`

const ImageButton = styled.Image`
	width: 40px;
	height: 40px;
`

const TextButton = styled.Text`
	width: 50px;
	color: #d3c7b7;
	font-weight: 300;
	font-size: 14px;
	margin-top: 15px;
	width: 100%;
	text-align: center;
	text-transform: uppercase;
`

import {useSocket} from "../../utils/socket"

function Controls() {
	const socket = useSocket()

	const handleClickControl = (type) => {
		if (!socket) return
		socket.emit("controls", type)
	}

	return (
		<Container>
			<Button
				onPressIn={() => handleClickControl("back-fast-press-in")}
				onPressOut={() => handleClickControl("back-fast-press-out")}
			>
				<ImageButton source={require("../../assets/back-fast.png")} resizeMode="contain" />
				<TextButton>Retroceder</TextButton>
			</Button>
			<Button onPress={() => handleClickControl("back")}>
				<ImageButton source={require("../../assets/back.png")} resizeMode="contain" />
				<TextButton>Ir atras</TextButton>
			</Button>
			<Button onPress={() => handleClickControl("pause")}>
				<ImageButton source={require("../../assets/pause.png")} resizeMode="contain" />
				<TextButton>Pausa</TextButton>
			</Button>
			<Button onPress={() => handleClickControl("play")}>
				<ImageButton source={require("../../assets/play.png")} resizeMode="contain" />
				<TextButton>Play</TextButton>
			</Button>
			<Button
				onPressIn={() => handleClickControl("advanced-press-in")}
				onPressOut={() => handleClickControl("advanced-press-out")}
			>
				<ImageButton source={require("../../assets/advanced.png")} resizeMode="contain" />
				<TextButton>Avanzar</TextButton>
			</Button>
		</Container>
	)
}

export default Controls
