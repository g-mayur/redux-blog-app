import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data;
    } catch (error) {
        return error.message;
    }
});

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost) => {
        try {
            const response = await axios.post(POSTS_URL, initialPost);
            return response.data;
        } catch (error) {
            return error.message;
        }
    },
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (initialPost) => {
        const { id } = initialPost;
        try {
            const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
            return response.data;
        } catch (err) {
            return initialPost;
        }
    },
);

export const deletePost = createAsyncThunk('posts/deletePost', async (post) => {
    const postId = post.id;
    try {
        const response = await axios.delete(`${POSTS_URL}/${postId}`);
        if (response.status === 200) return post;
        return `${response?.status} : ${response?.statusText}}`;
    } catch (err) {
        return err.message;
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded: {
            reducer(state, action) {
                const { postId, reaction } = action.payload;
                const existingPost = state.posts.find(
                    (post) => post.id === postId,
                );
                if (existingPost) {
                    existingPost.reactions[reaction]++;
                }
            },
        },
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            let min = 1;
            const loadedPosts = action.payload.map((post) => {
                return {
                    ...post,
                    date: sub(new Date(), { minutes: min++ }).toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    },
                };
            });
            state.posts = state.posts.concat(loadedPosts);
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [addNewPost.fulfilled]: (state, action) => {
            const sortedPosts = state.posts.sort((a, b) => {
                if (a.id > b.id) return 1;
                if (a.id < b.id) return -1;
                return 0;
            });

            action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;

            action.payload.userId = parseInt(action.payload.userId);
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
            };

            state.posts.push(action.payload);
        },
        [updatePost.fulfilled]: (state, action) => {
            if (!action.payload?.id) {
                console.log('update post could not be completed');
                console.log(action.payload);
                return;
            }
            const { id } = action.payload;
            action.payload.date = new Date().toISOString();
            const posts = state.posts.filter((post) => post.id !== id);
            state.posts = [...posts, action.payload];
        },
        [deletePost.fulfilled]: (state, action) => {
            if (!action.payload?.id) {
                console.log('delete post could not be completed');
                console.log(action.payload);
                return;
            }
            const { id } = action.payload;
            const posts = state.posts.filter((post) => post.id !== id);
            state.posts = posts;
        },
    },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) =>
    state.posts.posts.find((post) => post.id === postId);

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
