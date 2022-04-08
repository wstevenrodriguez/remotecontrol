import styled from "@emotion/native"
import Animated, {
	useSharedValue,
	withSpring,
	useAnimatedStyle,
	useAnimatedGestureHandler,
	useDerivedValue,
	runOnJS,
	withDecay,
} from "react-native-reanimated"
import {PanGestureHandler} from "react-native-gesture-handler"

const Container = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: #968a7e;
	border-radius: 25px;
	height: 100%;
	margin: 0px 50px;
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

import {useSocket} from "../../utils/socket"

const X_DECELERATION_SPEED = 0.7
const Y_DECELERATION_SPEED = 0.7

function Trackpad() {
	const socket = useSocket()

	const handleGesture = (data) => {
		if (!socket) return
		socket.emit("trackpad", data)
	}

	const startingPosition = 0
	const x = useSharedValue(startingPosition)
	const y = useSharedValue(startingPosition)
	const translationX = useSharedValue(startingPosition)
	const translationY = useSharedValue(startingPosition)

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, ctx) => {
			ctx.startX = x.value
			ctx.startY = y.value
		},
		onActive: (event, ctx) => {
			//cursor
			x.value = ctx.startX + event.translationX
			y.value = ctx.startY + event.translationY

			//socket
			translationX.value = event.translationX
			translationY.value = event.translationY
		},

		onEnd: ({velocityX, velocityY}) => {
			//cursor
			x.value = withSpring(startingPosition)
			y.value = withSpring(startingPosition)

			//translation interpolation
			translationX.value = withDecay({
				velocity: velocityX,
				deceleration: X_DECELERATION_SPEED,
				clamp: [-250, 250],
			})
			translationY.value = withDecay({
				velocity: velocityY,
				deceleration: Y_DECELERATION_SPEED,
				clamp: [-250, 250],
			})
		},
	})

	useDerivedValue(() => {
		//send to socket on transation update
		runOnJS(handleGesture)({
			translationX: translationX.value / 60,
			translationY: translationY.value / 70,
		})
	}, [translationX.value, translationY.value])

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
				<PanGestureHandler onGestureEvent={gestureHandler}>
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
