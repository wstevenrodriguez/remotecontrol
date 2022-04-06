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
	width: 13%;
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

import {SERVER, SPACES} from "../../contants"

function Menu() {
	const socket = io(SERVER, {})

	const handleClickMenu = (space) => {
		socket.emit("spaces", space)
	}

	return (
		<Container>
			{SPACES.map(({key, name}) => (
				<Button key={key} onPress={() => handleClickMenu(key)}>
					<TextButton>{name}</TextButton>
				</Button>
			))}
		</Container>
	)
}

export default Menu
