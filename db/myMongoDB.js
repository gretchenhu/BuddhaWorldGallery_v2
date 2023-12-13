import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

  function connect() {
    console.log("Connecting to", uri.slice(0, 20));
    const client = new MongoClient(uri);
    const db = client.db("buddhaWorld");
    return { client, db };
  }

  myDB.getBuddha = async function (query = {}) {
    const { client, db } = connect();

    try {
      const buddha = await db
        .collection("ListedArtifacts")
        .find(query)
        .toArray();

      return buddha;
    } finally {
      await client.close();
    }
  };

  myDB.createArtifact = async (newArtifact) => {
    const { client, db } = connect();
    const artifactsCollection = db.collection("ListedArtifacts");

    try {
      const result = await artifactsCollection.insertOne(newArtifact);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getArtifactById = async (artifactId) => {
    const { client, db } = connect();
    const artifactsCollection = db.collection("ListedArtifacts");

    try {
      const filter = { _id: new ObjectId(artifactId) };
      const artifact = await artifactsCollection.findOne(filter);
      return artifact;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.updateArtifact = async (artifactId, updateData) => {
    const { client, db } = connect();
    const artifactsCollection = db.collection("ListedArtifacts");

    try {
      const filter = { _id: new ObjectId(artifactId) };
      const update = { $set: updateData };
      const result = await artifactsCollection.updateOne(filter, update);
      if (result.matchedCount > 0) {
        return result;
      }
      return null;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.deleteArtifact = async (artifactId) => {
    const { client, db } = connect();
    const artifactsCollection = db.collection("ListedArtifacts");

    try {
      const filter = { _id: new ObjectId(artifactId) };
      const result = await artifactsCollection.deleteOne(filter);
      return { deletedCount: result.deletedCount };
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.createComment = async (comment) => {
    const { client, db } = connect();
    const commentsCollection = db.collection("Comments");

    try {
      const result = await commentsCollection.insertOne(comment);
      console.log(result);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getCommentsByArtifactId = async (artifactId) => {
    const { client, db } = connect();
    const commentsCollection = db.collection("Comments");

    try {
      const comments = await commentsCollection.find({ artifactId }).toArray();
      return comments;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.deleteComment = async (commentId) => {
    const { client, db } = connect();
    const commentsCollection = db.collection("Comments");

    try {
      const result = await commentsCollection.deleteOne({
        _id: new ObjectId(commentId),
      });
      return { deletedCount: result.deletedCount };
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.updateComment = async (commentId, updateData) => {
    const { client, db } = connect();
    const commentsCollection = db.collection("Comments");

    try {
      const filter = { _id: new ObjectId(commentId) };
      const update = { $set: updateData };
      const result = await commentsCollection.updateOne(filter, update);
      if (result.matchedCount > 0) {
        return result;
      }
      return null;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  /*
  myDB.createUser = async (newUser) => {
    const { client, db } = connect();
    const usersCollection = db.collection("RegisteredUsers");
  
    try {
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const userWithHashedPassword = { ...newUser, password: hashedPassword };
      const result = await usersCollection.insertOne(userWithHashedPassword);
      console.log(result);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  // Give me a way to 
  myDB.getUserByEmail = async (email) => {
    const { client, db } = connect();
    const usersCollection = db.collection("RegisteredUsers");

    try {
      const filter = { email: email };
      const user = await usersCollection.findOne(filter);
      console.log("Finding user with email", user);
      return user;
      //console.log(email);
      //console.log(await usersCollection.find({}).toArray(filter));
    } finally {
      console.log("db closing connection");
      client.close();
    }
  }; R
  */

  myDB.insertUser = async function (user) {
    const { client, db } = connect();

    console.log("insert User", user.username);
    try {
      const response = await db.collection("RegisteredUsers").insertOne(user);

      return response;
    } finally {
      await client.close();
    }
  };

  myDB.getUserByUsername = async function (username) {
    const { client, db } = connect();

    console.log("get User", username);
    try {
      return await db.collection("RegisteredUsers").findOne({ username });
    } finally {
      await client.close();
    }
  };
  return myDB;
}

/*  myDB.closeConnection = async () => {
    if (client.isConnected()) {
      await client.close();
    }
  };
*/

const myDB = MyMongoDB();

export default myDB;