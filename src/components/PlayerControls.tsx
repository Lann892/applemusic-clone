import { View, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import { FontAwesome6 } from '@expo/vector-icons'
import { colors } from '@/constants/tokens'

type PlayerControlsProps = {
	style?: ViewStyle
}

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<SkipToPreviousButton />

				<PlayPauseButton iconSize={40} style={{ marginLeft: 2 }} />

				<SkipToNextButton />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
	const { playing } = useIsPlaying()

	return (
		<View style={[{ height: '100%' }, style]}>
			<TouchableOpacity
				activeOpacity={0.7}
				style={{ paddingVertical: 4, paddingHorizontal: 8 }}
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
			>
				<FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
			</TouchableOpacity>
		</View>
	)
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity
			style={{ paddingVertical: 4, paddingHorizontal: 2 }}
			activeOpacity={0.7}
			onPress={() => TrackPlayer.skipToNext()}
		>
			<FontAwesome6 name="forward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	const handleSkipToPrevious = () => {
		TrackPlayer.skipToPrevious()
	}
	return (
		<TouchableOpacity
			style={{ paddingVertical: 4, paddingHorizontal: 2 }}
			activeOpacity={0.7}
			onPress={handleSkipToPrevious}
		>
			<FontAwesome6 name="backward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
})
