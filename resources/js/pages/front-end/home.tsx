import CarouselBanner from '@/components/front-end/home/carousel-banner'
import Counter from '@/components/front-end/home/counter'
import HeroBanner from '@/components/front-end/home/hero-banner'
import Information from '@/components/front-end/home/information'
import FrontEndLayout from '@/layouts/front-end-layout'
import React from 'react'

function home() {
  return (
        <FrontEndLayout >
<CarouselBanner/>
<HeroBanner/>
<Information/>
<Counter/>
<Information/>
<Information/>
        </FrontEndLayout>
  )
}

export default home