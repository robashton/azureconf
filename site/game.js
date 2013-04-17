$(function() {
  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('keyup', onKeyUp)
  $('#btn-submit-score').click(submitScore)
  $('#btn-submit-confirm').click(submitConfirm)
  $('#btn-reset-score').click(resetScore)

  var timerid = null
    , score = 0
    , scoreElement = $('#score')
    , finalScoreElement = $('#final-score')
    , containers = {
      'instructions': $('#instructions'),
      'scoring': $('#scoring'),
      'result': $('#result')
    }

  function onKeyDown(e) {
    if(e.keyCode === 32)
      startScoring()
  }

  function onKeyUp(e) {
    if(e.keyCode === 32)
      stopScoring()
  }

  function submitScore() {
    $('#submit-modal').modal('show')
  }

  function submitConfirm() {
    var name = $('#name').val()
    $.ajax({
     url: '/scores',
     data: { name: name, score: score },
     type: 'POST',
     success: function() {
       $('#submit-modal').modal('hide')
       showContainer('instructions')
      }
    })
  }

  function resetScore() {
    showContainer('instructions')
  }

  function startScoring() {
    if(timerid) return
    score = 0
    showContainer('scoring')
    timerid = setInterval(increaseScore, 30)
  }

  function stopScoring() {
    showContainer('result')
    clearInterval(timerid)
    timerid = null
    finalScoreElement.text(score)
  }

  function increaseScore() {
    score += 1
    scoreElement.text(score)
  }

  function showContainer(name) {
    for(var n in containers)
      if(n !== name)
        containers[n].hide()
      else
        containers[n].show()
  }

})

