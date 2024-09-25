import React, { useCallback, useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet,Image } from 'react-native';

const Card = ({data, onPress }) => {
    const [focus, setFocus] = useState(false);
    
    const onFocus = useCallback(() => {
        console.log("onFocus");
        setFocus(true);
    }, []);

    const onBlur = useCallback(() => {
        setFocus(false);
    }, []);


    function settingIconButton(data) {
        if(data.name=="NetworkActivity"){return <Image source={require("../images/network-icon.png")} style={{alignSelf:"center",width: 70,height: 58,padding:20, marginBottom:10}} />}
        if(data.name=="AboutActivity") return <Image source={require("../images/about-icon.png")} style={{alignSelf:"center",width: 58,height: 58,padding:20,marginBottom:10}} /> 
        if(data.name=="GoBack"){return <Image source={require("../images/back-icon-1.png")} style={styles.icon} />;}    
    }

    return (
        <View style={styles.card}>
            <TouchableHighlight onFocus={onFocus} onBlur={onBlur} style={[styles.wrapper, focus ? styles.wrapperFocused : null]} onPress={(e) => onPress(data?.packageName)}>
                <View style={styles.wrapper}>
                    {data.type!=="setting"?<Image source={{ uri: `data:image/png;base64,${data.icon}` }} style={styles.icon} />:settingIconButton(data)}
                    <Text style={styles.settingText}>{data?.name}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
    
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 0,
        elevation: 0,
        // marginTop:0,
        // backgroundColor: "blue",
        margin: 10,
        // padding:10
    },
    wrapper: {
        borderColor: 'transparent',
        // backgroundColor:"black",
        borderWidth: 3,
        borderRadius: 10,
        // width:10
        // color:"#f0f"x
        // padding:10
    },
    wrapperFocused: {
        borderColor: '#fbcc35',
        padding: 5
    },
    settingText: {
        color: '#fff',
        fontSize: 18,
        alignSelf:"center",
    },
    icon: {
        // alignItems:"center",
        // textAlign:"center",
        alignSelf:"center",
        // marginLeft:2,
        width: 75,
        height: 48,
        padding:30,
        marginBottom:10
    },
});

export default Card;
