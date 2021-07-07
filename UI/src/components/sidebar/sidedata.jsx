import RssFeedSharpIcon from '@material-ui/icons/RssFeedSharp';
import CommentSharpIcon from '@material-ui/icons/CommentSharp';
import MovieSharpIcon from '@material-ui/icons/MovieSharp';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import BookmarkSharpIcon from '@material-ui/icons/BookmarkSharp';
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';
import WorkSharpIcon from '@material-ui/icons/WorkSharp';
import EventAvailableSharpIcon from '@material-ui/icons/EventAvailableSharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AnnouncementIcon from '@material-ui/icons/Announcement';
const sidedata = [
{
    title : "feed",
    icon : <RssFeedSharpIcon className="ICON"/>
},
{

    title : "Chats",
    icon : <CommentSharpIcon className="ICON"/>
},
{

    title : "Videos",
    icon : <MovieSharpIcon className="ICON"/>
},
{

    title : "Groups",
    icon: <PeopleSharpIcon className="ICON"/>,

},
{

    title: "Bookmarks",
    icon: <BookmarkSharpIcon className="ICON"/>
}
,
{

    title : "Questions",
    icon : <QuestionAnswerSharpIcon className="ICON"/>
}
,
{

    title : "Jobs",
    icon: <WorkSharpIcon className="ICON"/>
}
,
{

    title : "Events",
    icon: <EventAvailableSharpIcon className="ICON"/>
    
}
,
{

    title : "Covid Information center",
    icon: <FavoriteIcon className="ICON"/>
}
,
{

    title : "News",
    icon: <AnnouncementIcon className="ICON"/>
} 


];

const friends =
[
    {name : "Ankur", profile : "/assets/profile/b.jpg"},
    {name : "Akshita", profile : "/assets/profile/c.jpg"},
    {name : "Raj", profile : "/assets/profile/d.jpg"},
    {name : "Santosh", profile : "/assets/profile/h.jpg"},
    {name : "Rakesh", profile : "/assets/profile/f.jpg"},
    {name : "Naman", profile : "/assets/profile/g.jpg"},
    {name : "Oliv", profile : "/assets/profile/i.jpg"},
    
]

export {sidedata, friends};