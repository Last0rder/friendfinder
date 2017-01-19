var friendList = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendList);
  });

  app.post("/api/friends", function(req, res) {

    var match = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference = 0;

    for (var i = 0; i < friendList.length; i++) {

      console.log(friendList[i].name);
      totalDifference = 0;

      for (var j = 0; j < friendList[i].scores[j]; j++) {

        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendList[i].scores[j]));

        if (totalDifference <= match.friendDifference) {

          match.name = friendList[i].name;
          match.photo = friendList[i].photo;
          match.friendDifference = totalDifference;
        }
      }
    }

    friendList.push(userData);

    res.json(match);

  });

};
