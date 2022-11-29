import { useNavigation, useRoute } from "@react-navigation/native"
import { Text, TouchableOpacity } from "react-native"
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';


import Container from "../components/Container"
import SlipTemplate from "../components/SlipTemplate"
import { useCallback, useEffect, useRef, useState } from "react";
import { joinDate } from "../utils/utilities";

function MiniTime(timestamp) {
    const date = new Date(timestamp)
    return `${joinDate(date, [{ 'day': '2-digit' }, { 'month': 'short' }], '-', 'th-TH')} ${(Number(joinDate(date, [{ 'year': 'numeric' }])) + 543).toString().slice(-2)}-${joinDate(date, [{ 'hour': '2-digit' }, { 'minute': '2-digit' }], '.').replace(/ PM| AM/, '')}`
}

export default () => {
    const imageRef = useRef()
    const navigation = useNavigation()
    const route = useRoute()
    const [status, requestPermission] = MediaLibrary.usePermissions()

    if (!status) {
        requestPermission()
    }

    const onSaveImageAsync = async (localUri) => {
        try {
            // const localUri = await captureRef(imageRef, {
            //     quality: 1,
            //     height: 500,
            //     fileName: `${route.params.transaction_id}-${MiniTime(route.params.timestamp)}`,
            //     format: 'png'
            // })

            const asset = await MediaLibrary.createAssetAsync(localUri)
            await MediaLibrary.createAlbumAsync('umplus', asset);
            // await MediaLibrary.deleteAssetsAsync(asset)
            console.log("SAVE")
        } catch (e) {
            console.log(e);
        }
    }

    const onCapture = useCallback(localUri => {
        setTimeout(()=>{
            onSaveImageAsync(localUri)
        },200)
    }, []);

    return (
        <Container header={() => <></>}>
            <ViewShot
                ref={imageRef}
                onCapture={onCapture}
                options={{
                    quality: 1,
                    height: 500,
                    fileName: `${route.params.transaction_id}-${MiniTime(route.params.timestamp)}`,
                    format: 'jpg'
                }}
                captureMode="mount"
                collapsable={false}
            >
                <SlipTemplate
                    user_id={route.params.receiver.user_id}
                    amount={route.params.amount}
                    transaction_id={route.params.transaction_id}
                    timestamp={route.params.timestamp}
                    firstname={route.params.receiver.firstname}
                    lastname={route.params.receiver.lastname}
                ></SlipTemplate>
            </ViewShot>
            <TouchableOpacity
                onPress={() => {
                    navigation.popToTop()
                }}
                className={`px-5 py-3 w-full bg-[#3076FF] rounded-xl flex justify-center items-center mt-auto mb-10`}
            >
                <Text className="text-white font-LINESeedRg text-lg">เสร็จสิ้น</Text>
            </TouchableOpacity>
        </Container>
    )
}