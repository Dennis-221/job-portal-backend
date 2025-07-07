// init-db.js
const fs = require("fs");
const path = require("path");
const db = require("./src/config/database");

const schema = fs.readFileSync(
  path.join(__dirname, "database/schema.sql"),
  "utf8"
);
const seeds = fs.readFileSync(
  path.join(__dirname, "database/seeds.sql"),
  "utf8"
);

db.exec(schema, (err) => {
  if (err) console.error("Error running schema:", err);
  else {
    console.log("✅ Schema created");
    db.exec(seeds, (err2) => {
      if (err2) console.error("Error running seeds:", err2);
      else console.log("✅ Seeds inserted");
    });
  }
});

// Job seeker JWT
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJUeXBlIjoiam9ic2Vla2VyIiwiaWF0IjoxNzUxODY3MzQ3LCJleHAiOjE3NTE4NzQ1NDd9.0BA99jWxuStBuODF8iLxsDbKFg6BREt4x6BgYH_r68c

// Employer JWT
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJUeXBlIjoiZW1wbG95ZXIiLCJpYXQiOjE3NTE4Njc0NTUsImV4cCI6MTc1MTg3NDY1NX0.pYnC933ZJB3Dz6OPJUHWYNjYTxj_T5axt6NdZpe4APQ
