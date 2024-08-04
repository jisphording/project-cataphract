import clsx from 'clsx'
import React from 'react'
import RichText from 'src/app/components/RichText'

import type { Post } from '../../../payload-types'

import { Card } from '../../components/Card'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: any
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className="grid-span-4col" >
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div>
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="posts" showCategories />
        })}
      </div>
    </div>
  )
}
