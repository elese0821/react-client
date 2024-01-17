import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RepleContent from './RepleContent';

const RepleList = (props) => {
    const [repleList, setRepleList] = useState([]);

    useEffect(() => {
        let body = {
            postId: props.postId,
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/reple/getReple`, body).then((response) => {
            if (response.data.success) {
                setRepleList([...response.data.repleList])
            }
        })
    }, [props.postId])

    return (
        <div>
            {repleList.map((reple, idx) => {
                return (
                    <RepleContent reple={reple} key={idx} />
                )
            })}
        </div>
    )
}

export default RepleList