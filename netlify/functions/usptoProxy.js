const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { serial } = event.queryStringParameters;

  if (!serial) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing serial number" }),
    };
  }

  try {
    const response = await fetch(`https://tsdr.uspto.gov/ts/cd/casedocs/sn${serial}/info.json`);

    if (!response.ok) {
      throw new Error(`USPTO responded with status ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch from USPTO", detail: error.message }),
    };
  }
};
