import Hero from '../../assets/LandingPics/Hero.jpg'
function HeroPresentational() {
    return (
        <>
            <img src={Hero} alt="" />
            <div className="absolute inset-0 bg-black/40 z-10"></div>
        </>
    )
}

export default HeroPresentational
