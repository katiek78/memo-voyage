import locationExplanation from "../public/assets/location-explanation.png";

const LocationExplanation = () => {
    return(
    <details>
        <summary>What should go here?</summary>
    <p className='location__explanation'>Copy the co-ordinates from the address bar on Google Maps or you can simply paste the whole URL!</p>
    <img id="location-explanation" alt="screenshot of part of a Google Street View URL with a red box around the co-ordinates" src={locationExplanation.src}></img>
    </details>
    );
}

export default LocationExplanation;