import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '../../../payload-types'

import { ThemeSelector } from '../../providers/Theme/ThemeSelector'
import { CMSLink } from '../Link'

export async function Footer() {
    const footer: Footer = await getCachedGlobal('footer')()

    const navItems = footer?.navItems || []

    return (
        <footer className="flex">
        
            <div>

                <div>
                    <p>This Website is powered by:</p>
                    
                    <Link  href="/">
                    <picture>
                        <img
                        alt="Payload Logo"
                        src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/payload/src/admin/assets/images/payload-logo-light.svg"
                        />
                    </picture>
                    </Link>
                </div>

                <div>
                    <ThemeSelector />
                    <nav>
                        {navItems.map(({ link }, i) => {
                        return <CMSLink key={i} {...link} />
                        })}
                    </nav>
                </div>

            </div>

        </footer>
    )
}
