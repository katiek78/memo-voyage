import locationExplanation from "../public/assets/location-explanation.png";
import locationExplanation2 from "../public/assets/location-explanation2.jpg";

const LocationExplanation = () => {
    return(
    <details>
        <summary>What should go here?</summary>
    <p className='location__explanation'>Copy the co-ordinates from the address bar on Google Maps or you can simply paste the whole URL! On mobile, simply copy the coordinates.</p>
    <img className='location__image' id="location-explanation" alt="screenshot of part of a Google Street View URL with red box around co-ordinates" src={locationExplanation.src}></img>
    <br />
    <img className='location__image' id="location-explanation2" alt="screenshot from Google Street View app" height={200} src={locationExplanation2.src}></img>
    </details>
    );
}

export default LocationExplanation;