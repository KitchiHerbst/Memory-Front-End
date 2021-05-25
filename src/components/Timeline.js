import {Post} from './Post'

export const Timeline = props => {
    // debugger
    // need to do some logic to sort the posts based on date?
    // need to also get the styling for the timeline to be an x axis
    // function sortedPosts(){
    //     return props.posts.sort((a,b) => a.date > b.date ? 1 : -1)
    // }
    return(
        <div>
            <h1>Timeline</h1>
            {props.posts.sort((a,b) => a.date > b.date ? 1 : -1).map(post => <Post post={post} />)}
        </div>
    )
}