import React, { Component } from 'react';
import { BrowserRouter, Route ,  Switch } from 'react-router-dom';

import Login from "./pages/Login"
import LoginStaff from "./pages/LoginStaff"
import Sidebar from "./pages/SidebarConsult"
import SideGlavny from "./pages/SideGlavny"
import SideUniverstitet from "./pages/SidebarUniverstitet"
import Fakultet from "./pages/Fakultet"
import SidebarFilial from "./pages/SidebarFilial"
import Talabalar from "./pages/Talabalar"
import SideStrana from "./pages/SideStrana"
import SidebarAgentlar from "./pages/SidebarAgentlar"
import Dagavori from "./pages/dagovori"
import SideOtdel from "./pages/SideOtdel"
import Analitika from "./pages/Analitika"
import Plateji from "./pages/Plateji"

class ConsultantBackoffice extends Component {
	state = { 
		burger: false
	 }
	 handleburger = () =>{
		this.setState({
			burger : !this.state.burger
		})
	}
	render() { 
		return ( 
			<React.Fragment>
				<Sidebar/>
			</React.Fragment>
		  );
	}
}
 
export default ConsultantBackoffice;