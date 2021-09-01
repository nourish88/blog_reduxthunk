import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash";
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts()); //actioncreator in an action createor
  const userIds = _.uniq(_.map(getState().posts, "userId")); //unique olarak userIdleri getirir.
  userIds.forEach(id => dispatch(fetchUser(id)));
  // yukarıdaki ile birebir aynı
  // _.chain(getState().posts)
  //   .map("userId")
  //   .uniq()
  //   .forEach(id => dispatch(fetchUser(id)))
  //   .value();
};
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};
//thunk call

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

// memoizingi kullanabilmek için 100 kere gitmeyelim user için dedi
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
