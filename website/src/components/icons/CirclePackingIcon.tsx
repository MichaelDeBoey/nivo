import React from 'react'
import { CirclePacking, CirclePackingSvgProps } from '@nivo/circle-packing'
import circlePackingLightNeutralImg from '../../assets/icons/circle-packing-light-neutral.png'
import circlePackingLightColoredImg from '../../assets/icons/circle-packing-light-colored.png'
import circlePackingDarkNeutralImg from '../../assets/icons/circle-packing-dark-neutral.png'
import circlePackingDarkColoredImg from '../../assets/icons/circle-packing-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

type Datum = {
    id: string
    value?: number
    color?: string
    children?: Datum[]
}

const chartProps = (colors: string[]) =>
    ({
        width: ICON_SIZE,
        height: ICON_SIZE,
        data: {
            id: 'root',
            children: [
                { id: 'v', value: 0.1, color: colors[1] },
                { id: 'a', value: 3.4, color: colors[1] },
                { id: 'b', value: 2.6, color: colors[1] },
                { id: 'd', value: 1, color: colors[1] },
                { id: 'u', value: 0.1, color: colors[1] },
                { id: 'c', value: 0.1, color: colors[1] },
                { id: 'q', value: 0.7, color: colors[1] },
                { id: 's', value: 2, color: colors[1] },
                { id: 't', value: 0.1, color: colors[1] },
                { id: 'j', value: 0.2, color: colors[1] },
                { id: 'l', value: 0.7, color: colors[1] },
                { id: 'k', value: 2.6, color: colors[1] },
                { id: 'h', value: 0.4, color: colors[0] },
                { id: 'w', value: 0.1, color: colors[0] },
                { id: 'x', value: 1, color: colors[1] },
                { id: 'y', value: 0.1, color: colors[0] },
                { id: 'g', value: 0.4, color: colors[1] },
                { id: 'z', value: 0.1, color: colors[1] },
                { id: 'e', value: 1, color: colors[0] },
                { id: 'f', value: 1, color: colors[0] },
                { id: 'n', value: 0.4, color: colors[0] },
                { id: 'o', value: 0.2, color: colors[0] },
                { id: 'p', value: 0.4, color: colors[0] },
                { id: 'i', value: 0.2, color: colors[0] },
                { id: 'm', value: 0.2, color: colors[0] },
            ],
        },
        colors: { datum: 'data.color' },
        childColor: 'noinherit',
        padding: 2,
        enableLabels: false,
        leavesOnly: true,
        isInteractive: false,
    }) as CirclePackingSvgProps<Datum>

const CirclePackingIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`circle-packing-${type}`} type={type}>
        <CirclePacking<Datum> {...chartProps([colors[type].colors[1], colors[type].colors[4]])} />
    </Icon>
)

export const CirclePackingIcon = () => (
    <>
        <CirclePackingIconItem type="lightNeutral" />
        <IconImg url={circlePackingLightNeutralImg} />
        <CirclePackingIconItem type="lightColored" />
        <IconImg url={circlePackingLightColoredImg} />
        <CirclePackingIconItem type="darkNeutral" />
        <IconImg url={circlePackingDarkNeutralImg} />
        <CirclePackingIconItem type="darkColored" />
        <IconImg url={circlePackingDarkColoredImg} />
    </>
)
