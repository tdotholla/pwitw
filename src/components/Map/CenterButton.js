 import React, { Component } from 'react';
 
 export class CenterButton extends Component {
 	render() {
 		return (
 			<div>
	 			<div id="centerButton_div">
					<button id="centerButton_button" class="btn-floating btn tooltipped waves-effect waves-dark animated" tabindex="2" data-position="left" data-delay="50" data-tooltip="Use Your Location!" aria-label="Locate"><i class="material-icons ">my_location</i></button>
				</div>

			  <div class="tap-target" data-activates="centerButton_button">
			    <div class="tap-target-content">
			      <h5>Use Your Location!</h5>
			      <p>Find the Closest Listings Using Your Device's Location.</p>
			    </div>
			  </div>
		  </div>
 		);
 	}
 }


targetClient = function(map,pos) {
  // SET CENTER, 
  // ZOOM TO CERTAIN LEVEL
    map.instance.panTo(pos);
    google.maps.event.trigger(map, 'resize');
    map.instance.setZoom(12);
};