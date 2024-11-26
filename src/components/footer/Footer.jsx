import { Link} from 'react-router-dom';
import { List } from './icons/List';
import { Messages } from './icons/Messages';
import { Settings } from './icons/Settings';
import  { User } from './icons/User';
import './footer.css';
function Footer(permiton){
    //footer function which will be used as the navigation bar to different pages inside the app
    if(permiton['permition'] === "admin"){
        return(
            <div className="footer">
                    <div className='footnameBox'>
                        <Link to='/admin' className='footerButton'>
                            <User/>
                        </Link>
                        <Link to='/' className='footerButton'>
                            <Messages/>
                        </Link>
                        <Link to='/task' className='footerButton'>
                            <List/>
                        </Link>
                        <Link to='/settings' className='footerButton'>
                            <Settings/>
                        </Link>
                    </div>
                </div>
        )
    }else if(permiton['permition'] ==="Manager" || permiton['permition'] ==="Worker"){
        return(
            <div className="footer">
                    <div className='footnameBox'>
                        <Link to='/' className='footerButton'>
                            <Messages/>
                        </Link>
                        <Link to='/task' className='footerButton'>
                            <List/>
                        </Link>
                        <Link to='/settings' className='footerButton'>
                            <Settings/>
                        </Link>
                    </div>
                </div>
        )
    }
}
export default Footer