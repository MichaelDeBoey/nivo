import { ReactNode, Fragment, createElement, forwardRef, Ref, ReactElement } from 'react'
import { Container, useDimensions, SvgWrapper, WithChartRef } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import { RadarLayer } from './RadarLayer'
import { RadarGrid } from './RadarGrid'
import { RadarSlices } from './RadarSlices'
import { RadarDots } from './RadarDots'
import { svgDefaultProps } from './defaults'
import { RadarLayerId, RadarSvgProps } from './types'
import { useRadar } from './hooks'

type InnerRadarProps<D extends Record<string, unknown>> = Omit<
    RadarSvgProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
> & {
    forwardedRef: Ref<SVGSVGElement>
}

const InnerRadar = <D extends Record<string, unknown>>({
    data,
    keys,
    indexBy,
    layers = svgDefaultProps.layers,
    rotation: rotationDegrees = svgDefaultProps.rotation,
    maxValue = svgDefaultProps.maxValue,
    valueFormat,
    curve = svgDefaultProps.curve,
    margin: partialMargin,
    width,
    height,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,
    gridLevels = svgDefaultProps.gridLevels,
    gridShape = svgDefaultProps.gridShape,
    gridLabel = svgDefaultProps.gridLabel,
    gridLabelOffset = svgDefaultProps.gridLabelOffset,
    enableDots = svgDefaultProps.enableDots,
    dotSymbol,
    dotSize = svgDefaultProps.dotSize,
    dotColor = svgDefaultProps.dotColor,
    dotBorderWidth = svgDefaultProps.dotBorderWidth,
    dotBorderColor = svgDefaultProps.dotBorderColor,
    enableDotLabel = svgDefaultProps.enableDotLabel,
    dotLabel = svgDefaultProps.dotLabel,
    dotLabelYOffset = svgDefaultProps.dotLabelYOffset,
    colors = svgDefaultProps.colors,
    fillOpacity = svgDefaultProps.fillOpacity,
    blendMode = svgDefaultProps.blendMode,
    isInteractive = svgDefaultProps.isInteractive,
    sliceTooltip = svgDefaultProps.sliceTooltip,
    legends = svgDefaultProps.legends,
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,
    onClick,
    forwardedRef,
}: InnerRadarProps<D>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        getIndex,
        indices,
        formatValue,
        colorByKey,
        fillByKey,
        boundDefs,
        rotation,
        radius,
        radiusScale,
        centerX,
        centerY,
        angleStep,
        curveFactory,
        boundLegends,
        customLayerProps,
    } = useRadar<D>({
        data,
        keys,
        indexBy,
        rotationDegrees,
        maxValue,
        valueFormat,
        curve,
        width: innerWidth,
        height: innerHeight,
        colors,
        legends,
        defs,
        fill,
    })

    const layerById: Record<RadarLayerId, ReactNode> = {
        grid: null,
        layers: null,
        slices: null,
        dots: null,
        legends: null,
    }

    if (layers.includes('grid')) {
        layerById.grid = (
            <g key="grid" transform={`translate(${centerX}, ${centerY})`}>
                <RadarGrid<D>
                    levels={gridLevels}
                    shape={gridShape}
                    radius={radius}
                    rotation={rotation}
                    angleStep={angleStep}
                    indices={indices}
                    label={gridLabel}
                    labelOffset={gridLabelOffset}
                />
            </g>
        )
    }

    if (layers.includes('layers')) {
        layerById.layers = (
            <g key="layers" transform={`translate(${centerX}, ${centerY})`}>
                {keys.map(key => (
                    <RadarLayer<D>
                        key={key}
                        data={data}
                        item={key}
                        colorByKey={colorByKey}
                        fillByKey={fillByKey}
                        radiusScale={radiusScale}
                        rotation={rotation}
                        angleStep={angleStep}
                        curveFactory={curveFactory}
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                        fillOpacity={fillOpacity}
                        blendMode={blendMode}
                    />
                ))}
            </g>
        )
    }

    if (layers.includes('slices') && isInteractive) {
        layerById.slices = (
            <g key="slices" transform={`translate(${centerX}, ${centerY})`}>
                <RadarSlices<D>
                    data={data}
                    keys={keys}
                    getIndex={getIndex}
                    formatValue={formatValue}
                    colorByKey={colorByKey}
                    radius={radius}
                    rotation={rotation}
                    angleStep={angleStep}
                    tooltip={sliceTooltip}
                    onClick={onClick}
                />
            </g>
        )
    }

    if (layers.includes('dots') && enableDots) {
        layerById.dots = (
            <g key="dots" transform={`translate(${centerX}, ${centerY})`}>
                <RadarDots<D>
                    data={data}
                    keys={keys}
                    getIndex={getIndex}
                    radiusScale={radiusScale}
                    rotation={rotation}
                    angleStep={angleStep}
                    symbol={dotSymbol}
                    size={dotSize}
                    colorByKey={colorByKey}
                    color={dotColor}
                    borderWidth={dotBorderWidth}
                    borderColor={dotBorderColor}
                    enableLabel={enableDotLabel}
                    label={dotLabel}
                    formatValue={formatValue}
                    labelYOffset={dotLabelYOffset}
                />
            </g>
        )
    }

    if (layers.includes('legends')) {
        layerById.legends = (
            <Fragment key="legends">
                {boundLegends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={width}
                        containerHeight={height}
                    />
                ))}
            </Fragment>
        )
    }

    return (
        <SvgWrapper
            defs={boundDefs}
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
            ref={forwardedRef}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, customLayerProps)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const Radar = forwardRef(
    <D extends Record<string, unknown>>(
        {
            isInteractive = svgDefaultProps.isInteractive,
            animate = svgDefaultProps.animate,
            motionConfig = svgDefaultProps.motionConfig,
            theme,
            renderWrapper,
            ...props
        }: RadarSvgProps<D>,
        ref: Ref<SVGSVGElement>
    ) => (
        <Container
            animate={animate}
            isInteractive={isInteractive}
            motionConfig={motionConfig}
            renderWrapper={renderWrapper}
            theme={theme}
        >
            <InnerRadar<D> isInteractive={isInteractive} {...props} forwardedRef={ref} />
        </Container>
    )
) as <D extends Record<string, unknown>>(
    props: WithChartRef<RadarSvgProps<D>, SVGSVGElement>
) => ReactElement
