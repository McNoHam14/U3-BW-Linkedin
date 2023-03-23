import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const currentUser = "6418374d8cec02cd9cc1dfd8";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/${currentUser}`
        );
        const data = await res.json();
        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [currentUser]);

  const handleAccept = async (friendId) => {
    console.log("FriendID:", friendId);
    console.log("UserId:", currentUser);
    toast.success("You've accepted the invitation");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/acceptRequest/${friendId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser,
          }),
        }
      );
      if (res.ok) {
        const updatedRequests = friendRequests.filter(
          (request) => request._id !== friendId
        );
        setFriendRequests(updatedRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (friendId) => {
    toast.error("You've declined the invitation");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/declineRequest/${friendId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser,
          }),
        }
      );
      if (res.ok) {
        const updatedRequests = friendRequests.filter(
          (request) => request._id !== friendId
        );
        setFriendRequests(updatedRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <section className="suggested-internal-section">
        <Container className="pb-3">
          <h3 className="suggested-title mt-4 mb-3">Friend Requests</h3>
          <Row className="mb-1">
            {friendRequests.map((request) => (
              <Col xs={12} md={6} lg={4} key={request._id}>
                <Card
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid lightgrey",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={request.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title style={{ fontSize: "18px" }}>
                      {request.surname} {request.name}
                    </Card.Title>

                    <Card.Subtitle>{request.title}</Card.Subtitle>
                    <Card.Text>{request.bio}</Card.Text>
                    <div className="d-flex">
                      <Button
                        className="mr-2"
                        onClick={() => handleAccept(request._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline-secondary "
                        className="rounded-pill py-1 d-inline-block"
                        onClick={() => handleDecline(request._id)}
                      >
                        Decline
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </section>
  );
};

export default FriendRequests;
