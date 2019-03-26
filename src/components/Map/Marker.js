import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  // width: 18,
  // height: 18,
  // backgroundColor:"#000",
  // border: "2px solid #fff",
  // borderRadius: "100%",
  userSelect: "none",
  transform: "translate(-50%, -50%)",
  cursor: `${props => (props.onClick ? "pointer" : "default")}`,
  // zIndex: 1
};

const Marker = ({ ...props }) => {
  return (
    <div
      className="App-marker"
      alt={props.text}
      {...(props.onClick ? { onClick: props.onClick } : {})}>
      <img
        height="25px"
        width="25px"
        src="http://www.orbitinformatics.com/wp-content/uploads/2016/11/fa18fbc911311b5371870c880fa5f75a-location-pin-by-vexels.png"
        alt="venue"
      />
    </div>
  );
};

Marker.defaultProps = {
  onClick: null,
};

// Marker.propTypes = {
//   onClick: PropTypes.func,
//   text: PropTypes.string.isRequired,
// };

export default Marker;
