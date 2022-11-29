import { Canvas, Group, ImageSVG, Mask, Path, Rect, RoundedRect, Skia } from '@shopify/react-native-skia';
import * as React from 'react';
import { hashCode, getUnit, getBoolean, getRandomColor, getContrast } from '../utils/utilities';

const SIZE = 36;

function generateData(name, colors) {
    const numFromName = hashCode(name);
    const range = colors && colors.length;
    const wrapperColor = getRandomColor(numFromName, colors, range);
    const preTranslateX = getUnit(numFromName, 10, 1);
    const wrapperTranslateX = preTranslateX < 5 ? preTranslateX + SIZE / 9 : preTranslateX;
    const preTranslateY = getUnit(numFromName, 10, 2);
    const wrapperTranslateY = preTranslateY < 5 ? preTranslateY + SIZE / 9 : preTranslateY;

    const data = {
        wrapperColor: wrapperColor,
        faceColor: getContrast(wrapperColor),
        backgroundColor: getRandomColor(numFromName + 13, colors, range),
        wrapperTranslateX: wrapperTranslateX,
        wrapperTranslateY: wrapperTranslateY,
        wrapperRotate: getUnit(numFromName, 360),
        wrapperScale: 1 + getUnit(numFromName, SIZE / 12) / 10,
        isMouthOpen: getBoolean(numFromName, 2),
        isCircle: getBoolean(numFromName, 1),
        eyeSpread: getUnit(numFromName, 5),
        mouthSpread: getUnit(numFromName, 3),
        faceRotate: getUnit(numFromName, 10, 3),
        faceTranslateX:
            wrapperTranslateX > SIZE / 6 ? wrapperTranslateX / 2 : getUnit(numFromName, 8, 1),
        faceTranslateY:
            wrapperTranslateY > SIZE / 6 ? wrapperTranslateY / 2 : getUnit(numFromName, 7, 2),
    };

    return data;
}

const AvatarBeam = (props) => {
    const data = generateData(props.name, props.colors);
    const svg = Skia.SVG.MakeFromString(
        `<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${props.size}" height="${props.size}">
            <mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
            </mask>
            <g mask="url(#mask__beam)">
                <rect width="36" height="36" fill="#5E405B"></rect>
                <rect x="0" y="0" width="36" height="36" transform="translate(${data.wrapperTranslateX} ${data.wrapperTranslateY}) rotate(${data.wrapperRotate} ${SIZE / 2} ${SIZE / 2}) scale(${data.wrapperScale})" fill="${data.wrapperColor}" rx="${data.isCircle ? SIZE : SIZE / 6}"></rect>
                <g transform="translate(${data.faceTranslateX} ${data.faceTranslateY}) rotate(${data.faceRotate} ${SIZE / 2} ${SIZE / 2})" fill="${data.faceColor}">
                    <path d="M15 21c2 1 4 1 6 0" stroke="#000000" fill="none" stroke-linecap="round"></path>
                    <rect x="13" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
                    <rect x="21" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
                </g>
            </g>
        </svg>`
    )
    if (props.svg) {
        return <ImageSVG
            svg={svg}
            x={0}
            y={0}
            width={props.size}
            height={props.size}
        />
    }
    return (
        <Canvas
            style={{
                width: props.size,
                height: props.size
            }}
        >
            <ImageSVG
                svg={svg}
                x={0}
                y={0}
                width={props.size}
                height={props.size}
            />
        </Canvas>
    );
};

export default AvatarBeam;
