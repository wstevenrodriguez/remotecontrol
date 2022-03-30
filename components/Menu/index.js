import styled from "@emotion/native"

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	padding-top: 20px;
	padding-bottom: 20px;
`

const Button = styled.TouchableOpacity`
	width: 16%;
	min-width: 130px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	margin: 15px;
	border-radius: 5px;
	border: 2px solid #d3c7b7;
	color: #d3c7b7;
	font-weight: bold;
`

const TextButton = styled.Text`
	color: #fff;
	font-size: 18px;
	text-align: center;
	text-align: center;
	font-weight: bold;
`

const io = require("socket.io-client")

import {SERVER} from "../../contants"

function Menu() {
	const socket = io(SERVER, {})

	const handleClickMenu = (space) => {
		socket.emit("spaces", space)
	}

	return (
		<Container>
			<Button onPress={() => handleClickMenu("Cocina")}>
				<TextButton>Cocina</TextButton>
			</Button>
			<Button onPress={() => handleClickMenu("CuartoRopas")}>
				<TextButton>Cuarto Ropas</TextButton>
			</Button>
			<Button onPress={() => handleClickMenu("Hab.Servicio")}>
				<TextButton>Hab.Servicio</TextButton>
			</Button>
			<Button onPress={() => handleClickMenu("Salon")}>
				<TextButton>Salón</TextButton>
			</Button>
			<Button onPress={() => handleClickMenu("Balcon")}>
				<TextButton>Balcón</TextButton>
			</Button>
			<Button onPress={() => handleClickMenu("Estudio")}>
				<TextButton>Estudio</TextButton>
			</Button>
			<Button onPress={() => handleClickMenu("Hab.1")}>
				<TextButton>Hab. 1</TextButton>
			</Button>
			<Button onClick={() => handleClickMenu("Hab.2")}>
				<TextButton>Hab. 2</TextButton>
			</Button>
			<Button onClick={() => handleClickMenu("Hab.Principal")}>
				<TextButton>Hab. Principal</TextButton>
			</Button>
			<Button onClick={() => handleClickMenu("Vestier")}>
				<TextButton>Vestier</TextButton>
			</Button>
		</Container>
	)
}

export default Menu
