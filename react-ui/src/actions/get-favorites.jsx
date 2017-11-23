import axios from 'axios'

export const FETCH_FAVORITES = 'fetch_favorites'

export function fetchFavorites()
{
    //Makes a call to the api for all of the favorited articles in the
    //Database if the isFavorites attribute is set to true
    const REQUEST = AXIOS.get('/api/favorites')
 
    return {
        type: FETCH_FAVORITES,
        payload: REQUEST
    }
    
}