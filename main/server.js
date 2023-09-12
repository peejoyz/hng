const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// app.use(cors());

app.get('/api', (req, res) => {
    const slack_name = req.query.slack_name;
    const track = req.query.track;

    //Get current time in UTC
    const utcTime = new Date();
    const utcOffset = utcTime.getTimezoneOffset();
    const localTime = new Date(utcTime.getTime())
    const localTimeUtc = new Date(utcTime.getTime() + utcOffset * 60 * 60 * 1000)

    //Get current day of the week
    const current_day = localTime.toLocaleString('en-US', {weekday: 'long'});

    //Get GitHub URL of the file being run
    const fileGitHubUrl = `https://github.com/peejoyz/hng/H-blob/main/server.js`;

    //Get Github url of the full source code
    const sourceUrl = 'https://github.com/peejoyz/hng'

    //Return the information in JSON format
    res.json({
        slack_name,
        current_day: current_day,
        utc_time:localTime.toISOString().split('.')[0] + 'Z',
        track: track,
        github_file_url: fileGitHubUrl,
        github_repo_url:sourceUrl,
        status_code: 200
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})