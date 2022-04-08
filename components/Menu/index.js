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
	width: 11%;
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

import {useSocket} from "../../utils/socket"
import {SPACES} from "../../contants"

function Menu() {
	const socket = useSocket()

	const handleSocket = (space) => {
		if (!socket) return
		socket.emit("spaces", space)
	}

	return (
		<Container>
			{SPACES.map(({key, name}) => (
				<Button key={key} onPress={() => handleSocket(key)}>
					<TextButton>{name}</TextButton>
				</Button>
			))}
		</Container>
	)
}

export default Menu
