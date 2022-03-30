import styled from "@emotion/native"
import Animated, {
	useSharedValue,
	withSpring,
	useAnimatedStyle,
	useAnimatedGestureHandler,
} from "react-native-reanimated"
import {PanGestureHandler} from "react-native-gesture-handler"

const io = require("socket.io-client")

const Container = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: #968a7e;
	border-radius: 25px;
	height: 95%;
	margin: 0px 70px;
	padding: 12px;
	padding-top: 0px;
	position: relative;
`
const Title = styled.Text`
	color: #fff;
	font-size: 20px;
	font-weight: bold;
	text-align: center;
	color: #26293a;
	text-transform: uppercase;
	width: 100%;
	padding: 20px 0;
`
const Trackpadzone = styled.View`
	background-color: #1c1f2e;
	flex: 1;
	border-radius: 25px;
	position: relative;
	justify-content: center;
`
const TrackpadArrow = styled.Image`
	width: 45px;
	height: 45px;
	position: absolute;

	${(props) => {
		if (props.type === "top") {
			return `
				transform: rotate(-90deg) translateX(-25px);
				top: 5px;
				left: 50%;
			`
		} else if (props.type === "bottom") {
			return `
				transform: rotate(90deg) translateX(-25px);
				bottom: 5px;
				left: 50%;
			`
		} else if (props.type === "left") {
			return `
				transform: rotate(-180deg) translateY(-25px);
				left: 5px;
				top: 50%;
			`
		} else if (props.type === "right") {
			return `
				transform:  translateY(-25px);
				right: 5px;
				top: 50%;
			`
		} else if (props.type === "center") {
			return `
				transform:  translateX(-35px) translateY(-35px);
				left: 50%;
				top: 50%;
				width: 70px;
				height: 70px;
				position: relative;
			`
		} else {
			return ``
		}
	}}
`
import {SERVER} from "../../contants"

console.log("el server es", SERVER)

function Trackpad() {
	const socket = io(SERVER, {})

	const handleGesture = (evt) => {
		let {nativeEvent} = evt

		socket.emit("trackpad", nativeEvent)
	}

	const startingPosition = 0
	const x = useSharedValue(startingPosition)
	const y = useSharedValue(startingPosition)

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, ctx) => {
			ctx.startX = x.value
			ctx.startY = y.value
		},
		onActive: (event, ctx) => {
			x.value = ctx.startX + event.translationX
			y.value = ctx.startY + event.translationY
		},
		onEnd: (_) => {
			x.value = withSpring(startingPosition)
			y.value = withSpring(startingPosition)
		},
	})

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{translateX: x.value}, {translateY: y.value}],
		}
	})

	return (
		<Container>
			<Title>Navegación 360º</Title>

			<Trackpadzone>
				<TrackpadArrow
					source={require("../../assets/arrow_trackpad.png")}
					resizeMode="contain"
					type="top"
				/>

				<TrackpadArrow
					source={require("../../assets/arrow_trackpad.png")}
					resizeMode="contain"
					type="bottom"
				/>

				<TrackpadArrow
					source={require("../../assets/arrow_trackpad.png")}
					resizeMode="contain"
					type="left"
				/>

				<TrackpadArrow
					source={require("../../assets/arrow_trackpad.png")}
					resizeMode="contain"
					type="right"
				/>
				<PanGestureHandler onGestureEvent={handleGesture}>
					<Animated.View style={[animatedStyle]}>
						<TrackpadArrow
							source={require("../../assets/hand_trackpad.png")}
							resizeMode="contain"
							type="center"
						/>
					</Animated.View>
				</PanGestureHandler>
			</Trackpadzone>
		</Container>
	)
}

export default Trackpad
