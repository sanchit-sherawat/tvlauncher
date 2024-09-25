import React, { useEffect, useState } from 'react';
import {  View, ScrollView, StyleSheet, NativeModules,Platform,Linking ,Button,ImageBackground } from 'react-native';
import { widthDp, heightDp } from '../components/Utils';
import Card from './Card'; // Make sure to adjust the path to where your Card component is located
import RNANAndroidSettingsLibrary from 'react-native-android-settings-library';

const allowedApps = [
    'com.rccll',
    'com.android.tv.settings',
    // 'com.android.tv',
    // 'com.android.tv.settings'
];


const settingsApp = [
  
            {
                "packageName": ".connectivity.NetworkActivity",
                "name": "NetworkActivity",
                "icon":'../images/network.png',
                "type":"setting"
            }, {
                "packageName": ".about.AboutActivity",
                "name": "AboutActivity",
                "icon":'../images/network.png',
                "type":"setting",
            },{
                "packageName": "GoBack",
                "name": "GoBack",
                "type":"setting",
                "icon":'../images/goback.png'
            }]



const android_tv = Platform.isTV;

const LauncherScreen = () => {
    const [installedApps, setInstalledApps] = useState([]);
    const [isBlockInstallation, setIsBlockInstallation] = useState(false);
    const [settingApps, setSettingApps]= useState(false)
    const {ADBModule}=NativeModules;
    const image = {uri: ""};    


    const password = "Text";

    const toggleBlockInstallation = () => {
        setIsBlockInstallation(!isBlockInstallation);
    };

    // const openNetworkSettings = () => {
    //     // The intent to open network settings
    //     NativeModules?.openNetworkSettings();
    //     const intent = 'com.android.tv.settings.about.AboutActivity';
    //     Linking.canOpenURL(`intent://${intent}`)
    //       .then((supported) => {
    //         if (supported) {
    //           return Linking.openURL(`intent://${intent}#Intent;end`);
    //         } else {
    //           console.log('Network settings cannot be opened');
    //         }
    //       })
    //       .catch((err) => console.error('An error occurred', err));
    //   };



    useEffect(() => {
        const fetchInstalledApps = async () => {
            try {
                // RNANAndroidSettingsLibrary.main();
                const apps1 = await NativeModules.LauncherModule.getInstalledAppsWithIcon();
                setInstalledApps(apps1.filter(app => allowedApps.includes(app.packageName)));
            } catch (error) {
                console.log('Failed to fetch installed apps', error);
            }
        };
        fetchInstalledApps();
    }, [settingApps]);

    const openApp = async (packageName) => {
        console.log(packageName,"packagename")
        if(packageName != "com.rccll"&&packageName!=".connectivity.NetworkActivity"!=packageName==".about.AboutActivity"){
            setSettingApps(!settingApps)
        }
        

        try {
            if(packageName=="com.android.tv.settings"){
                console.log(packageName , "into")
                // launchActivity
                // await NativeModules.LauncherModule.launchActivity(packageName);
                setSettingApps(!false)
                
            }else if(packageName=="GoBack"){setSettingApps(!true)
            }else if(packageName==".connectivity.NetworkActivity"){RNANAndroidSettingsLibrary.open('ACTION_WIFI_SETTINGS');
            }else if(packageName==".about.AboutActivity"){ RNANAndroidSettingsLibrary.open('ACTION_APPLICATION_DETAILS_SETTINGS');
            }else{
                console.log(packageName);
                // RNANAndroidSettingsLibrary.open('ACTION_WIFI_SETTINGS');
                // await NativeModules.LauncherModule.openAboutSettings()
                await NativeModules.LauncherModule.launchApp(packageName);
            // await NativeModules.LauncherModule.launchSettingsActivity("com.google.android.tv.overlay.wifi.resources");


            }
            
        } catch (error) {
            console.log("launch error: ", error);
        }
    };

    return (
        <View >
            <ImageBackground source={require('../images/image_2024_07_12T06_57_35_950Z.png')} resizeMode="cover" style={{width: '100%', height: '100%',alignSelf: 'center'}}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {
                !settingApps?installedApps.map((app, index) => (
                    <Card key={index+" "} data={app} onPress={openApp} />
                )):
                settingsApp.map((app, index) => (
                    <Card key={index+12} data={app} onPress={openApp} />
                ))
                }
              
            </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        display:"flex",
        marginTop: heightDp('3%'),
        paddingBottom: heightDp('7%'),
        flexDirection: 'row',
        alignItems:'flex-end',
        height:'100%',
        width:"100%"
    },
});

export default LauncherScreen;


// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { View, Text, Button, FlatList, NativeModules, RefreshControl, StyleSheet, BackHandler, TouchableHighlight, TextInput, Keyboard, TouchableOpacity, Platform } from 'react-native';
// // import Modal from "react-native-modal";
// import { useNavigation } from '@react-navigation/core';
// // import {widthDp,heightDp} from './components/Utils'
// import { widthDp, heightDp } from '../components/Utils';
// // import Card from './Card';


