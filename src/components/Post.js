

export const Post = props => {
    
    return(
        <div>
            <p>{props.post.date}</p>
            <p>{props.post.text}</p>
        </div>
    )
}