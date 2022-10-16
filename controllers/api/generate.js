const router = require('express').Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateMovies(amount, type, genre, era) {
  if (amount != 'one') {
    let response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: 'Suggest a numbered list of ' + amount + ' ' + type + ' ' + genre + ' movies made in the ' + era +"'s",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    return response;
  } 
  else {
    let response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: 'Suggest a ' + type + ' ' + genre + ' movie made in the ' + era +"'s",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    return response;
  }
};

router.post('/', (req, res) => {
  generateMovies(req.body.amount, req.body.type, req.body.genre, req.body.era)
    .then(response => {
     console.log(response.config.data);
      res.status(200).json({ result: response.data.choices });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;