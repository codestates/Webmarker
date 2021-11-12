import Axios from "Axios";
import handleError from '../lib/errorHandling';

export const GET_BOOKMARK = 'GET_BOOKMARK';
export const GET_BOOKMARK_SUCCESS = 'GET_BOOKMARK_SUCCESS';
export const GET_BOOKMARK_FAIL = 'GET_BOOKMARK_FAIL';

export const getGuestBookmark = () => ({ type: GET_GUEST_BOOKMARK });

export const getBookmark = () => (dispatch) => {
	dispatch({ type: GET_BOOKMARK });

};
