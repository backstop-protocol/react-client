// defaults to desktop 
// mobile is not supprted for now

const size = {
    largeLaptop: 1600,
    laptop: 1366,
    mobile: 1023
}

export const device = {
    largeLaptop: `screen and (max-width: ${size.largeLaptop}px)`,
    laptop: `screen and (max-width: ${size.laptop}px)`,
    mobile: `screen and (max-width: ${size.mobile}px)`,
}

