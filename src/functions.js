

export const isHome = (ip) => {
  const home_octets = ["117", "126", "112", "124"]
  let octet = ip.split('.')[1]
  if (home_octets.includes(octet)) {return true}
  return false
}

