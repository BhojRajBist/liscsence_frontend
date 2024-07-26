import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import Chapter from './Chapter';
import GenralAb from './img/GenralAbility.jpg';
import Carto from './img/Carto.jpg';
import GIS from './img/GIS.jpg';
import GA from './img/General.jpg'
import Geodesy from './img/Geodesy.jpg'
import RS from './img/RSandP.jpg'
import ES from './img/Engineering Survey.jpg'
import cad from './img/Cadastre.jpg'
import './carousel.css'

const ChapterCard = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Trigger the animation when the component mounts
    setCardsVisible(true);
  }, []);

  const chapters = [
    {
      id: 1,
      name: 'General Ability Test',
      image: GenralAb,
      additionalProp: 'https://ab.geoneer.com.np/surveyofficer/generalabilitytest/',
    },
    {
      id: 2,
      name: 'Cartography',
      image: Carto,
      additionalProp: 'https://ab.geoneer.com.np/surveyofficer/cartography/',
    },
    {
      id: 3,
      name: 'Spatial Information System ',
      image: GIS,
      additionalProp: 'https://ab.geoneer.com.np/surveyofficer/spatialinformationsystemanddigitalterrainmodel(sisanddtm)/',
    },
    {
      id: 4,
      name: 'General Awareness ',
      image: GA,
      additionalProp: 'https://ab.geoneer.com.np/surveyofficer/generalawarenessandcontemporaryissues/',
    },
    {
      id: 5,
      name: 'Cadastre',
      image: cad,
      additionalProp: 'http://ab.geoneer.com.np/surveyofficer/cadastre/',
    },
    {
      id: 6,
      name: 'Engineering Survey',
      image: ES,
      additionalProp: 'http://ab.geoneer.com.np/surveyofficer/engineeringsurvey/',
    },
    {
      id: 7,
      name: 'Photogrammetry and Remote Sensing',
      image: RS,
      additionalProp: 'http://ab.geoneer.com.np/surveyofficer/photogrammetryandremotesensing/',
    },
    {
      id: 8,
      name: 'Geodesy',
      image: Geodesy,
      additionalProp: 'http://ab.geoneer.com.np/surveyofficer/geodesy/',
    },
    
    // Add more chapters as needed
  ];

  const handleTakeExam = (chapterId, additionalProp) => {
    setSelectedChapter(chapterId);
    // Use history.push to navigate to the '/chapter' route with props
    history.push({
      pathname: '/chapter',
      state: {
        chapterId: chapterId,
        additionalProp: additionalProp,
        // Add other props as needed
      },
    });
  };

  return (
    <div>
      <div className={`d-flex flex-wrap justify-content-center ${cardsVisible ? 'visible' : ''}`}>
        {chapters.map(chapter => (
          <Card
            key={chapter.id}
            className={`mb-4 card-animation ${cardsVisible ? 'visible' : ''}`}
            style={{ width: '18rem', position: 'relative', overflow: 'hidden', marginRight: '20px', marginLeft: '20px' }}
          >
             <Card.Img
              src={chapter.image}
              alt={`Chapter ${chapter.id}`}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div
              className="text-white bg-primary p-2"
              style={{ position: 'absolute', top: '0', width: '100%', textAlign: 'center' }}
            >
              <h5>{chapter.name}</h5>
            </div>
            <Card.Body className="text-center">
              <Button variant="success" onClick={() => handleTakeExam(chapter.id, chapter.additionalProp)}>
                Take Exam
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {selectedChapter !== null && (
        <Chapter
          chapterId={selectedChapter}
          additionalProp={chapters.find(chapter => chapter.id === selectedChapter)?.additionalProp}
        />
      )}
    </div>
  );
};

export default ChapterCard;
