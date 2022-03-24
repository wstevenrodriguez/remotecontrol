import {StatusBar} from "expo-status-bar"

import styled from "@emotion/native"

import Header from "./components/Header"
import Menu from "./components/Menu"
import Controls from "./components/Controls"
import Footer from "./components/Footer"

export default function App() {
	return (
		<Container source={require("./assets/background.png")}>
			<StatusBar style="auto" />
			<Header />
			<Menu />
			<Controls />
			<Footer />
		</Container>
	)
}

const Container = styled.ImageBackground`
	padding: 40px;
	padding-bottom: 30px;
	padding-top: 30px;
	height: 100%;
`
