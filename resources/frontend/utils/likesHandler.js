import axios from "axios";

export default function likesHandler(likes, setLikes, slug) {
    if(likes.indexOf(slug) > -1){
        const newLikes = [...likes];
        newLikes.splice(likes.indexOf(slug), 1);
        setLikes([...newLikes]);
        localStorage.setItem("likes", JSON.stringify([...newLikes]));
        axios.get(`/api/likes/${slug}/remove`)
            .then(response => {
                if(!response.data) {
                    console.error("Request Failed!");
                }
            })
    } else{
        setLikes([...likes, slug])
        localStorage.setItem("likes", JSON.stringify([...likes, slug]));
        axios.get(`/api/likes/${slug}/add`)
            .then(response => {
                if(!response.data) {
                    console.error("Request Failed!");
                }
            })
    }
}
