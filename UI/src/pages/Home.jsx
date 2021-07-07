 
import Navbar from '../components/navbar'
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
            <Navbar />
            <div className="container">
            <Sidebar className="side" />
            <Feed/>
            <Rightbar className="right" />
                   </div>
             </>
    )
}

export default Home;
