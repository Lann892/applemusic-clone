import { TracksList } from '@/components/TracksList'
import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import { screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/library'
import { trackTitleFilter } from '@/helpers/filter'
import { useMemo } from 'react'

const FavoriteScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search songs',
		},
	})

	const favoriteTracks = useFavorites().favorites

	const filteredFavoritesTracks = useMemo(() => {
		if (!search) return favoriteTracks

		return favoriteTracks.filter(trackTitleFilter(search))
	}, [search, favoriteTracks])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList tracks={filteredFavoritesTracks} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default FavoriteScreen
