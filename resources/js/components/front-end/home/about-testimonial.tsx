import React from 'react'
import { Autoplay, EffectCreative, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

function AboutTestimonial() {
  return (
    <div className='py-16'>
      <Swiper
        grabCursor={true}
        effect={'fade'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -100],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative, Navigation]}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <div className=''>
          <SwiperSlide>
           <div className="md:flex bg-gray-800 rounded-[24px] items-center block md:max-w-4xl max-w-sm justify-center mx-auto">
                        <div className=' basis-2xl sm:basis-7xl ' >
                            <img src="img/bfi.png" alt=""
                                className=" md:rounded-bl-[20px] rounded-tl-[20px]  rounded-tr-[20px] md:rounded-tr-[0px] w-full h-96 md:h-96  object-cover bg-white "/>
                        </div>
                        <div className=''>
                            <p className="font-heading-font font-normal xl:text-2xl lg:mb-6 relative text-white md:text-lg mb-4 px-10 pt-4
                             text-lg">“It uses a dictionary of over 200 Latin words, combined with handful the model
                                sentence structures, to generate lorem ipsum which looks reasonable. The generated
                                lorem ipsum is therefore always free from repetition sentence structures, to
                                generate lorem ipsum which looks..</p>
                            <h2 className="font-normal lg:text-4xl text-white text-3xl px-10">Vision</h2>
                            <span className="font-normal text-base text-white px-10">BFI Education Services</span>
                        </div>
                    </div>
          </SwiperSlide>
     <SwiperSlide>
           <div className="md:flex bg-gray-800 rounded-[24px] items-center block md:max-w-4xl max-w-sm justify-center mx-auto">
                        <div className=' basis-2xl sm:basis-7xl ' >
                            <img src="img/bfi.png" alt=""
                                className=" md:rounded-bl-[20px] rounded-tl-[20px]  rounded-tr-[20px] md:rounded-tr-[0px] w-full h-96 md:h-96  object-cover bg-white "/>
                        </div>
                        <div className=''>
                            <p className="font-heading-font font-normal xl:text-2xl lg:mb-6 relative text-white md:text-lg mb-4 px-10 pt-4
                             text-lg">“It uses a dictionary of over 200 Latin words, combined with handful the model
                                sentence structures, to generate lorem ipsum which looks reasonable. The generated
                                lorem ipsum is therefore always free from repetition sentence structures, to
                                generate lorem ipsum which looks..</p>
                            <h2 className="font-normal lg:text-4xl text-white text-3xl px-10">Mission</h2>
                            <span className="font-normal text-base text-white px-10">BFI Education Services</span>
                        </div>
                    </div>
          </SwiperSlide>
     <SwiperSlide>
           <div className="md:flex bg-gray-800 rounded-[24px] items-center block md:max-w-4xl max-w-sm justify-center mx-auto">
                        <div className=' basis-2xl sm:basis-7xl ' >
                            <img src="img/bfi.png" alt=""
                                className=" md:rounded-bl-[20px] rounded-tl-[20px]  rounded-tr-[20px] md:rounded-tr-[0px] w-full h-96 md:h-96  object-cover bg-white "/>
                        </div>
                        <div className=''>
                            <p className="font-heading-font font-normal xl:text-2xl lg:mb-6 relative text-white md:text-lg mb-4 px-10 pt-4
                             text-lg">“It uses a dictionary of over 200 Latin words, combined with handful the model
                                sentence structures, to generate lorem ipsum which looks reasonable. The generated
                                lorem ipsum is therefore always free from repetition sentence structures, to
                                generate lorem ipsum which looks..</p>
                            <h2 className="font-normal lg:text-4xl text-white text-3xl px-10">Philosophy</h2>
                            <span className="font-normal text-base text-white px-10">BFI Education Services</span>
                        </div>
                    </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  )
}

export default AboutTestimonial