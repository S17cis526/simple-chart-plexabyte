$(function() {
  var peerReviewCanvas = $('#peer-review')[0];
  var peerReviewCtx = peerReviewCanvas.getContext('2d');
  var colors = [
    'yellow',
    'purple',
    'silver',
    'green',
    'red',
    'blue',
    'orange',
    'fuschia',
    'cyan'
  ]
  peerReviewCtx.strokeText("Peer Review", 90, 10);
  for(var i=0; i<11; i++) {
    peerReviewCtx.fillText(10-i, 10, 30 + i*20);
    peerReviewCtx.moveTo(25, 30 + i*20);
    peerReviewCtx.lineTo(90, 30 + i*20);
  }
  peerReviewCtx.stroke();

  $.ajax({
    url: '/peerReview.json',
    dataType: 'json',
    success: function(data) {
      var categories = Object.keys(data);
      categories.forEach(function(category, index) {
        var value = data[category];
        var x = 30 + index * 10;
        var y = 30 + (10-value) * 20;
        var height = value * 20;
        peerReviewCtx.fillStyle = colors[index];
        peerReviewCtx.fillRect(x, y, 5, height);
        peerReviewCtx.fillRect(100, 80 + 20*index, 10, 10);
        peerReviewCtx.strokeText(100, 30 + 20 * index);
      });
    }
  });


  var pointDistributionCanvas = $('#point-distribution')[0];
  var pointDistributionCtx = pointDistributionCanvas.getContext('2d');
  $.ajax({
    url: '/pointDistribution.json',
    success: function(data) {
      var people = Object.keys(data);
      var total = Object.values(data).reduce(function(acc, val) {
        return acc + val;
      }, 0);
      var start = 0;
      var end = 0;
      people.forEach(function(person) {
        var percent = data[person] / total;
        var end = angle + percent * 2 * Math.PI;
        pointDistributionCtx.newPath();
        pointDistributionCtx.arc(100, 100, 80, start, end);
        start = end;
        pointDistributionCtx.fillStyle = colors[index];
        pointDistributionCtx.fill();
      });
    }
  });
});
