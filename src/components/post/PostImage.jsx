import React from 'react'
import axios from 'axios'

const PostImage = (props) => {

    const FileUpload = (e) => {
        const formData = new FormData();
        formData.append("file", (e.target.files[0]));

        axios
            .post(`${process.env.REACT_APP_API_URL}/api/post/image/upload`, formData)
            .then((response) => {
                console.log(response);
                props.setImage(response.data.filePath);
            })
    }

    return (
        <div>
            <input
                type="file"
                accept='image/*'
                onChange={(e) => FileUpload(e)}
            />
        </div>
    )
}

export default PostImage