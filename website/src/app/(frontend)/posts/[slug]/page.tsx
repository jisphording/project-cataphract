import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import RichText from 'src/app/components/RichText'

import type { Post } from '../../../../payload-types'

import { PostHero } from '../../../heros/PostHero'
import { generateMeta } from '../../../utilities/generateMeta'
//import PageClient from './page.client'

export async function generateStaticParams() {
    const payload = await getPayloadHMR({ config: configPromise })
    const posts = await payload.find({
        collection: 'posts',
        draft: false,
        limit: 1000,
        overrideAccess: false,
    })

    return posts.docs?.map(({ slug }) => slug)
}

export default async function Post({ params: { slug = '' } }) {
    const url = '/posts/' + slug
    const post = await queryPostBySlug({ slug })

    if (!post) return <PayloadRedirects url={url} />

    return (
        <article className="flex grid-12col content">
            {/* <PageClient /> */}

            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />

            {/* <PostHero post={post} /> */}

            <div className='grid-span-8col'>
                <RichText
                    content={post.content}
                    enableGutter={false}
                />

                {/*<RelatedPosts
                docs = { post.relatedPosts.filter((post) => typeof post === 'object') }
                /> */}
            </div>
        </article>
  )
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const post = await queryPostBySlug({ slug })

  // return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
