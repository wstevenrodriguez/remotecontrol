import React, {useEffect} from "react"
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	useDerivedValue,
	interpolate,
	withDelay,
	withTiming,
} from "react-native-reanimated"

export const EntryAnimation = ({children, index}) => {
	const play = useSharedValue(false)
	const progress = useDerivedValue(() => {
		return play.value ? withDelay(50 * (index ?? 0), withTiming(1, {duration: 1350})) : 0
	})

	useEffect(() => {
		play.value = true
	}, [])

	const animatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(progress.value, [0, 1], [0, 1])

		const translateY = interpolate(progress.value, [0, 1], [100, 0], [200, 0])
		const translateX = interpolate(progress.value, [0, 1], [100, 0])

		return {
			opacity,
			transform: [{translateX: translateX}, {translateY: translateY}],
		}
	})

	return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
