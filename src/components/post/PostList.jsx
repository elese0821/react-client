import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from "react-avatar";

const PostList = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/post/list`)
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <div className='login__header'>
                <h3>List</h3>
                <p>게시글</p>
            </div>

            <div className='list__wrap'>
                {postList.map((post, key) => {
                    console.log(post)
                    return (
                        <div className='list' key={key}>
                            <span className='cate'>교육</span>
                            <h3 className='title'>
                                <Link to={`/detail/${post.postNum}`}>{post.title}</Link>
                            </h3>
                            <p className='desc'>{post.content}</p>
                            <div className='auth'>
                                <Avatar
                                    size="30"
                                    round={true}
                                    src={post.author.photoURL}
                                />
                                {post.author.displayName}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PostList