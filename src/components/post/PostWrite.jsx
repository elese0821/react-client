import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PostImage from './PostImage';
import { useSelector } from 'react-redux';

const PostWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    let navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user.accessToken) {
            alert("로그인한 회원만 작성이 가능합니다.");
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("내용을 채워주세요!");
        }

        let body = {
            title: title,
            content: content,
            image: image,
            uid: user.uid,
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/post/write`, body)
            .then((resopnse) => {
                if (resopnse.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    navigate("/list");
                } else {
                    alert("글 작성이 실패하였습니다.");
                }
            })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Write</h3>
                <p>글을 작성하시겠습니까?😁</p>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className="blind">글쓰기 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required blind">글 제목</label>
                        <input
                            type="text"
                            id="youName"
                            placeholder='글 제목을 작성하세요!'
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youName" className="required blind">글 내용</label>
                        <textarea
                            type="text"
                            id="youName"
                            placeholder='글 내용을 작성하세요!'
                            value={content}
                            onChange={(e) => setContent(e.currentTarget.value)}
                        />
                    </div>

                    <PostImage setImage={setImage} />

                    <button
                        type="submit"
                        className="btn__style2 mt30"
                        onClick={(e) => onSubmit(e)}>글쓰기</button>
                </fieldset>
            </form>
        </div>
    )
}

export default PostWrite