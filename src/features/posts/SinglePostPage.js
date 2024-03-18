import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { HiArrowSmLeft } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";

const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <div className="container-fluid">
                <div className="row g-3">
                    <section className='text-center not-found d-flex align-items-center justify-content-center'>
                        <h2 className='mb-0'>No Post Found</h2>
                    </section>
                </div>
            </div>
        );
    }

    const repeatedBody = Array.from({ length: 5 }, () => post.body);
    return (
        <div className="container-fluid">
            <div className="row g-3">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="hstack justify-content-between align-items-center flex-wrap w-100 gap-3 my-3">
                        <Link to='/' className='backNavigation d-flex align-items-center gap-2'>
                            <HiArrowSmLeft size={32} /> View Post
                        </Link>
                    </div>
                    <div className='article details d-flex flex-column p-3 shadow-sm bg-white rounded'>
                        <h2 className='mb-0 blog-title'>{post.title}</h2>
                        <div className='author-time d-flex flex-column'>
                            <PostAuthor userId={post.userId} />
                            <TimeAgo timestamp={post.date} />
                        </div>
                        <p className='blog-description'>{repeatedBody}</p>
                        <ReactionButtons post={post} />

                        <div className="postCredit d-flex mt-3 align-items-center justify-content-end gap-3">
                            <Link to='/' className='btn btn-primary blog-filled-button ml-auto d-flex justify-content-center  align-items-center gap-2'>
                                <IoIosSave size={20} /> Save
                            </Link>
                            <Link to={`/post/edit/${post.id}`} className='btn btn-primary delete blog-filled-button ml-auto d-flex justify-content-center  align-items-center gap-2'>
                                <FaPencilAlt /> Edit
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;
