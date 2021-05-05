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
            scoresArr.sort(function(a, b) {
                return a[1]-b[1];
            });
            
            Array.prototype.sortOn = function(key){
                this.sort(function(a, b){
                    if(a[key] < b[key]){
                        return 1;
                    }else if(a[key] > b[key]){
                        return -1;
                    }
                    return 0;
                });
            }
            scores.sortOn("score");

            var top5scores = [];

            // select top 5 scores only
            top5scores.push(scores[0]["name"],scores[0]["score"]);
            top5scores.push(scores[1]["name"],scores[1]["score"]);
            top5scores.push(scores[2]["name"],scores[2]["score"]);
            top5scores.push(scores[3]["name"],scores[3]["score"]);
            top5scores.push(scores[4]["name"],scores[4]["score"]);
            
            console.log(top5scores);
            //console.log(top5scores);
            var leaderboardTable = "<table><tr><th>Name</th><th>Score</th></tr>";
             for (let i=0;i<10; i++) {
                leaderboardTable += "<tr><td>" + top5scores[i] + "</td>";
                leaderboardTable += "<td>" + top5scores[i+1] + "</td></tr>";
                i++
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