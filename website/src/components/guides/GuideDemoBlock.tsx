import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import media from '../../theming/mediaQueries'
import { CollapsibleCard } from '../CollapsibleCard'
import { ControlsGroup } from '../controls/ControlsGroup'
import { Highlight } from '../Highlight'
import { ChartProperty } from '../../types'

interface GuideDemoBlockProps<Settings> {
    title: string
    initialSettings: Settings
    controls: Omit<ChartProperty, 'group' | 'key'>[]
    generateCode: (settings: Settings) => string
    children: (settings: Settings) => ReactNode
}

export function GuideDemoBlock<Settings>({
    title,
    initialSettings,
    controls,
    generateCode,
    children,
}: GuideDemoBlockProps<Settings>) {
    const [settings, setSettings] = useState(initialSettings)

    return (
        <CollapsibleCard title={title} expandedByDefault={true}>
            <Container>
                <Preview>{children(settings)}</Preview>
                <Controls>
                    <ControlsGroup
                        name={title}
                        controls={controls}
                        settings={settings}
                        onChange={setSettings}
                    />
                </Controls>
                <Code>
                    <Highlight language="jsx" code={generateCode(settings)} />
                </Code>
            </Container>
        </CollapsibleCard>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 4fr 6fr;
    grid-template-rows: 4fr 6fr;
    max-height: 600px;

    ${media.mobile`
        & {
            display: block;
            max-height: none;
        }
    `}
`

const Preview = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.cardAltBackground};

    ${media.mobile`
        & {
            padding: 20px 0;
            border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
        }
    `}
`

const Code = styled.div`
    grid-column-start: 1;
    grid-row-start: 2;
    overflow-x: hidden;
    overflow-y: auto;
    border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`

const Controls = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 2;
    overflow-x: hidden;
    overflow-y: auto;
`
