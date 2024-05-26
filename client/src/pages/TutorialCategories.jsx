import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../pages/tutorialCategories.css'

import { QUERY_ALL_TUTORIALS } from '../utils/queries';

const TutorialCategories = () => {
  const location = useLocation();
  const { clickButton } = location.state || {};

  const { loading, data } = useQuery(QUERY_ALL_TUTORIALS);
  const tutorials = data?.tutorials || [];

  const tech = []
  const academics = []
  const home = []
  const arts = []
  const lifestyleHobbies = []
  const businessFinancial = []

  tutorials.map((tutorial) => {

    const categoryArr = ['Tech', 'Academics', 'Home', 'Arts', 'Lifestyle/Hobbies', 'Business/Financial'];




    if (tutorial.category.name === categoryArr[0]) {
      tech.push(tutorial)
    }
    if (tutorial.category.name === categoryArr[1]) {
      academics.push(tutorial)
    }
    if (tutorial.category.name === categoryArr[2]) {
      home.push(tutorial)
    }
    if (tutorial.category.name === categoryArr[3]) {
      arts.push(tutorial)
    }
    if (tutorial.category.name === categoryArr[4]) {
      lifestyleHobbies.push(tutorial)
    }
    if (tutorial.category.name === categoryArr[5]) {
      businessFinancial.push(tutorial)
    }
  })



  return (
    <div>
      {clickButton === 'Tech' &&
        <div>
          <div className='categoryDiv'>
            {tech &&
              tech.map((tech) => (
                <div key={tech._id}>
                  <a><Button className='tutorialBtn'>
                  <Card style={{ width: '18rem' }} className="tutorialCard">
                    <Card.Img variant="top" className='tutorialImg' />
                    <Card.Body className='tutorialContent'>
                      <Card.Title>{tech.title}</Card.Title>
                    </Card.Body>
                  </Card>
                  </Button></a>
                </div>
              ))}
          </div>
        </div>
      }


      {clickButton === 'Academics' &&
        <div>
          <div className='categoryDiv'>
            {academics &&
              academics.map((academics) => (
                <div key={academics._id}>
                  <a><Button className='tutorialBtn'>
                  <Card style={{ width: '18rem' }} className="tutorialCard">
                    <Card.Img variant="top" className='tutorialImg' />
                    <Card.Body className='tutorialContent'>
                      <Card.Title>{academics.title}</Card.Title>
                    </Card.Body>
                  </Card>
                  </Button></a>
                </div>
              ))}
          </div>
        </div>
      }



      {clickButton === 'Home' && 
      <div>
      <div className='categoryDiv'>
        {home &&
          home.map((home) => (
            <div key={home._id}>
              <a><Button className='tutorialBtn'>
                  <Card style={{ width: '18rem' }} className="tutorialCard">
                    <Card.Img variant="top" className='tutorialImg' />
                    <Card.Body className='tutorialContent'>
                      <Card.Title>{home.title}</Card.Title>
                    </Card.Body>
                  </Card>
                  </Button></a>
            </div>
          ))}
      </div>
    </div>
      }


      {clickButton === 'Arts' && 
      <div>
      <div className='categoryDiv'>
        {arts &&
          arts.map((arts) => (
            <div key={arts._id}>
              <a><Button className='tutorialBtn'>
                  <Card style={{ width: '18rem' }} className="tutorialCard">
                    <Card.Img variant="top" className='tutorialImg' />
                    <Card.Body className='tutorialContent'>
                      <Card.Title>{arts.title}</Card.Title>
                    </Card.Body>
                  </Card>
                  </Button></a>
            </div>
          ))}
      </div>
    </div>
      }


      {clickButton === 'Lifestyle/Hobbies' && 
      <div>
      <div className='categoryDiv'>
        {lifestyleHobbies &&
          lifestyleHobbies.map((lifestyleHobbies) => (
            <div key={lifestyleHobbies._id}>
              <a><Button className='tutorialBtn'>
                  <Card style={{ width: '18rem' }} className="tutorialCard">
                    <Card.Img variant="top" className='tutorialImg' />
                    <Card.Body className='tutorialContent'>
                      <Card.Title>{lifestyleHobbies.title}</Card.Title>
                    </Card.Body>
                  </Card>
                  </Button></a>
            </div>
          ))}
      </div>
    </div>
      }


      {clickButton === 'Business/Financial' && 
      <div>
      <div className='categoryDiv'>
        {businessFinancial &&
          businessFinancial.map((businessFinancial) => (
            <div key={businessFinancial._id}>
              <a><Button className='tutorialBtn'>
                  <Card style={{ width: '18rem' }} className="tutorialCard">
                    <Card.Img variant="top" className='tutorialImg' />
                    <Card.Body className='tutorialContent'>
                      <Card.Title>{businessFinancial.title}</Card.Title>
                    </Card.Body>
                  </Card>
                  </Button></a>
            </div>
          ))}
      </div>
    </div>
      }

    </div>
  )
};


export default TutorialCategories;