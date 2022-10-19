import styled from "@emotion/native"
import Trackpad from "../Trackpad"

const Container = styled.View`
	flex-direction: row;
	border-radius: 31px;
	justify-content: space-between;
	align-items: flex-end;
	margin-top: 30px;
	flex: 1;
`

const Logo = styled.Image`
	width: 100px;
	height: 100px;
`

function Footer({ server }) {
	return (
		<Container>
			<Logo source={require("../../assets/monterivera_logo.png")} resizeMode="contain" />
			<Trackpad server={server} />
			<Logo source={require("../../assets/amarilo_logo.png")} resizeMode="contain" />
		</Container>
	)
}

export default Footer
