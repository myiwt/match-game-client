import axios from 'axios'

function getScores() {
    
    axios.get('http://localhost:3000/scores')
    .then(res => {
        if (res.data.success === 1) {
            var scores = res.data.result;
            // Sort scores to return the top 10
            var scoresArr = [];
            for (let i=0;i<scores.length;i++) {
                scoresArr.push(scores[i]["score"], scores[i]);
            }
            console.log(scoresArr);
            scoresArr.sort(function(a, b) {
                return a[1]-b[1];
            });
            
            var top5scores = [];
            
            // select top 5 scores only
            top5scores.push([scoresArr[1]["name"],scoresArr[1]["score"]]);
            top5scores.push([scoresArr[3]["name"],scoresArr[3]["score"]]);
            top5scores.push([scoresArr[5]["name"],scoresArr[5]["score"]]);
            top5scores.push([scoresArr[7]["name"],scoresArr[7]["score"]]);
            top5scores.push([scoresArr[9]["name"],scoresArr[9]["score"]]);

            //console.log(top5scores);
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