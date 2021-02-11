import { ApiEndPoint } from './Env';
import { react } from "react";

const PostTodo = async () => {
    console.log("click");
    try {
        const url = ``
        const postData = await fetch (`${ApiEndPoint}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })

        const parseData = await postData.json()
        console.log("post" + parseData.status);
    } catch (error) {
        
    }
}

export { PostTodo };