// const allowedApps = [
//     'com.rccll',
//     'com.android.tv.settings',
//     'com.android.tv',
// ];

// const android_tv = Platform.isTV

// const LauncherScreen = () => {
//     const [installedApps, setInstalledApps] = useState([]);
//     const [isBlockInstallation, setIsBlockInstallation] = useState(false);
//     // const [focus1, setFocus1] = useState(false);


//     // const onFocus1 = useCallback(() => {
//     //     console.log("onFocus1")
//     //     setFocus1(true);
//     // }, []);

//     // const onBlur1 = useCallback(() => {
//     //     setFocus1(false);
//     // }, []);
//     // // const [text, onChangeText] = useState("");
//     // // const [location, setLocation] = useState(null);
//     // // const InputTextRef = useRef(null)
//     // // const submitbtnRef = useRef(null)
//     // // const AccbtnRef = useRef(null)
//     // // const [loadings, setLoadings] = useState(false);
//     // // const [focus, setFocus] = useState(0);
//     // // const [focus1, setFocus1] = useState(false);
//     // // const [focus2, setFocus2] = useState(false);
//     // // const [long, setLong] = useState('')
//     // // const [lat, setLat] = useState('')
//     // const navigation = useNavigation();
//     const refFocus = useRef(null);
//     // const refFocus1 = useRef(null);


//     // const [refreshing, setRefreshing] = React.useState(false);

//     const password = "Text";

//     const toggleBlockInstallation = () => {
//         setIsBlockInstallation(!isBlockInstallation);
//     };

//     const Card = ({ data }) => {
//         const [focus, setFocus] = useState(false);


//         const onFocus = useCallback(() => {
//         console.log("onFocus")

//             setFocus(true);
//         }, []);

//         const onBlur = useCallback(() => {
//             setFocus(false);
//         }, []);

//         return (
//             <View style={styles.card}>
//                 <TouchableHighlight
//                     // backgroundColor="red"
//                     onFocus={onFocus}
//                     onBlur={onBlur}
//                     ref={refFocus}
//                     hasTVPreferredFocus={true}
//                     style={[styles.wrapper, focus ? styles.wrapperFocused : null]}
//                     onPress={(item) => 
//                         //  netInfo.isConnected?
//                         // navigation.navigate('WatchNow', { id: data.packageName })
//                         //  : alert('Please check your internet connectivity and try again');
//                         openApp(data.packageName)
//                     }
//                     // refreshControl={
//                     //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                     // }
//                     ><View style={styles.wrapper} >{data.packageName!="setting"?<Text style={styles.settingText}>{data.packageName}</Text>:   <View>
//                     <Text style={styles.settingText}>Settings View</Text>
//                     {/* <Button title="Settings" style={styles.wrapper} onPress={toggleBlockInstallation} /> */}
//                     </View>}</View></TouchableHighlight>
//             </View>)
//     }

//     // const enableDeviceAdmin = async () => {
//     //     try {
//     //         await NativeModules.AdminModule.enableDeviceAdmin();
//     //     } catch (error) {
//     //         console.error('Failed to enable device admin', error);
//     //     }
//     // };

//     // const disableDeviceAdmin = async () => {
//     //     try {
//     //         await NativeModules.AdminModule.disableDeviceAdmin();
//     //     } catch (error) {
//     //         console.error('Failed to disable device admin', error);
//     //     }
//     // };



  

//     useEffect(() => {
//         const fetchInstalledApps = async () => {
//             try {
//                 const apps1 = await NativeModules.LauncherModule.getInstalledApps();
//                 console.log(apps1)
//                 const apps = [{
//                     "packageName": "com.rccll",
//                     "name": "rcc on site tv"
//                 },{
//                     "packageName": "com.rccll23",
//                     "name": "rcc on site tv 2"
//                 },{
//                     "packageName": "setting",
//                     "name": "rcc on site tv 2"
//                 }]
//                 setInstalledApps(apps);
//             } catch (error) {
//                 console.log('Failed to fetch installed apps', error);
//             }
//         };
//         fetchInstalledApps();
//     }, []);

//     // const onSubmit = () => {
//     //     if (text === password) {
//     //         setIsBlockInstallation(false);
//     //     }
//     // };

//     const openApp = async (packageName) => {
//         let count = 1
//         try {
//             // await NativeModules.LauncherModule.launchApp(packageName);
//             console.log(packageName+"  ",count++)
//         } catch (error) {
//             console.log("launch error: ", error);
//         }
//     };



