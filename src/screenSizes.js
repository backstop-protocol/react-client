// defaults to desktop 
// mobile is not supprted for now

const size = {
    largeLaptop: '1600px',
    laptop: '1366px'
}

export const device = {
    largeLaptop: `screen and (max-width: ${size.largeLaptop})`,
    laptop: `screen and (max-width: ${size.laptop})`,
}

