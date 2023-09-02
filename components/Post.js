import { db } from '@/firebase';
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    DotsHorizontalIcon,
    ChatIcon,
    BookmarkIcon,
    EmojiHappyIcon
} from '@heroicons/react/outline';

import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { addDoc, collection, serverTimestamp, onSnapshot, orderBy, query, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';

function Post(props) {


    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() =>

        onSnapshot(query(collection(db, 'posts', props.id, 'comments'), orderBy('timestamp', 'desc')),
            (snapshot) => {
                setComments(snapshot.docs)
            })

        , [db, props.id])

    useEffect(() =>

        onSnapshot(query(collection(db, 'posts', props.id, 'likes')),
            (snapshot) => {
                setLikes(snapshot.docs)
            })

        , [db, props.id])

    useEffect(
        () =>
        setHasLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        )
      
        
        , [likes]
    )

   

    const likePost = async () => {
        
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', props.id, 'likes', session.user.uid));
        }
        else {
            await setDoc(doc(db, 'posts', props.id, 'likes', session.user.uid), {
                username: session.user.username,
            })
        }
    }

    console.log(likes,session?.user?.uid,props.id)

    const sendComment = async (e) => {
        e.preventDefault();

        const comentToSend = comment;
        setComment("");

        await addDoc(collection(db, 'posts', props.id, 'comments'), {
            comment: comentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }


    return (
        <div className='bg-white my-7 border rounded-sm'>
            {/* Header */}
            <div className='flex item-center p-3'>
                <img className='rounded-full h-12 w-12 object-contain border p-1 mr-3' src={props.userImg} alt='' />
                <p className='flex-1 mt-2 font-bold'>{props.username}</p>
                <DotsHorizontalIcon className='h-5 cursor-pointer mt-3' />
            </div>
            {/* img */}
            <img src={props.img} className='object-cover w-full' />
            {/* button */}
            {session && (
                <div className='flex justify-between px-4 pt-4'>
                    <div className='flex space-x-4'>
                        {hasLiked ? (
                             <HeartIconFilled onClick={likePost} className='btn text-red-500' />
                        ) : (
                             <HeartIcon onClick={likePost} className='btn' />
                        )}
                       
                        <ChatIcon className='btn' />
                        <PaperAirplaneIcon className='btn rotate-45' />
                    </div>
                    <BookmarkIcon className='btn' />
                </div>
            )}

            {/* caption */}
            <p className='p-5 truncate'>
                {likes.length > 0 && (
                    <p className='font-bold mb-1'>{likes.length} likes</p>
                )}
                <span className='font-bold mr-1'>{props.username}</span>
                {props.caption}
            </p>

            {/* comment */}
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comments.map(comment => (
                        <div key={comment.id} className='flex items-center space-x-3 mb-3'>
                            <img
                                className='h-7 rounded-full'
                                src={comment.data().userImage}
                            />
                            <p className='text-sm flex-1'>
                                <span className='font-bold mr-2'>{comment.data().username}</span>
                                {comment.data().comment}
                            </p>
                            <Moment fromNow className='pr-5 text-xs'>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}
            {/* inputbox */}
            {session && (
                <form className='flex items-center p-4 '>
                    <EmojiHappyIcon className='h-7' />
                    <input
                        type='text'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className='border-none flex-1 outline-none focus:ring-0'
                        placeholder='Add a comment' />
                    <button disabled={!comment.trim()} onClick={sendComment} type='submit' className='font-semibold text-blue-400'>Post</button>
                </form>
            )}
        </div>
    )
}

export default Post;