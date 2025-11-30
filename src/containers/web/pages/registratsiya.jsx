import React, { Component } from 'react';
import Navbar from './Navbar';

class Registratsiya extends Component {
	state = {  }
	render() { 
		return ( 
			<React.Fragment>
				<Navbar/>
					<div className="switchs">
						<h2>SAlom registraion</h2>
					</div>
			</React.Fragment>
		 );
	}
}
 
export default Registratsiya;