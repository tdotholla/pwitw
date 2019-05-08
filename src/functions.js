

export const isHome = (ip) => {
  const home_octets = ["117", "126", "112", "124", "108", "101", "103", "111", "109", "126", "150"]
  let base = ip.split('.')[0]
  let octet = ip.split('.')[1]
  if (base === "10" && home_octets.includes(octet)) {return true}
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