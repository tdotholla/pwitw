

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

export function getUniqueSum(arr, comp) {
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

export const GEOCENTER = {'lat':  39.8283, 'lng': -98.5795};