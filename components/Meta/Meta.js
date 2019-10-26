import React from 'react'
import Head from 'next/head'

const Meta = ({
    title = 'Obaybuy',
    description = 'Shop our collection of awesome 3C Products',
    keywords = '3C, Compute',
    ogtitle = 'Obaybuy Shop',
    ogdescription = 'Shop our collection of awesome 3C Products',
    ogtype = 'website',
    ogimage = '',
    ogsitename = 'Obaybuy Shop',
    ogurl = '',
    canonical = ''
}) => (
    <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={ogtitle} />
        <meta property="og:description" content={ogdescription} />
        <meta property="og:type" content={ogtype} />
        <meta property="og:image" content={ogimage} />
        <meta property="og:site_name" content={ogsitename} />
        <meta property="og:url" content={ogurl} />
        <link rel="canonical" href={canonical} />
    </Head>
)
export default Meta
