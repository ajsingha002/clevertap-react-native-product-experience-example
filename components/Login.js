import React, { Component } from 'react';
import {useState,useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native'

const CleverTap = require('clevertap-react-native');

const Login = () => {
    CleverTap.setDebugLevel(3);
    CleverTap.profileGetCleverTapID();

    const _handleCleverTapEvent = (eventName, event) => {
        //console.log('handleCleverTapEvent', eventName, event);
        if(eventName==='CleverTapProductConfigDidInitialize') {
            console.log("Prod Config Init");
        }
        else if(eventName==='CleverTapProductConfigDidFetch') {
            console.log("Prod Config Fetched");
            CleverTap.activate();
        }
        else if(eventName==='CleverTapProductConfigDidActivate') {
            console.log("Prod Config Activated");
            CleverTap.getProductConfigString('test101', (err, res) => {
                if(err) {
                    console.log("Error Occurred");
                }
                else {
                    console.log("Value for test1 variable");
                    console.log(res);
                }
            });
        }
        else if(eventName==='CleverTapInboxDidInitialize') {
            console.log("App Inbox Initialized");
            CleverTap.getInboxMessageCount((err, res) => {
                console.log('Total Messages: ', res, err);
            });
        }
        else if(eventName==='CleverTapInboxMessagesDidUpdate') {
            console.log("App Inbox Updated");
            CleverTap.getInboxMessageCount((err, res) => {
                console.log('Total Messages: ', res, err);
            });
        }
    }

    //CleverTap.fetch();

    CleverTap.onUserLogin({
        "Identity": "445566",
        "Email": "arghareact@testing.com",
        "Name": "Arghajyoti Singha"
    }, (res, err) => {
        console.log('User Logged in', res, err);
    });

    CleverTap.initializeInbox();

    useEffect(()=>{
        CleverTap.addListener(CleverTap.CleverTapProfileDidInitialize, (event) => { _handleCleverTapEvent(CleverTap.CleverTapProfileDidInitialize, event); });
        CleverTap.addListener(CleverTap.CleverTapProfileSync, (event) => { _handleCleverTapEvent(CleverTap.CleverTapProfileSync, event); });
        CleverTap.addListener(CleverTap.CleverTapInAppNotificationDismissed, (event) => { _handleCleverTapEvent(CleverTap.CleverTapInAppNotificationDismissed, event); });
        CleverTap.addListener(CleverTap.CleverTapInboxDidInitialize, (event) => { _handleCleverTapEvent(CleverTap.CleverTapInboxDidInitialize,event); });
        CleverTap.addListener(CleverTap.CleverTapInboxMessagesDidUpdate, (event) => { _handleCleverTapEvent(CleverTap.CleverTapInboxMessagesDidUpdate,event); });
        CleverTap.addListener(CleverTap.CleverTapInboxMessageButtonTapped, (event) => { _handleCleverTapEvent(CleverTap.CleverTapInboxMessageButtonTapped,event); });
        CleverTap.addListener(CleverTap.CleverTapDisplayUnitsLoaded, (event) => { _handleCleverTapDisplayUnitsLoaded(CleverTap.CleverTapDisplayUnitsLoaded,event); });
        CleverTap.addListener(CleverTap.CleverTapInAppNotificationButtonTapped, (event) => { _handleCleverTapEvent(CleverTap.CleverTapInAppNotificationButtonTapped,event); });
        CleverTap.addListener(CleverTap.CleverTapFeatureFlagsDidUpdate, (event) => { _handleCleverTapEvent(CleverTap.CleverTapFeatureFlagsDidUpdate,event); });
        CleverTap.addListener(CleverTap.CleverTapProductConfigDidInitialize, (event) => { _handleCleverTapEvent(CleverTap.CleverTapProductConfigDidInitialize,event); });
        CleverTap.addListener(CleverTap.CleverTapProductConfigDidFetch, (event) => { _handleCleverTapEvent(CleverTap.CleverTapProductConfigDidFetch,event); });
        CleverTap.addListener(CleverTap.CleverTapProductConfigDidActivate, (event) => { _handleCleverTapEvent(CleverTap.CleverTapProductConfigDidActivate,event); });
        CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, (event) => { _handleCleverTapEvent(CleverTap.CleverTapPushNotificationClicked,event); });
    },[])

    return (
        <View>
            <Text>Hello, World</Text>
        </View>
    );
}

export default Login;