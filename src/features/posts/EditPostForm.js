import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost, deletePost } from './postsSlice';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/usersSlice';

const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    if (!post) {
        return (
            <div className="container-fluid">
                <div className="row g-3">
                    <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <section className='text-center not-found d-flex align-items-center justify-content-center'>
                            <h2>No Post Found</h2>
                        </section>
                    </div>
                </div>
            </div>
        );
    }

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(Number(e.target.value));

    const canSave =
        [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending');
                dispatch(
                    updatePost({
                        id: post.id,
                        title,
                        body: content,
                        userId,
                        reactions: post.reactions,
                    }),
                ).unwrap();

                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${postId}`);
            } catch (err) {
                console.error('Failed to save the post', err);
            } finally {
                setRequestStatus('idle');
            }
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending');
            dispatch(deletePost({ id: post.id })).unwrap();

            setTitle('');
            setContent('');
            setUserId('');

            navigate('/');
        } catch (err) {
            console.error('Failed to delete the post', err);
        } finally {
            setRequestStatus('idle');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row g-3">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <section className='article form-wrapper h-100 p-3 shadow-sm bg-white rounded'>
                        <h2 className="Form-title mb-3">Edit Post</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="postTitle">Post Title</label>
                                <input type="text" className="form-control" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} placeholder='Enter Post Title' autoComplete='off' />
                            </div>

                            <div className="form-group">
                                <label htmlFor="postAuthor">Author</label>
                                <select className="form-select" id="postAuthor" value={userId} onChange={onAuthorChanged}>
                                    {usersOptions}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="postContent">Description</label>
                                <textarea className="form-control" id="postContent" name="postContent" value={content} onChange={onContentChanged} rows="5" placeholder='Enter Description' autoComplete='off' />
                            </div>

                            <button type="button" onClick={onSavePostClicked} disabled={!canSave} className='btn btn-primary mt-3 blog-filled-button'>Save Post</button>
                            <button type="button" className="btn btn-primary mt-3 blog-filled-button delete" onClick={onDeletePostClicked}>Delete Post</button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default EditPostForm;
