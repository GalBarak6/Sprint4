import { useEffect, useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import * as React from 'react'
import { GoogleMap } from '../cmps/google-map'
import { addReviewToStay } from '../store/actions/stay.actions'
import { useDispatch } from 'react-redux'
import { Amenities } from '../cmps/amenities'
import { Checkout } from '../cmps/checkout'
import { Reviews } from '../cmps/reviews'
import { MainAmenities } from '../cmps/main-amenities'
import { StayGallery } from '../cmps/stay-gallery'
// import {SendBtn} from '../cmps/send-btn'
import { OrderModal } from '../cmps/order-modal'

export const StayDetails = () => {

    // const [x, setX] = useState(0)
    // const [y, setY] = useState(0)
    // const [bgc, setBgc] = useState('green') 

    const [stay, setStay] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        loadStay()
        document.documentElement.style.setProperty('--right', '20%')
        return () => {
            document.documentElement.style.setProperty('--padding', '80px')
            document.documentElement.style.setProperty('--right', '5%')
        }

    }, [])

    useEffect(() => {
        console.log('loading stay details')
        loadStay()
    }, [params.stayId])

    useLayoutEffect(() => {
        document.documentElement.style.setProperty('--padding', '350px')
    }, [])

    const loadStay = async () => {
        const stay = await stayService.getById(params.stayId)
        setStay(stay)
    }

    const onAddReview = async (ev) => {
        ev.preventDefault()
        const txt = ev.target[0].value
        console.log(txt)
        console.log(stay)
        await dispatch(addReviewToStay(txt, stay))
        loadStay()
        ev.target[0].value = ''
    }

    // const handleMouseMouve = (e) => {
    //     console.log(e)
    //     setX(e.clientX)
    //     setY(e.clientY)
    //     console.log(x, y)
    // }

    if (!stay) return <div className="dots">
        <div></div>
        <div></div>
        <div></div>
    </div>

    return <section className="stay-details flex flex-column">

        <h1 className='stay-name'>{stay.name}</h1>
        {/* <button onMouseMove={handleMouseMouve} style={{backgroundColor: bgc, backgroundPositionX: x, backgroundPositionY: y}}>testing is bgc working?</button> */}

        <div className='start-info flex align-center'>
            <img src={require('../assets/icons/star.svg').default} alt="" className='start-icon' />
            {stay.reviewScores.rating} <span className='dot'></span> <a href="#reviews-container">{stay.reviews.length} Reviews</a> <span className='dot'></span> {stay.loc.city} {stay.loc.address} {stay.loc.country}
        </div>

        <StayGallery imgUrls={stay.imgUrls} />

        <div className='stay-info-container'>
            <div className='stay-info'>
                <div className='host-info flex space-between'>
                    <div>
                        <h2>Cabin hosted by {stay.host.fullname}</h2>
                        <p className='flex align-center'>{stay.capacity} guests <span className='dot'></span> {stay.bedrooms} bedrooms <span className='dot'></span> {stay.beds} beds</p>
                    </div>
                    <img src={stay.host.pictureUrl} alt="" className='host-img' />
                </div>

                <MainAmenities />

                <p className='stay-summary'>
                    {stay.summary}
                </p>

                <Amenities stay={stay} />
            </div>

            <Checkout stay={stay} />
        </div>

        <div className='curr-reviews'>
            <div className='flex align-center'>
                <img src={require('../assets/icons/star.svg').default} alt="" className='star-icon' />
                {stay.reviewScores.rating} <span className='dot'></span> <div>{stay.reviews.length} Reviews</div>
            </div>

            <div className='reviews-summary flex align-center'>
                <div className='stats-container flex align-center'>
                    <div>Cleanliness</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value="5" high="0.75" low="0.25" ></meter>
                        <span>5</span>
                    </div>

                </div>
                <div className='stats-container flex align-center'>
                    <div>Communication</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value="5" high="0.75" low="0.25" ></meter>
                        <span>5</span>
                    </div>
                </div>
                <div className='stats-container flex align-center'>
                    <div>Check-in</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value="5" high="0.75" low="0.25" ></meter>
                        <span>5</span>
                    </div>
                </div>
                <div className='stats-container flex align-center'>
                    <div>Accuracy</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value="5" high="0.75" low="0.25" ></meter>
                        <span>5</span>
                    </div>
                </div>
                <div className='stats-container flex align-center'>
                    <div>Location</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value="5" high="0.75" low="0.25" ></meter>
                        <span>5</span>
                    </div>
                </div>
                <div className='stats-container flex align-center'>
                    <div>Value</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value="5" high="0.75" low="0.25" ></meter>
                        <span>5</span>
                    </div>
                </div>
            </div>
        </div>


        <Reviews reviews={stay.reviews} />

        <div className='add-review-container'>
            <div className='add-title'>
                <h2>Add a review</h2>
            </div>
            <form onSubmit={onAddReview}>
                <div>
                    <textarea name="" id="" rows="10" placeholder='Write your review here..'></textarea>
                </div>
                <button>Add Review</button>
                {/* <SendBtn /> */}
            </form>
        </div>

        <div className='map'>
            <h2>Where you`ll be</h2>
            <GoogleMap lat={stay.loc.lat} lng={stay.loc.lan} />
        </div>

    </section>
}