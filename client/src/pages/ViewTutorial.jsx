import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import DateFormatTutorial from '../components/DateFormats/DateFormatTutorial';
import DateFormatComment from '../components/DateFormats/DateFormatComment';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../pages/viewTutorial.css';
import TutorialDisplay from '../components/tutorialDisplay/TutorialDisplay';

import { QUERY_TUTORIALS } from '../utils/queries';
import { ADD_COMMENT, REMOVE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

const ViewTutorial = () => {
  const location = useLocation();
  const { clickButton } = location.state || {};
  const { loading, data, error, refetch } = useQuery(QUERY_TUTORIALS);
  const tutorials = data?.tutorials || [];

  const clickedTutorial = tutorials.find((tutorial) => tutorial._id === clickButton) || {};

  // Handle adding comments
  const profileId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const tutorialId = clickButton;

  const [content, setContent] = useState('');
  const [addcontent] = useMutation(ADD_COMMENT, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Add comment Error:', error),
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addcontent({
        variables: { profileId, tutorialId, content },
      });
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  // Handle removing comment
  const [removeComment] = useMutation(REMOVE_COMMENT, {
    onCompleted: () => refetch(),
    onError: (error) => console.error('Remove comment Error:', error),
  });

  const deleteComment = async (commentId) => {
    try {
      await removeComment({
        variables: { id: commentId },
      });
    } catch (e) {
      console.error('Error during mutation:', e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='tutorialDiv'>
      <Card className='tutorialCard'>
        <Card.Body>
          <TutorialDisplay
            title={clickedTutorial.title}
            content={clickedTutorial.content}
            author={clickedTutorial.author}
            category={clickedTutorial.category}
          />
          <DateFormatTutorial createdAt={clickedTutorial.createdAt} />


          {clickedTutorial.videos && clickedTutorial.videos.length > 0 && (
            <div className="tutorial-videos">
              <h4>Videos:</h4>
              <Row>
                {clickedTutorial.videos.map((video) => (
                  <Col key={video._id} xs={12} md={6} lg={4} className="mb-3">
                    <Card className="video-item">
                      <Card.Body>
                        <Card.Title>{video.title}</Card.Title>
                        <div className="video-embed row justify-content-start">
                          <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${video.videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.title}
                          ></iframe>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          <div className='commentDiv'>
            <div>
              <h4>Add your comment</h4>
              {Auth.loggedIn() ? (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      style={{ 'border': 'solid 1.5px black', 'marginBottom': '10px' }}
                      as="textarea"
                      rows={3}
                      placeholder="Type here..."
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    />
                    <div className="col-6 col-sm-3">
                      <button className="btn btn-info" type="submit">
                        Submit
                      </button>
                    </div>
                    {error && (
                      <div className="col-12 my-3 bg-danger text-white p-3">
                        {error.message}
                      </div>
                    )}
                  </Form.Group>
                </Form>
              ) : (
                <p>
                  You need to be logged in to add comments. Please{' '}
                  <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
              )}
            </div>

            <h4 style={{ 'fontWeight': 'bold', 'paddingBottom': '10px' }}>Comments</h4>
            {clickedTutorial.comments && clickedTutorial.comments.map((comments) => (
              <div key={comments._id}>
                <span className="badge text-bg-secondary">{comments.author.name}</span>
                {comments.author._id === profileId && (
                  <button className="badge text-bg-danger" style={{ 'marginLeft': '5px' }} onClick={() => deleteComment(comments._id)}>Delete</button>
                )}
                <p>{comments.content} 
                <br />
                <DateFormatComment createdAt={comments.createdAt} /> </p>          
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewTutorial;
