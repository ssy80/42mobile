/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
//import {onRequest} from "firebase-functions/https";
//import * as logger from "firebase-functions/logger";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import axios from "axios";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const exchangeGithubCode = onCall(async (request) => {
  // In v2, 'data' and 'auth' are inside the 'request' object
  const { code } = request.data;
  
  // These should ideally be set via: 
  // firebase functions:secrets:set GITHUB_CLIENT_SECRET
  const CLIENT_ID = "Ov23lioL9lVfMBNOxnIh";
  const CLIENT_SECRET = "15dcabd4ddfe8efbfbb8b5b713a090d9c570fea2"; 

  if (!code) {
    throw new HttpsError("invalid-argument", "The function must be called with a 'code'.");
  }

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      },
      { 
        headers: { Accept: "application/json" } 
      }
    );

    // Returns the access_token and other info to the mobile app
    return response.data; 

  } catch (error: any) {
    console.error("GitHub Exchange Error:", error.response?.data || error.message);
    throw new HttpsError("internal", "Failed to exchange code with GitHub.");
  }
});