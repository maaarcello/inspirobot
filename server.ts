const cron = require("node-cron");
const axios = require("axios").default;
const Fs = require("fs");
const Path = require("path");
require("dotenv").config();

console.log("Cron job started");

const EVERY_15_MIN_MON_FRI = "*/15 9-18 * * 1-5";
const EVERY_MINUTE = "* * * * *";

cron.schedule(
  EVERY_MINUTE,
  () => {
    console.log("running a task every 30 mins every day of week");
    getAndPush();
  },
  {
    timezone: "Europe/Zurich",
  }
);

const getAndPush = () =>
  axios.get("https://inspirobot.me/api?generate=true").then((res: any) => {
    console.log(res.data);
    const adaptive = {
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          contentUrl: null,
          content: {
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            type: "AdaptiveCard",
            version: "1.2",
            body: [
              {
                type: "Image",
                url: res.data,
              },
            ],
          },
        },
      ],
    };
    axios.post(process.env.WEBHOOK_URL, adaptive).then(
      (response) => {
        console.log(response.status);
      },
      (error) => {
        console.log(error);
      }
    );
  });
