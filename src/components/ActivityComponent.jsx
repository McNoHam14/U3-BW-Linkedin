import { Button, Container } from "react-bootstrap";

const ActivityComponent = () => {
  return (
    <section>
      <Container className="block-example border border-dark">
        <div>
          <h2>Activity</h2>
          <Button>Start a post (FETCH POST function?)</Button>
          <p>n followers (LINK?)</p>
        </div>
        <div>
          <p>
            N posts lately | you haven't posted latley (FECTH GET function?)
          </p>
          <p>Recent post you share or comment on will be displayed here</p>
        </div>
        <hr></hr>
        <div>
          <p>
            Show all n resources <i className="bi bi-arrow-right"></i>{" "}
            (function?)
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ActivityComponent;
