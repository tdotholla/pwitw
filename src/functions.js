

export const isHome = (ip) => {
  let base = ip.split('.')[0]
  let octet = ip.split('.')[1]
  // const home_octets = ["106","108","111","114","115","116","117","118", "123","125","126", "129", "112", "124", "100","101","102", "103","105", "109", "126", "150","254"]
  // if (base === "10" && home_octets.includes(octet)) {return true}
  if (base === "10" && octet >= 100 && octet < 255 ) {return true}
  return false
}

export function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export function panToMarker(map,pos) {
  // SET CENTER, 
  // ZOOM TO CERTAIN LEVEL
    map.setCenter(pos);
    map.panTo(pos);
    map.setZoom(11);
};

export function getUnique(arr, comp) {
  //get unique keys from array,
  const unique = arr
    .map(e => e[comp])
     // store the keys of the unique objects
    // .map((e, i, final) => e)
    // eliminate the dead keys & store unique objects
    .filter((v, i, self) => self.indexOf(v) === i).sort()
    .map(e => arr.filter(x => x[comp] === e ) )
    return unique.map((e,i) => ({"name": e[0][comp], "value": e.length}) )
}

export function interpol() {

/**
 * TODO - refactor this as a (jQuery?) plugin!
**/

// Converts a #ffffff hex string into an [r,g,b] array
var h2r = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
  ] : null;
};

// Inverse of the above
var r2h = function(rgb) {
  return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
};

// Interpolates two [r,g,b] colors and returns an [r,g,b] of the result
// Taken from the awesome ROT.js roguelike dev library at
// https://github.com/ondras/rot.js
var _interpolateColor = function(color1, color2, factor) {
if (arguments.length < 3) { factor = 0.5; }
var result = color1.slice();
for (var i=0;i<3;i++) {
  result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
}
return result;
};

var rgb2hsl = function(color) {
var r = color[0]/255;
var g = color[1]/255;
var b = color[2]/255;

var max = Math.max(r, g, b), min = Math.min(r, g, b);
var h, s, l = (max + min) / 2;

if (max == min) {
  h = s = 0; // achromatic
} else {
  var d = max - min;
  s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
  switch(max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
  }
  h /= 6;
}

return [h, s, l];
};

var hsl2rgb = function(color) {
var l = color[2];

if (color[1] == 0) {
  l = Math.round(l*255);
  return [l, l, l];
} else {
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  var s = color[1];
  var q = (l < 0.5 ? l * (1 + s) : l + s - l * s);
  var p = 2 * l - q;
  var r = hue2rgb(p, q, color[0] + 1/3);
  var g = hue2rgb(p, q, color[0]);
  var b = hue2rgb(p, q, color[0] - 1/3);
  return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
}
};

var _interpolateHSL = function(color1, color2, factor) {
if (arguments.length < 3) { factor = 0.5; }
var hsl1 = rgb2hsl(color1);
var hsl2 = rgb2hsl(color2);
for (var i=0;i<3;i++) {
  hsl1[i] += factor*(hsl2[i]-hsl1[i]);
}
return hsl2rgb(hsl1);
};


(function($) {

var $list = $('#list'),
    $start = $('#start'),
    $end = $('#end'),
    $intype = $('input[name="intype"]'),
    $usehex = $('#usehex');

// Add li elements between the start and end ones


// Color each li by interpolating between the start and end colors
var _styleSteps = function(array) {
  
      scol = rgb(123,153,123,1),
      ecol = rgb(23,53,23,1);
  var fn = '_' + $('input[name="intype"]:checked').val();
  
  console.log('fn', fn);

  var factorStep = 1 / (array.length - 1);
  array.each(function(idx) {
    var icol = window[fn](scol, ecol, factorStep * idx),
        hcol = r2h(icol);

    $(this).css('background-color', hcol);
    $(this).find('span').text(hcol);
  });

}

}

export const GEOCENTER = {'lat':  39.8283, 'lng': -98.5795};