import {StatusBar} from "expo-status-bar"

import styled from "@emotion/native"

import Header from "./components/Header"
import Menu from "./components/Menu"
import Controls from "./components/Controls"
import Footer from "./components/Footer"
import Main from "./components/Main"

export default function App() {
	return (
		<Container source={require("./assets/background.png")}>
			<StatusBar style="auto" />
			<Header />
			<Main>
				<Menu />
				<Controls />
				<Footer />
			</Main>
		</Container>
	)
}

const Container = styled.ImageBackground`
	padding: 40px;
	padding-bottom: 30px;
	padding-top: 30px;
	height: 100%;
`
