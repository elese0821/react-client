import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";
import firebase from "../../firebase.js";

const MyPage = () => {
    const [CurrentImage, setCurrentImage] = useState("");

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isLoading && !user.accessToken) {
            navigate("/login");
        } else {
            setCurrentImage(user.photoURL)
        }
    }, [user]);

    const ImageUpload = (e) => {
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        axios.post(`${process.env.REACT_APP_API_URL}/api/user/profile/img`, formData).then((response) => {
            setCurrentImage(response.data.filePath);
        });
    };

    const SaveProfile = async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().currentUser.updateProfile({
                photoURL: CurrentImage,
            });
        } catch (error) {
            return alert("프로필 저장에 실패하였습니다.");
        }
        let body = {
            photoURL: CurrentImage,
            uid: user.uid,
        };
        axios.post(`${process.env.REACT_APP_API_URL}/api/user/profile/update`, body).then((response) => {
            if (response.data.success) {
                alert("프로필 저장에 성공하였습니다.");
                window.location.reload();
            } else {
                return alert("프로필 저장에 실패하였습니다.");
            }
        });
    };


    return (
        <div>
            <form>
                <label>
                    <input type="file" accept='image/*' style={{ display: "none" }} onChange={(e) => ImageUpload(e)} />
                    <Avatar
                        size="100"
                        round={true}
                        src={CurrentImage}
                        style={{ border: "1px solid #c6c6c6", cursor: "pointer" }}
                    />
                    <button onClick={(e) => SaveProfile(e)}>저장</button>
                </label>

            </form>

        </div>
    )
}

export default MyPage