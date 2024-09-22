import { Link} from 'react-router-dom';
import { List } from './List';
import { Messages } from './Messages';
import { Settings } from './Settings';
function Footer(){
    //footer function which will be used as the navigation bar to different pages inside the app
    return(
        <div className="footer">
                <div className='footnameBox'>
                    <Link to='/' className='footerButton'>
                        <Messages/>
                    </Link>
                    <Link to='/' className='footerButton'>
                        <List/>
                    </Link>
                    <Link to='/' className='footerButton'>
                        <Settings/>
                    </Link>
                </div>
            </div>
    )
}
export default Footer