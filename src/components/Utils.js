import { Dimensions, PixelRatio } from 'react-native';

let {width,height} = Dimensions.get('window')

const widthDp=number=>{
    let givenWidth = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width*givenWidth)/100);
}


const heightDp=number=>{
    let givenHeight = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((height*givenHeight)/100);
}

export {widthDp,heightDp};