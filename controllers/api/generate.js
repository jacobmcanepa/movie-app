const router = require('express').Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateMovies(genre) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: 'Suggest one popular ' + genre + ' movie',
    temperature: 0.6
  });

  return response;
};

router.post('/', (req, res) => {
  generateMovies(req.body.genre)
    .then(response => {
      console.log(response);
      res.status(200).json({ result: response.data.choices });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;