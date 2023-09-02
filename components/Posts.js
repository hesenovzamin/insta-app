import { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

const posts = [
    {
        id: '123',
        username: 'za1000',
        userImg: 'https://scontent.fgyd12-1.fna.fbcdn.net/v/t39.30808-6/323785219_1233356777619632_8709504189519422688_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=tpOxtn7pqYMAX8Y97P_&_nc_ht=scontent.fgyd12-1.fna&oh=00_AfBxx1VzK-Oyh88hxBhSSYpS-NYnuYGQzoDsXPWnXqQmAQ&oe=64F10506',
        img: 'https://scontent.fgyd12-1.fna.fbcdn.net/v/t39.30808-6/323785219_1233356777619632_8709504189519422688_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=tpOxtn7pqYMAX8Y97P_&_nc_ht=scontent.fgyd12-1.fna&oh=00_AfBxx1VzK-Oyh88hxBhSSYpS-NYnuYGQzoDsXPWnXqQmAQ&oe=64F10506',
        caption: 'Artiq yazma oglum '
    },

        {
        id: '1234',
        username: 'za1000',
        userImg: 'https://scontent.fgyd12-1.fna.fbcdn.net/v/t39.30808-6/323785219_1233356777619632_8709504189519422688_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=tpOxtn7pqYMAX8Y97P_&_nc_ht=scontent.fgyd12-1.fna&oh=00_AfBxx1VzK-Oyh88hxBhSSYpS-NYnuYGQzoDsXPWnXqQmAQ&oe=64F10506',
        img: 'https://scontent.fgyd12-1.fna.fbcdn.net/v/t39.30808-6/323785219_1233356777619632_8709504189519422688_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=tpOxtn7pqYMAX8Y97P_&_nc_ht=scontent.fgyd12-1.fna&oh=00_AfBxx1VzK-Oyh88hxBhSSYpS-NYnuYGQzoDsXPWnXqQmAQ&oe=64F10506',
        caption: 'Artiq yazma oglum '
    }


]

function Posts(props) {

    const [posts,setPosts] = useState([])

    useEffect(() => 

           onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),
            (snapshot) => {
            setPosts(snapshot.docs)
        })

    ,[db])

        console.log(posts[0]?.data(),44)
    return (
        <div>
           {posts.map((post) => (
                 <Post key={post.id} id={post.id}
                 username={post.data().username}
                 userImg={post.data().profileImg}
                 img={post.data().image}
                 caption={post.data().caption}  
                />
           ))}
        </div>
    )
}

export default Posts;