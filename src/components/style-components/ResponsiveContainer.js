import styled from "styled-components"
import {device} from "../../screenSizes";

const ResponsiveWidthCol = styled.div`
    width: 610px;
    @media ${device.largeLaptop} {
        width: 560px;
    }
    @media ${device.laptop} {
        width: 498px;
    }
    @media ${device.mobile} {
        width: 498px;
    }
`

export const ResponsiveWidthHeader = styled.div`
    width: ${610 * 2 + 40}px;
    max-width: ${610 * 2 + 40}px;
    @media ${device.largeLaptop} {
        width: ${560 * 2 + 40}px;
        max-width: ${560 * 2 + 40}px;
    }
    @media ${device.laptop} {
        width: ${498 * 2 + 40}px;
        max-width: ${498 * 2 + 40}px;
        padding: 0;
    }
    @media ${device.mobile} {
        width: ${498 + 40}px;
        max-width: ${498 + 40}px;
        padding: 0;
    }
`

export default ResponsiveWidthCol