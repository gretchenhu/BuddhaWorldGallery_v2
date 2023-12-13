import express from "express";
import myDB from "../db/myMongoDB.js";

let router = express.Router();

//fetch data
router.get("/api/buddha", async function (req, res) {
  try {
    const buddha = await myDB.getBuddha();
    res.json(buddha);
  } catch (error) {
    console.error("Error fetchiing artifacts:", error);
    res.status(500).json({ error: "Failed to fetch artifacts" });
  }
});

//createArtifact
router.post("/api/buddha/artifact", async (req, res) => {
  const newArtifact = req.body;
  try {
    const result = await myDB.createArtifact(newArtifact);
    res.status(201).json({ success: true, artifactId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//getartifactById
router.get("/api/buddha/id/:id", async (req, res) => {
  try {
    const artifact = await myDB.getArtifactById(req.params.id);
    if (artifact) {
      res.json(artifact);
    } else {
      res.status(404).json({ success: false, message: "Artifact not found" });
    }
  } catch (error) {
    console.error("Error fetching artifact:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//updateArtifact
router.put("/api/buddha/id/:id", async function (req, res) {
  try {
    const artifactId = req.params.id;
    const updateData = req.body;
    const result = await myDB.updateArtifact(artifactId, updateData);
    if (result.matchedCount === 1) {
      res.json({ message: "Info updated successfully" });
    } else {
      res.status(404).json({ error: "Artifact not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//deleteArtifact
router.delete("/api/buddha/id/:id", async function (req, res) {
  try {
    const artifactId = req.params.id;
    const result = await myDB.deleteArtifact(artifactId);
    if (result.deletedCount === 1) {
      res.json({ message: "Artifact deleted successfully" });
    } else {
      res.status(404).json({ error: "Artifact not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete artifact" });
  }
});

//createComment
router.post("/api/buddha/id/:artifactId/comments", async (req, res) => {
  try {
    const artifactId = req.params.artifactId;
    const comment = { ...req.body, artifactId };
    console.log(comment);
    const result = await myDB.createComment(comment);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to create Comment" });
  }
});

//getComments
router.get("/api/buddha/id/:artifactId/comments", async (req, res) => {
  try {
    const artifactId = req.params.artifactId;
    const comments = await myDB.getCommentsByArtifactId(artifactId);
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to get comment" });
  }
});

//getUserByUsername
router.get("/api/buddha/id/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await myDB.getUserByUsername(username);
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to find user"});
  }
})

//deleteComment
router.delete("/api/buddha/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const result = await myDB.deleteComment(commentId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Unable to delete comment" });
  }
});

//updateComment
router.put("/api/buddha/comments/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const updateData = req.body;
    const result = await myDB.updateComment(commentId, updateData);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to update comment" });
  }
});

export default router;
