import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

export const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({ title, body: content, userId, }),);
                setTitle('');
                setContent('');
                setUserId('');
                navigate('/');
            } catch (error) {
                console.error('Failed to save the post: ', error);
            } finally {
                setAddRequestStatus('idle');
            }
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <div className="container-fluid">
            <div className="row g-3">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <section className='form-wrapper'>
                        <h2 className="Form-title mb-3">Add a New Post</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="postTitle">Post Title</label>
                                <input type="text" className="form-control" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} placeholder='Enter Post Title' />
                            </div>

                            <div className="form-group">
                                <label htmlFor="postAuthor">Author</label>
                                <select className="form-select" id="postAuthor" value={userId} onChange={onAuthorChanged}>
                                    <option selected value="">Select Author</option>
                                    {usersOptions}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="postContent">Description</label>
                                <textarea className="form-control" id="postContent" name="postContent" value={content} onChange={onContentChanged} rows="5" placeholder='Enter Description' />
                            </div>

                            <button type="button" onClick={onSavePostClicked} disabled={!canSave} className='btn btn-primary mt-3 blog-filled-button'>Save Post</button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AddPostForm;
