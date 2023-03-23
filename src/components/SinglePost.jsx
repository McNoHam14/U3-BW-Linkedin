import {
  Col,
  Dropdown,
  DropdownButton,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/style.css";
import { formatDistanceToNow } from "date-fns";
import { BiComment, BiLike, BiSend, BiShuffle } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, friendRequest } from "../redux/actions";
import { AiFillLike } from "react-icons/ai";
import EditPostModal from "./EditPostModal";
import { useEffect, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";

const SinglePost = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const profileDataID = useSelector(
    (state) => state.getProfile.fetchProfile._id
  );
  const [userData, setUserData] = useState({});
  const [commentSection, setCommentSection] = useState(false);
  const [allComments, setAllComments] = useState(null);
  const [commentUser, setCommentUser] = useState(null);
  const [commentBody, setCommentBody] = useState({
    userId: process.env.REACT_APP_USER_ID,
    comment: "",
  });

  const [amountOfLikes, setAmountOfLikes] = useState(0);
  const dispatch = useDispatch();
  const daysAgo = formatDistanceToNow(new Date(props.post?.createdAt), {
    addSuffix: true,
  });
  const handleDelete = () => {
    dispatch(deletePost(props.post?._id));
  };

  const likeRequestBody = { userId: process.env.REACT_APP_USER_ID };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFriendReq = () => {
    dispatch(friendRequest(props.post.user._id));
  };
  useEffect(() => {
    getUserLikes();
    getComments();
  }, []);

  useEffect(() => {
    allComments?.forEach((comment) => {
      getUserData(comment.userId);
    });
  }, [allComments]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      removeLike();
    } else {
      setLikes(likes + 1);
      addLike();
    }
    setIsLiked(!isLiked);
  };

  const getUserLikes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${props.post._id}/like`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const responseData = await response.json();
      setAmountOfLikes(responseData.length);
    } catch (error) {
      console.log("error");
      console.error(error);
    }
  };

  const removeLike = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${props.post._id}/like/${process.env.REACT_APP_USER_ID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      getUserLikes();
    } catch (error) {
      console.error(error);
    }
  };

  const addLike = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${props.post._id}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(likeRequestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const responseData = await response.json();
      localStorage.setItem("likeId", responseData);

      getUserLikes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSection = () => {
    if (commentSection) {
      setCommentSection(false);
    } else {
      setCommentSection(true);
    }
  };

  const postComment = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${props.post._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentBody),
        }
      );
      getComments();
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${props.post._id}/comments`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const comments = await response.json();
      setAllComments(comments);
    } catch (error) {
      console.log("error");
      console.error(error);
    }
  };

  const getUserData = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const user = await response.json();
      console.log(user);

      setUserData((prevState) => ({
        ...prevState,
        [userId]: user,
      }));
    } catch (error) {
      console.log("error");
      console.error(error);
    }
  };

  return (
    <section className="pt-3 pr-3 pb-1 pl-3" style={{ overflow: "visible" }}>
      <Row>
        <Col md={9}>
          <div className="d-flex align-items-center">
            <Col md={2} className="px-0">
              <div className="post-profile-img">
                <img
                  className="w-100"
                  src={props.post?.user?.image}
                  alt="userProfilePhoto"
                />
              </div>
            </Col>
            <Col md={10}>
              <div className="post-profile-name">
                <h6 className="mb-0">
                  <Link className="text-dark">
                    {props.post?.user?.name} {props.post?.user?.surname}
                  </Link>
                </h6>
                <p className="post-profile-title text-truncate mb-0 text-muted">
                  {props.post?.user?.title}
                </p>
                <span className="posted-date text-muted">
                  {daysAgo}
                  {/* {props.post?.createdAt &&
                    format(parseISO(props.post?.createdAt), "dd MMM yyyy")}{" "} */}
                </span>
              </div>
            </Col>
          </div>
        </Col>
        <Col md={3} className="pr-0 ml-auto">
          <div className="d-flex align-items-center justify-content-end  pr-1">
            <div className="icon-hover d-flex justify-content-center align-items-center">
              <DropdownButton
                align="end"
                title={<FiMoreHorizontal size={22} />}
                id="dropdown-menu-align-end"
                className="bg-transparent-dropdown"
              >
                <Dropdown.Item eventKey="1">Save Post</Dropdown.Item>
                <Dropdown.Item eventKey="2">Copy link to post</Dropdown.Item>
                <Dropdown.Item eventKey="3">Embed this post</Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={handleFriendReq}>
                  Send Friend Request
                </Dropdown.Item>
                {props.post?.user?._id === profileDataID && (
                  <Dropdown.Item eventKey="4" onClick={handleShow}>
                    Edit this post
                  </Dropdown.Item>
                )}
              </DropdownButton>
            </div>
            {props.post?.user?._id === profileDataID && (
              <div
                className="icon-hover d-flex justify-content-center align-items-center"
                onClick={handleDelete}
              >
                <MdDelete size={20} fill="rgba(0,0,0,0.5)" />
              </div>
            )}
          </div>
        </Col>
      </Row>
      <hr />
      <div>
        <p className="text-muted">{props.post?.text}</p>
        {props.post?.image && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img className="w-100" src={props.post?.image} alt="image" />
        )}
      </div>
      <p className="mt-3 liked-texed">Likes: {amountOfLikes}</p>
      <hr className="mb-1" />
      <ListGroup className="justify-content-between text-muted" horizontal>
        <ListGroup.Item className="hover-block  py-2 px-3" onClick={handleLike}>
          {" "}
          <span className="d-flex align-items-center">
            {isLiked ? (
              <>
                <AiFillLike fill="#0a66c2" size={20} />
                <span className="ml-1" style={{ color: "#0a66c2" }}>
                  Like
                </span>
              </>
            ) : (
              <>
                <BiLike size={20} />
                <span className="ml-1">Like</span>
              </>
            )}
          </span>
        </ListGroup.Item>
        <ListGroup.Item className="hover-block  py-2 px-3">
          {" "}
          <BiComment size={18} />
          <span className="ml-1" onClick={handleCommentSection}>
            Comment
          </span>
        </ListGroup.Item>
        <ListGroup.Item className="hover-block py-2 px-3">
          {" "}
          <BiShuffle size={18} />
          <span className="ml-1">Repost</span>
        </ListGroup.Item>
        <ListGroup.Item className="hover-block  py-2 px-3">
          {" "}
          <BiSend size={18} />
          <span className="ml-1">Send</span>
        </ListGroup.Item>
      </ListGroup>
      {commentSection && (
        <Row className="mt-2">
          <Col>
            <Form>
              <Form.Group controlId="formBasicTextarea">
                <Form.Control
                  type="text"
                  as="input"
                  placeholder="Add a comment..."
                  value={commentBody.comment}
                  onChange={(e) => {
                    setCommentBody({ ...commentBody, comment: e.target.value });
                  }}
                />
              </Form.Group>
              <Button variant="primary" onClick={postComment}>
                Post
              </Button>
              {allComments?.map((comment) => {
                //check if the userid from the comment is the id from env, if yes schow edit button
                return (
                  <div key={comment._id} className="comment-style">
                    <Row className="align-items-center">
                      <Col className="comment-img-col">
                        <Image
                          src={userData[comment.userId]?.image}
                          alt="user-img"
                          className="user-comment-img"
                        ></Image>
                      </Col>
                      <Col>
                        <h3 className="mb-0">
                          {userData[comment.userId]?.name}
                        </h3>
                      </Col>
                    </Row>
                    <p className="comment-text mt-2">{comment.comment}</p>
                  </div>
                );
              })}
            </Form>
            {/* Render comment threads */}
          </Col>
        </Row>
      )}

      <EditPostModal
        show={show}
        handleClose={handleClose}
        postId={props.post?._id}
        postText={props.post}
      />
    </section>
  );
};

export default SinglePost;
