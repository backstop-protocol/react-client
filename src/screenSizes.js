// defaults to desktop 
// mobile is not supprted for now

const size = {
    largeLaptop: 1600,
    laptop: 1366,
    tablet: 1023,
    mobile: 600,
}

export const device = {
    largeLaptop: `screen and (max-width: ${size.largeLaptop}px)`,
    laptop: `screen and (max-width: ${size.laptop}px)`,
    tablet: `screen and (max-width: ${size.tablet}px)`,
    mobile: `screen and (max-width: ${size.mobile}px)`,
}

export const isMobile = () => {
    const width = window.innerWidth
    if(width <= size.mobile) {
        return true
    }
}
