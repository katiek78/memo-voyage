const API_KEY = process.env.API_KEY;

const EmbedStreetView = ({width, height, location}) => {

    return(
        <iframe
        width={width}
        height={height}
        style={{border:0, padding:'10px'}}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/streetview?key=${API_KEY}
          &location=${location}`}>
      </iframe>
    );
}

export default EmbedStreetView;