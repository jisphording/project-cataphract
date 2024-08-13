import type { StaticImageData } from 'next/image'

import React from 'react'
import RichText from 'src/app/components/RichText'

import type { Page } from '../../../payload-types'

import { Media } from '../../components/Media'

type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
    breakout?: boolean
    captionClassName?: string
    className?: string
    enableGutter?: boolean
    id?: string
    imgClassName?: string
    staticImage?: StaticImageData
}

export const MediaBlock: React.FC<Props> = (props) => {
    const {
        captionClassName,
        className,
        enableGutter = true,
        imgClassName,
        media,
        position = 'default',
        staticImage,
    } = props

    let caption
    if (media && typeof media === 'object') caption = media.caption

    return (
        <section className = 'mediaBlock' >
            <Media imgClassName = 'imgClassName' resource = { media } src = { staticImage } />
            <div>
                <RichText content = { caption } enableGutter = { false } />
            </div>
        </section>
    )
}
