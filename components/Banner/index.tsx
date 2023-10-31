import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules';
import styles from './styles.module.css'
import 'swiper/css';

export const Banner = () => {

    return(
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className={styles.swiper}
            >
            <SwiperSlide className={styles['swiper-slide']}>
                <div className={styles.swiperDiv}>
                    Slide 1
                </div>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}>
                <div className={styles.swiperDiv}>
                    Slide 2
                </div>
            </SwiperSlide>
            </Swiper>
        </div>
    )
}