//     // const renderItem = ({ index, item }) => (
//     //     <TouchableOpacity
//     //         // style={styles.appItem}
//     //         id={index
//     //         ref={submitbtnRef}
//     //         onFocus={() => onFocus(index)}
//     //         onBlur={onBlur}
//     //         hasTVPreferredFocus={focus == 1 ? true : false}
//     //         style={[styles.appItem, focus == 1 ? styles.wrapperFocused : null]}
//     //         onPress={() => openApp(item.packageName)}
//     //         focusable={true}
//     //     >
//     //         <Text style={styles.appName}>{item.name}</Text>
//     //         <Button title="Open" onPress={() => openApp(item.packageName)} />
//     //     </TouchableOpacity>
//     // );

//     return (
//         <View style={styles.container}>
//             {/* <Modal isVisible={isBlockInstallation}>
//                 <View style={styles.modalContent}>
//                     <Text>Password:</Text>
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={onChangeText}
//                         value={text}
//                         secureTextEntry
//                     />
//                     <Button title="Submit" onPress={onSubmit} />
//                 </View>
//             </Modal> */}
//             {/* <FlatList
//                 data={installedApps}
//                 keyExtractor={(item) => item.packageName}
//                 renderItem={renderItem}
//                 focusable={true}
//                 extraData={installedApps}
//             /> */}
//             <FlatList
//                 showsVerticalScrollIndicator={false}
//                 // columnWrapperStyle={{ justifyContent: 'space-between' }}
//                 // backgroundColor="red"
//                 contentContainerStyle={{
//                     marginTop: heightDp('3%'),
//                     paddingBottom: heightDp('3%'),
//                 }}
//                 numColumns={2}
//                 data={installedApps}
//                 renderItem={({ item }) => <Card data={item} />}
//                 keyExtractor={(item, index) => index.toString()}
//                 // refreshControl={
//                 //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                 // }
//             />
//             {/* <View style={styles.switchContainer}>
//                 <TouchableHighlight
//                 onFocus={onFocus1}
//                 onBlur={onBlur1}
//                 ref={refFocus1}
//                 hasTVPreferredFocus={true}
//                 style={[styles.wrapper, focus1 ? styles.wrapperFocused : null]}
//                 onPress={() => {
//                     //  netInfo.isConnected?
//                     // navigation.navigate('WatchNow', { id: data.packageName })
//                     //  : alert('Please check your internet connectivity and try again');
//                 }}
//                 // keyExtractor="setting"
//                 >
//                     <View>
//                 <Text style={styles.settingText}>Settings View</Text>
//                 <Button title="Settings" onPress={toggleBlockInstallation} />
//                 </View>
//                 </TouchableHighlight>
//             </View> */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#222',
//     },
//     switchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         // justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//         width: '100%',
//     },
//     appItem: {
//         padding: 10,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         backgroundColor: '#444',
//         borderRadius: 8,
//     },
//     appName: {
//         fontSize: 18,
//         color: '#fff',
//         marginBottom: 10,
//     },
//     modalContent: {
//         backgroundColor: "white",
//         padding: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     wrapperFocused: {
//         zIndex: 10,
//         borderWidth: 1,
//         borderColor: '#FBCC35',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: android_tv ? widthDp('2%') : widthDp('9%'),
//         paddingVertical: android_tv ? heightDp('1%') : heightDp('2%'),
//         borderRadius: 5,
//         backgroundColor: android_tv ? '#CCC' : '#FBCC35',
//         marginTop: heightDp('2%'),
//         alignSelf: 'flex-end'
//     },
//     settingText: {
//         color: '#fff',
//         fontSize: 18,
//     }, card: {
//         marginBottom: 25,
//         elevation: 0,
//         backgroundColor:"blue",
//         margin:20,
//     },

//     iconContent: {
//         marginTop: heightDp('1.8%'),
//         marginHorizontal: widthDp('1%'),
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         marginLeft: widthDp('32%'),
//         borderWidth: 2,
//         borderColor: '#fff',
//         borderRadius: 50,
//     },
//     safe: {
//         flex: 1,
//         backgroundColor: '#0c1c36',
//         paddingHorizontal: widthDp('5%'),
//     },
//     backgroundImg: {
//         height: heightDp('29.6%'),
//         width: widthDp('43%'),
//         borderRadius: 10,
//         position: 'relative',
//         backgroundColor: 'black'
//     },
//     imgInner: {
//         backgroundColor: 'rgba(0,0,0,0.8)',
//         width: widthDp('43%'),
//         height: heightDp('7.09%'),
//         top: heightDp('22.55%'),
//         paddingHorizontal: widthDp('1%'),
//         position: 'absolute',
//     },
//     waitfordatcontainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     activityIndicator: {
//         alignItems: 'center',
//         height: heightDp('10%'),
//     },
//     title: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: '#ccc',
//         paddingHorizontal: widthDp('1%'),
//     },
//     wrapper: {
//         borderColor: 'transparent',
//         borderWidth: 3,
//         borderRadius: 10,

//     },
//     wrapperFocused: {
//         borderColor: '#fbcc35',
//         padding: 5
//     },
// });

// export default LauncherScreen;
