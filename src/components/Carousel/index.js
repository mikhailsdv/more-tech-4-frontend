import React from "react"
import classnames from "classnames"

import useEmblaCarousel from "embla-carousel-react"

import styles from "./index.module.scss"

const Carousel = props => {
	const {images, className, ...rest} = props

	const [viewportRef] = useEmblaCarousel({
		align: "start",
		skipSnaps: false,
	})

	return (
		<div className={classnames(styles.embla, className)} {...rest}>
			<div className={styles.embla__viewport} ref={viewportRef}>
				<div className={styles.embla__container}>
					{images.map(item => (
						<div className={styles.embla__slide} key={item}>
							<div className={styles.embla__slide__inner}>
								<img
									key={item}
									src={item}
									alt=""
									className={styles.embla__slide__img}
									//className={styles.screenshot}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Carousel
