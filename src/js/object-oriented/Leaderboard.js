import axios from 'axios'

function getScores() {
    
    axios.get('http://localhost:3000/scores')
    .then(res => {
        if (res.data.success === 1) {
            var scores = res.data.result;
            // Sort scores to return the top 10
            var scoresArr = [];
            console.log(scores);
            for (let i=0;i<scores.length;i++) {
                scoresArr.push(scores[i]["score"], scores[i]);
            }
        /*     for (var score in scores) {
                scoresArr.push([score, scores[score]]);
                console.log(score);
            } */

            scoresArr.sort(function(a, b) {
                return a[1]-b[1];
            });
            console.log(scoresArr);
            var top5scores = [];
            // If there are fewer than 5 scores, just use all the scores for the leaderboard
            var nTopScores = scoresArr.length>=5 ? 5: scoresArr.length
            for (let i=0; i<nTopScores; i++) {
                top5scores.push([scoresArr[i][1]["name"],scoresArr[i][1]["score"]]);
            }
            console.log(top5scores);
            var leaderboardTable = "<table><tr><th>Name</th><th>Score</th></tr>";
            for (let i=0;i<top5scores.length; i++) {
                leaderboardTable += "<tr><td>" + top5scores[i][0] + "</td>";
                leaderboardTable += "<td>" + top5scores[i][1] + "</td></tr>";
            }
            leaderboardTable += "</table>";
            const leaderboardEl = document.getElementById('leaderboardtable');
            leaderboardEl.innerHTML = leaderboardTable;
        }
    })
    .catch(err => {
    console.log(err);
    })
}


getScores();