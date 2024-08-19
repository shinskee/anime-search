import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: 1,
    episode: '',
    quality: '',
    search: '',
    year: '',
    genres: [],
    currentPage: '',
    itemPerPage: 20,
    type: '',
}

export const currentQuerySlice = createSlice({
  name: 'currentQuerySlice',
  initialState,
  reducers: {
    changeId: (state, action) => {
      state.id = action.payload
    },
    changeEpisode: (state, action) => {
      state.episode = action.payload
    },
    changeQuality: (state, action) => {
      state.quality = action.payload
    },
    searchAnime: (state, action) => ({
      ...state,
      ...action.payload
    }),
    resetQuery: () => ({
      ...initialState
    }),
    genresChecked: (state, action) => {
        state.genres = action.payload
    },
  },
})

export const { changeId, changeEpisode, changeQuality, searchAnime, resetQuery, genresChecked } = currentQuerySlice.actions

export default currentQuerySlice.reducer