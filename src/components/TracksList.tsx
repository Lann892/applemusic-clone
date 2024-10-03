import { FlatList, FlatListProps, View, Text } from 'react-native'
import { TrackListItem } from './TrackListItem'
import { utilsStyles } from '../styles/index'
import TrackPlayer, { Track } from 'react-native-track-player'
import { Image } from 'expo-image'
import { unknownTrackImageUri } from '@/constants/images'

export type TrackListProps = Partial<FlatListProps<Track>> & {
	tracks: any[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ tracks, ...flatlistProps }: TrackListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 96 }}
			ListFooterComponent={tracks.length >= 1 ? ItemDivider : null}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No songs found</Text>

					<Image 
					source={{uri: unknownTrackImageUri}} style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}
