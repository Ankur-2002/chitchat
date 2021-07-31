 
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/sidebar'
import Rightbar from '../components/rightbar/rightbar'
import Feed from '../components/feed/feed';
import './home.css'
// import { useContext } from 'react';
// import { Context } from '../Context/Context';
function Home() {
    // const {user} = useContext(Context)
    return (
        <> 
            <Navbar key={'Navbar_from_home'}/>
            <div className="container">
            <Sidebar className="side" key={'Sidebar_from_home'}/>
            <Feed key={'feed_form_home'}/>
            <Rightbar className="right" key={'Right_bar_from_Home'} />
                   </div>
             </>
    )
}

export default Home;
