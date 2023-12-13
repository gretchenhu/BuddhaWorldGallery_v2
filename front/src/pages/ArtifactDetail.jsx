import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DeleteArtifact from "./DeleteArtifact";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Login from "../components/Login";
import { UserContext } from "../context/UserContext"; // Update the path as necessary
import "./artifactDetail.css";

export default function ArtifactDetail() {
  const [artifact, setArtifact] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const { artifactId } = useParams();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch artifact and comments data
    const fetchArtifactAndComments = async () => {
      try {
        // Fetch artifact data
        const artifactResponse = await fetch(`/api/buddha/id/${artifactId}`);
        if (artifactResponse.ok) {
          const artifactData = await artifactResponse.json();
          setArtifact(artifactData);
        } else {
          console.error("Artifact not found");
        }

        // Fetch comments data
        const commentsResponse = await fetch(
          `/api/buddha/id/${artifactId}/comments`
        );
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArtifactAndComments();
  }, [artifactId]);

  // Handlers for login modal
  const handleLoginClose = () => {
    setShowLogin(false);
  };

  // Handlers for comment submission
  const submitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLogin(true);
      return;
    }
    if (!artifact) {
      return <div>Loading...</div>;
    }
    if (newComment && artifactId) {
      try {
        const response = await fetch(`/api/buddha/id/${artifactId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newComment, artifactId: artifactId }),
        });

        if (response.ok) {
          const updatedResponse = await fetch(
            `/api/buddha/id/${artifactId}/comments`
          );
          console.log(updatedResponse);
          if (updatedResponse.ok) {
            const updatedData = await updatedResponse.json();
            console.log(updatedData);
            setComments(updatedData);
          }

          setNewComment("");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const deleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmed) {
      const response = await fetch(`/api/buddha/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    }
  };

  const startEditingComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);
  };

  const cancelEditingComment = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  const updateComment = async (commentId) => {
    try {
      const response = await fetch(`/api/buddha/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editedCommentText }),
      });
      if (response.ok) {
        const updatedResponse = await fetch(
          `/api/buddha/id/${artifactId}/comments`
        );
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setComments(updatedData);
        }

        setEditingCommentId(null);
        setEditedCommentText("");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div className="container my-5">
      <Navbar />
      {artifact ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={artifact.image}
              alt={artifact.name}
              className="card-img-top"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h1 className="card-title">{artifact.name}</h1>
              <p className="card-text">{artifact.dynasty}</p>
              <p className="card-text">{artifact.museum}</p>

              <div className="card-btn">
                <Link
                  to={`/buddha/edit/id/${artifactId}`}
                  className="btn btn-secondary mx-2"
                >
                  Edit
                </Link>
                <DeleteArtifact artifactId={artifactId} />
              </div>
            </div>

            <section className="comment-section">
              <h2>Comments</h2>
              <div className="comment-form">
                <form onSubmit={submitComment}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    required
                  />
                  <button type="submit">Submit Comment</button>
                </form>
              </div>
              {comments.map((comment) => (
                <div key={comment._id}>
                  {editingCommentId === comment._id ? (
                    <>
                      <button onClick={() => updateComment(comment._id)}>
                        Update Comment
                      </button>
                      <button onClick={cancelEditingComment}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p>{comment.text}</p>
                      <button onClick={() => deleteComment(comment._id)}>
                        Delete Comment
                      </button>
                      <button
                        onClick={() =>
                          startEditingComment(comment._id, comment.text)
                        }
                      >
                        Edit Comment
                      </button>
                    </>
                  )}
                </div>
              ))}
            </section>
          </div>
        </div>
      ) : (
        <div>Loading artifact details...</div>
      )}

      {showLogin && (
        <>
          <div className="backdrop" onClick={handleLoginClose}></div>
          <Login onClose={handleLoginClose} />
        </>
      )}

      <Footer />
    </div>
  );
}