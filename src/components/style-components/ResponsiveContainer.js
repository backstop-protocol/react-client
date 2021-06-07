import styled from "styled-components"
import {device} from "../../screenSizes";

const ResponsiveWidthCol = styled.div`
    width: 610px;
    margin: 20px;
    @media ${device.largeLaptop} {
        width: 550px;
        margin: 10px;
    }
    @media ${device.laptop} {
        width: 450px;
    }
    @media ${device.tablet} {
        max-width: 610px;
        width: calc(100vw - 20px)
    }
`

export const ResponsiveWidthHeader = styled.div`
    max-width: ${610 * 2 + 40}px;
    @media ${device.largeLaptop} {
        max-width: ${560 * 2 + 40}px;
    }
    @media ${device.laptop} {
        max-width: ${498 * 2 + 40}px;
        padding: 0 5px;
    }
    @media ${device.tablet} {
        padding: 0 15px;
    }
`

export const HeaderItemContainer = styled.div`
    width: 50%;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 570px;
    min-height: 322px;
    @media ${device.largeLaptop} {
        padding: 0 10px;
        min-width: 430px;    
        min-height: 257px;
    }
    @media ${device.laptop} {
        padding: 0 10px;
        min-width: 400px;    
        min-height: 200px;
    }
    @media ${device.tablet} {
        padding: 0 10px;
        min-width: 390px;    
        min-height: 200px;
    }
    @media ${device.mobile} {
        padding: 0 10px;
        min-width: 360px;    
        min-height: 200px;
    }

`

export default ResponsiveWidthCol