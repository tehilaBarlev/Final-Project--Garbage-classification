import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillSetting } from "react-icons/ai";
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import './App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > svg': {
            margin: theme.spacing(2),
        },
    },
}));

function Icon(props) {
    return (
        <LockRoundedIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </LockRoundedIcon>
    );
}




function Nave() {
    const classes = useStyles();
    return (

        
        // <Navbar expand="lg" bg="dark" variant="dark">
        //     <Icon style={{ color: green[500] }} />
        //     <Navbar.Brand href="#">Smart Lock</Navbar.Brand>
        //     <Nav className="mr-auto">
        //         <Nav.Link href="#home">ניהול משתמשים</Nav.Link>
        //         <Nav.Link href="#features">הוספת משתמש</Nav.Link>
        //         <Nav.Link href="#pricing">הסטוריה כניסות</Nav.Link>

        //     </Nav>
        //     <NavDropdown title="החשבון שלי" id="basic-nav-dropdown" expand="lg" bg="dark" variant="dark">
        //         <NavDropdown.Item href="#action/3.1">פתיחה מרחוק</NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //         <NavDropdown.Divider />
        //         <NavDropdown.Item href="#action/3.4">פרטים אישיים</NavDropdown.Item>
        //     </NavDropdown>

        //     {/* <Button variant="outline-info">Search</Button> */}

        //     <AccountCircleIcon />
        // </Navbar>

    )

}
export default Nave;