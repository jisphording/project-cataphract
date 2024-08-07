import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import React from 'react'
import RichText from 'src/app/components/RichText'

type Props = {
    className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
    return (
        <div className='banner-block'>
            <RichText content={content} enableGutter={false} enableProse={false} />
        </div>
    )
}
