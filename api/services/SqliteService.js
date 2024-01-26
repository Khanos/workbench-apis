const sqlite3 = require('sqlite3').verbose();

let db = null;
let databasePath = '../../database.db';

const setDatabasePath = (path) => {
  databasePath = path;
};

const connect = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(databasePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

const disconnect = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      try {
        // Create tables if they don't exist
        db.run(`
          CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY,
            title TEXT,
            content TEXT
          )
        `);
  
        db.run(`
          CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY,
            postId INTEGER,
            comment TEXT,
            FOREIGN KEY(postId) REFERENCES posts(id)
          )
        `);
  
        db.run(`
          CREATE TABLE IF NOT EXISTS likes (
            id INTEGER PRIMARY KEY,
            postId INTEGER,
            like INTEGER DEFAULT 0,
            dislike INTEGER DEFAULT 0,
            FOREIGN KEY(postId) REFERENCES posts(id)
          )
        `);

        // Empty tables
        db.run(`
          DELETE FROM posts
        `);

        db.run(`
          DELETE FROM comments
        `);

        db.run(`
          DELETE FROM likes
        `);

        // Insert dummy data
        const randomPosts = [
          {
            title: 'Hello World',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dui sed ante volutpat sodales. Sed vitae semper nisl. Nullam eget libero in nunc aliquet aliquam. Nulla facilisi. Nulla facilisi. Aliquam erat volutpat. Nam auctor, arcu vitae aliquam ultricies, elit nunc sodales nisl, eu cursus nibh est ut libero. Sed nec est eget nunc ultrices cursus. Sed sit amet diam ac ante aliquam tempus. Nulla facilisi. Nulla facilisi. Sed nec aliquet magna. Nulla facilisi. Sed ac magna sed nunc ultricies luctus. Nullam auctor, velit a aliquam ultricies, elit nunc sodales nisl, eu cursus nibh est ut libero. Sed nec est eget nunc ultrices cursus. Sed sit amet diam ac ante aliquam tempus. Nulla facilisi. Nulla facilisi. Sed nec aliquet magna.',
          },
          {
            title: 'Hello World 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dui sed ante volutpat sodales. Sed vitae semper nisl. Nullam eget libero in nunc aliquet aliquam. Nulla facilisi. Nulla facilisi. Aliquam erat volutpat. Nam auctor, arcu vitae aliquam ultricies, elit nunc sodales nisl, eu cursus nibh est ut libero. Sed nec est eget nunc ultrices cursus. Sed sit amet diam ac ante aliquam tempus. Nulla facilisi. Nulla facilisi. Sed nec aliquet magna. Nulla facilisi. Sed ac magna sed nunc ultricies luctus. Nullam auctor, velit a aliquam ultricies, elit nunc sodales nisl, eu cursus nibh est ut libero. Sed nec est eget nunc ultrices cursus. Sed sit amet diam ac ante aliquam tempus. Nulla facilisi. Nulla facilisi. Sed nec aliquet magna.',
          },
          {
            title: 'Hello World 3',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dui sed ante volutpat sodales. Sed vitae semper nisl.'
          },
        ];

        randomPosts.forEach(async (post) => {
          await createPost(post.title, post.content);
        });

        resolve(true);
      } catch (error) {
        if (error) {
          reject(error);
        }
      }
    });
  });
};

const getPosts = () => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM posts
    `, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getComments = () => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM comments
    `, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getLikes = () => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM likes
    `, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getLikesByPostId = (postId) => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM likes
      WHERE postId = ?
    `, [postId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const createPost = (title, content) => {
  return new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO posts (title, content)
      VALUES (?, ?)
    `, [title, content], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          title,
          content,
        });
      }
    });
  });
};

const editPost = (id, title, content) => {
  return new Promise((resolve, reject) => {
    db.run(`
      UPDATE posts
      SET title = ?, content = ?
      WHERE id = ?
    `, [title, content, id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`
      DELETE FROM posts
      WHERE id = ?
    `, [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const createComment = (postId, comment) => {
  return new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO comments (postId, comment)
      VALUES (?, ?)
    `, [postId, comment], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const editComment = (id, comment) => {
  return new Promise((resolve, reject) => {
    db.run(`
      UPDATE comments
      SET comment = ?
      WHERE id = ?
    `, [comment, id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const likePost = (id) => {
  return new Promise(async (resolve, reject) => {
     const likes = await getLikesByPostId(id);
     if (likes.length) {
        const like = likes[0].like + 1;
        db.run(`
          UPDATE likes
          SET like = ?
          WHERE postId = ?
        `, [like , id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
     } else {
        db.run(`
          INSERT INTO likes (postId, like)
          VALUES (?, 1)
        `, [id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
     }
  });
};

const dislikePost = (id) => {
  return new Promise(async (resolve, reject) => {
     const likes = await getLikesByPostId(id);
     if (likes.length) {
        const dislike = likes[0].dislike + 1;
        db.run(`
          UPDATE likes
          SET dislike = ?
          WHERE postId = ?
        `, [dislike , id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
     } else {
        db.run(`
          INSERT INTO likes (postId, dislike)
          VALUES (?, 1)
        `, [id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
     }
  });
};


module.exports = {
  setDatabasePath,
  connect,
  disconnect,
  initializeDatabase,
  getPosts,
  getComments,
  getLikes,
  createPost,
  editPost,
  deletePost,
  createComment,
  editComment,
  likePost,
  dislikePost,
};