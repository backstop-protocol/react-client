import styled from "styled-components"
import {device} from "../../screenSizes";

const ResponsiveWidthCol = styled.div`
    width: 610px;
    @media ${device.largeLaptop} {
        width: 560px;
    }
    @media ${device.laptop} {
        width: 470px;
    }
    @media ${device.mobile} {
        width: 400px;
    }
`

export const ResponsiveWidthHeader = styled.div`
    width: auto;
    max-width: ${610 * 2 + 40}px;
    @media ${device.largeLaptop} {
        max-width: ${560 * 2 + 40}px;
    }
    @media ${device.laptop} {
        max-width: ${470 * 2 + 40}px;
        padding: 0;
    }
    @media ${device.mobile} {
        max-width: ${400 *2 + 40}px;
        padding: 0;
    }
`

export default ResponsiveWidthCol