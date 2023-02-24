import profileReducer, {addPostActionCreator} from "./profile-reducer";

it('new post should be added', () => {
    let state = {
        posts: [],
        profile: null,
        status: '',
    }
    let action = addPostActionCreator('super puper post')
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1)
    expect(newState.posts[0].message).toBe('super puper post')
    expect(newState.posts[0].like_cnt).toBe(0)
});
