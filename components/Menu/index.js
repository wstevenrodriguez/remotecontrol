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
	min-width: 120px;
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

function Menu() {
	return (
		<Container>
			<Button>
				<TextButton>Cocina</TextButton>
			</Button>
			<Button>
				<TextButton>Cuarto Ropas</TextButton>
			</Button>
			<Button>
				<TextButton>Hab.Servicio</TextButton>
			</Button>
			<Button>
				<TextButton>Salón</TextButton>
			</Button>
			<Button>
				<TextButton>Balcón</TextButton>
			</Button>
			<Button>
				<TextButton>Estudio</TextButton>
			</Button>
			<Button>
				<TextButton>Hab. 1</TextButton>
			</Button>
			<Button>
				<TextButton>Hab. 2</TextButton>
			</Button>
			<Button>
				<TextButton>Hab. Principal</TextButton>
			</Button>
			<Button>
				<TextButton>Vestier</TextButton>
			</Button>
		</Container>
	)
}

export default Menu
