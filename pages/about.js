const About = () => {
  return <>
  <div>
    <h3>What does this app do?</h3>
  <p>MemoVoyage allows you to create memory journeys (also known as palaces or loci) using Google Street View.</p>
  
  <h3>How do I create a journey?</h3>
  <p>
    Click 'Add journey' in the top right to begin. You'll be prompted for the name of the journey. 
    You might choose the name of the city where the journey is located (e.g. "Chicago") or a name that represents what the journey is used for (e.g. "Countries" or "Shakespeare plays").
    You also have the option of adding a link to a cover image for the journey if you want. Then, you'll want to add journey points (or loci) - see below.
  </p>  

  <h3>How do I add journey points?</h3>
  <p>
    Click on the journey you want to add points to (e.g. "Chicago"). 
    You'll be shown the existing points in that journey, and there will be three buttons that allow you to add a point, edit your journey or delete your journey.
    To add a point, click 'Add a point'. You'll be asked for the point name. This will probably be the exact location (e.g. "10 Downing Street" or "Eiffel Tower").
    To add the Street View location:
    <ul>
        <li>On desktop: simply copy the entire URL from Google Street View</li>
        <li>On mobile: copy the coordinates from the Street View app (e.g. "(40.5344911, -3.8943721)"). Don't worry about removing the brackets, commas or spaces.</li>
    </ul>
  </p>  
  
  </div>
  </>
}

export default About
