import React, { useState, useEffect } from 'react';
import './home.css'; // Import your CSS file for styling

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:'https://leica-geosystems.com/-/media/images/leicageosystems/industries/pure%20surveying/home%20page/survey%20solutions/solutions%20for%20total%20stations/no_big_or_small_job_800x428.ashx?h=428&w=800&la=en&hash=C6022D2FE4FDF9CE875E208A3AA95E5D', // Replace with your image URLs
      text: 'This is the your gateway to Loksewa.This site is developed by Geoneer Geopatial Services',
    },
    {
      image: 'https://th.bing.com/th/id/R.c5deb1f6818fab2eb02f37671defc156?rik=iX4tVMAoY52gAw&riu=http%3a%2f%2fyesofcorsa.com%2fwp-content%2fuploads%2f2017%2f02%2f4K-Drones-Photo-Download.jpg&ehk=KvXFYxRkXQrdlr3Uy0Hlk98Lhsgl1BYBmRzJqXYRmhE%3d&risl=&pid=ImgRaw&r=0',
      text: 'Join Us to Crack Loksewa',
    },
    {
      image: 'https://th.bing.com/th/id/R.d62e679b83345244004371e9e6bc8d30?rik=z41gsl5t1eo9EQ&pid=ImgRaw&r=0',
      text: 'Join Us for Exclusive Offers',
    },
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="carousel-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="text-box">
            <h1>{slide.text}</h1>
            <button>Learn More</button>
          </div>
        </div>
      ))}


    </div>
   
     
  );
};

export default Homepage;

// export default Homepage;

// //     <div>
// //       <>
// //     <main role="main" style={{ marginTop: 50 }}>
// //     {/* Main jumbotron for a primary marketing message or call to action */}
// //     <div className="jumbotron" style={{ backgroundColor: "#add8e6" }} >
// //       <div className="container">
// //         <h1 className="display-3">Welcome!!</h1>
// //         <p>
// //          This is the your gateway to Loksewa.This site is developed by <a href="https://geoneer.com.np/">Geoneer Geopatial Services</a>.
// //         </p>
// //         <p>
// //           <a className="btn btn-primary btn-lg" role="button" href="https://geoneer.com.np/"> 
// //             Learn more »
// //           </a>
// //         </p>
// //       </div>
// //     </div>
// //     <div className="container">
// //       {/* Example row of columns */}
// //       <div className="row">
// //         <div className="col-md-4">
// //           <h2>Heading</h2>
// //           <p>
// //             Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
// //             tellus ac cursus commodo, tortor mauris condimentum nibh, ut
// //             fermentum massa justo sit amet risus. Etiam porta sem malesuada
// //             magna mollis euismod. Donec sed odio dui.{" "}
// //           </p>
// //           <p>
// //             <a className="btn btn-secondary" href="https://geoneer.com.np/" role="button">
// //                View details »
// //             </a>
// //           </p>
// //         </div>
// //         <div className="col-md-4">
// //           <h2>Heading</h2>
// //           <p>
// //             Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
// //             tellus ac cursus commodo, tortor mauris condimentum nibh, ut
// //             fermentum massa justo sit amet risus. Etiam porta sem malesuada
// //             magna mollis euismod. Donec sed odio dui.{" "}
// //           </p>
// //           <p>
// //             <a className="btn btn-secondary" href="https://geoneer.com.np/" role="button">
// //                View details »
// //             </a>
// //           </p>
// //         </div>
// //         <div className="col-md-4">
// //           <h2>Heading</h2>
// //           <p>
// //             Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
// //             egestas eget quam. Vestibulum id ligula porta felis euismod semper.
// //             Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
// //             nibh, ut fermentum massa justo sit amet risus.
// //           </p>
// //           <p>
// //           <button className="btn btn-secondary">
// //               View details »
// //           </button>
// //           </p>
// //         </div>
// //       </div>
// //       <hr />
// //     </div>{" "}
// //     {/* /container */}
// //   </main>
// //   <footer className="container">
// //     <p>© Geoneer Geospatial Services</p>
// //   </footer>
// // </>

// //     </div>
