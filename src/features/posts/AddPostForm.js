import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowSmLeft } from 'react-icons/hi';
import { IoIosSave } from 'react-icons/io';

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
                    <Link to='/' className='backNavigation mt-3 d-flex align-items-center gap-2'>
                        <HiArrowSmLeft size={32} />Add New Post
                    </Link>
                    <section className='article form-wrapper p-3 shadow-sm bg-white rounded'>
                        <form>
                            <div className="form-group mb-2">
                                <label htmlFor="postTitle">Post Title</label>
                                <input type="text" className="form-control" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} placeholder='Enter Post Title' autoComplete='off' />
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="postAuthor">Author</label>
                                <select className="form-select" id="postAuthor" value={userId} onChange={onAuthorChanged}>
                                    {usersOptions}
                                </select>
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="postContent">Description</label>
                                <textarea className="form-control" id="postContent" name="postContent" value={content} onChange={onContentChanged} rows="5" placeholder='Enter Description' autoComplete='off' />
                            </div>

                            <div className="hstack gap-3 justify-content-end">
                                <button type="button" onClick={onSavePostClicked} disabled={!canSave} className='btn btn-primary mt-3 blog-filled-button d-flex justify-content-center align-items-center gap-2'><IoIosSave size={22} /> Save Post</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AddPostForm;
