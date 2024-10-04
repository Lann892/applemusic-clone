import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import library from '@/assets/data/library.json'
import { useMemo } from 'react'
import { unknownTrackImageUri } from '@/constants/images'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavorite: (track) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						rating: currentTrack.rating === 1 ? 0 : 1,
					}
				}

				return currentTrack
			}),
		})),
	addToPlaylist: (track, playlistName) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						playlist: [...(currentTrack.playlist ?? []), playlistName],
					}
				}

				return currentTrack
			}),
		})),
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const favorites = useMemo(() => tracks.filter((track) => track.rating === 1), [tracks])
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return {
		favorites,
		toggleTrackFavorite,
	}
}

export const useArtists = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const artists = useMemo(() => {
		const artists = new Map<string, Artist>()

		tracks.forEach((track) => {
			const artistName = track.artist ?? 'Unknown'
			const artist = artists.get(artistName)

			if (artist) {
				artist.tracks.push(track)
			} else {
				const artistName = track.artist ?? 'Unknown'
				artists.set(artistName, {
					name: artistName,
					tracks: [track],
				})
			}
		})

		return Array.from(artists.values())
	}, [tracks])

	return artists
}

export const usePlaylists = () => {
	const tracks = useLibraryStore((state) => state.tracks)

	const playlists = useMemo(() => {
		const playlists = new Map<string, Playlist>()

		tracks.forEach((track) =>
			(track.playlist ?? []).forEach((playlistName) => {
				const playlist = playlists.get(playlistName)

				if (playlist) {
					playlist.tracks.push(track)
				} else {
					playlists.set(playlistName, {
						name: playlistName,
						tracks: [track],
						artworkPreview: track.artwork ?? unknownTrackImageUri,
					})
				}
			}),
		)

		return Array.from(playlists.values())
	}, [tracks])

	return { playlists, addToPlaylist: useLibraryStore.getState().addToPlaylist }
}
