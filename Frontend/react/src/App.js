
import './App.css';
import React, { useEffect, useState } from "react";
import AddUser from './com/AddUser';
import RemoveUser from './com/RemoveUser'
import GarbageClassification from './com/GarbageClassification'
import Login from './com/Login'
import Odot from './com/Odot'
import History from './com/History'
import ResultCard from './com/Result';
import 'react-html5-camera-photo/build/css/index.css';
import Nav from 'rsuite/Nav'
import PublicIcon from '@material-ui/icons/Public';
import { Gear } from '@rsuite/icons';
import "rsuite/dist/rsuite.min.css"
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import ImageForm from './com/ImageForm'
import Speech from './com/Speech'
import { makeStyles } from '@material-ui/core/styles';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import NavigationIcon from '@material-ui/icons/Navigation';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
}));

// const history = useHistory();
function App(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const [flag, setFlag] = useState(false);
  const [type, setType] = useState("");
  const [nav, setNav] = useState("a");
  const [image, setImage] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    const data = Axios.get(`http://127.0.0.1:5000/loadDB`);
  },[])
  return (
    <div >
      <Router >
        <div>
          <Nav id="nav">
            <h3> Green world <PublicIcon  style={{ color: "white", fontSize: 30 }}/></h3>        
            <div className="nav-center">
            <Nav.Item ><Link to="/GarbageClassification" >סיווג אשפה</Link></Nav.Item>
            <Nav.Item ><Link to="/AddUser"  >הוספת משתמש</Link></Nav.Item>
            <Nav.Item ><Link to="/RemoveUser"  >הסרת משתמש</Link></Nav.Item>
            <Nav.Item ><Link to="/History">לוח הבקרה</Link></Nav.Item>
            <Nav.Item ><Link to="/">אודות</Link></Nav.Item>
            </div>
          </Nav>
        </div>
        <div id="margin"></div>
        <Route path="/" exact ><Odot /></Route>
        <Route path="/AddUser"><AddUser title={"צלם משתמש"} flag={flag} setFlag={setFlag} nav={nav} /></Route>
        <Route path="/RemoveUser"><RemoveUser title={"צלם משתמש"} flag={flag} setFlag={setFlag} nav={nav} /></Route>
        <Route path="/GarbageClassification"><GarbageClassification flag={flag} setFlag={setFlag} /></Route>
        <Route path="/History"><History /></Route>
      </Router>
    </div>
  )
}
export default App;