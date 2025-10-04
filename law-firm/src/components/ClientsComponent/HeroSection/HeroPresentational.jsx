import Hero from '../../../assets/LandingPics/Hero.jpg'
function HeroPresentational() {
    return (
        <div
            className='min-h-screen bg-cover bg-center bg-no-repeat relative '
            style={{ backgroundImage: `url(${Hero})` }}
        >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>
    )
}

export default HeroPresentational
