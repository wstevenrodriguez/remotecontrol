import {View} from "react-native"

import styled from "@emotion/native"

const Image = styled.Image`
	width: 100px;
	height: 100px;
`

const Container = styled.View`
	padding: 0;
`

const TextTitle = styled.Text`
	color: #d3c7b7;
	text-align: center;
	font-size: 20px;
`

function Header() {
	return (
		<Container>
			<TextTitle>Selecciona el espacio del apartamento que quieres navegar</TextTitle>
		</Container>
	)
}

export default Header
