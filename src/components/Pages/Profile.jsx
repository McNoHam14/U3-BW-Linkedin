import { Col, Container, Row } from "react-bootstrap";
import ProfileComponent from "../ProfileComponent";
import SuggestedComponent from "../SuggestedComponent";
import AnalyticsComponent from "../AnalyticsComponent";
import ResourcesComponent from "../ResourcesComponent";
import ActivityComponent from "../ActivityComponent";
import ExperiencesContainer from "../ExperiencesContainer";
import Sidebar from "../Sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import FriendRequest from "../FriendRequests";

const Profile = () => {
  
  const user = useSelector(state => state.getProfile.fetchProfile)
  useEffect(() => {
    document.title = user.name + " " + user.surname + " | BlinkedIn"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  return (
    <Container>
      <Row>
        <Col md={9}>
          <ProfileComponent />
          <SuggestedComponent />
          <FriendRequest />
          <AnalyticsComponent />
          <ResourcesComponent />
          <ActivityComponent />
          <ExperiencesContainer />
        </Col>
        <Col md={3}>
          <Sidebar />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default Profile;
