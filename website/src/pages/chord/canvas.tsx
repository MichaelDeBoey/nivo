import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { generateChordData } from '@nivo/generators'
import { ResponsiveChordCanvas, canvasDefaultProps } from '@nivo/chord'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/chord/meta.yml'
import mapper, { UnmappedChordProps, MappedChordProps } from '../../data/components/chord/mapper'
import { groups } from '../../data/components/chord/props'

const MATRIX_SIZE = 38

const initialProperties: UnmappedChordProps = {
    margin: {
        top: 60,
        right: 200,
        bottom: 60,
        left: 60,
    },
    // valueFormat: '.2f',
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    padAngle: 0.006,
    innerRadiusRatio: 0.86,
    innerRadiusOffset: canvasDefaultProps.innerRadiusOffset,
    arcOpacity: canvasDefaultProps.arcOpacity,
    activeArcOpacity: canvasDefaultProps.activeArcOpacity,
    inactiveArcOpacity: canvasDefaultProps.inactiveArcOpacity,
    arcBorderWidth: 0,
    arcBorderColor: canvasDefaultProps.arcBorderColor,
    ribbonOpacity: canvasDefaultProps.ribbonOpacity,
    activeRibbonOpacity: canvasDefaultProps.activeRibbonOpacity,
    inactiveRibbonOpacity: canvasDefaultProps.inactiveRibbonOpacity,
    ribbonBorderWidth: 0,
    ribbonBorderColor: canvasDefaultProps.ribbonBorderColor,
    enableLabel: true,
    label: 'id',
    labelOffset: 9,
    labelRotation: -90,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },
    colors: { scheme: 'red_blue' },
    isInteractive: true,
    legends: [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemWidth: 80,
            itemHeight: 11,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            symbolSize: 12,
        },
    ],
}

const generateData = () => generateChordData({ size: MATRIX_SIZE })

const ChordCanvas = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/chord-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<UnmappedChordProps, MappedChordProps, any>
            name="ChordCanvas"
            meta={meta.ChordCanvas}
            icon="chord"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            defaultProperties={canvasDefaultProps}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateData}
            getDataSize={() => MATRIX_SIZE * MATRIX_SIZE + MATRIX_SIZE}
            getTabData={data => data.matrix}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveChordCanvas
                        {...properties}
                        data={data.matrix}
                        keys={data.keys}
                        theme={theme}
                        ref={chartRef as Ref<HTMLCanvasElement>}
                        debounceResize={200}
                        onArcClick={arc => {
                            logAction({
                                type: 'click',
                                label: `[arc] ${arc.label}`,
                                color: arc.color,
                                data: arc,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default ChordCanvas
