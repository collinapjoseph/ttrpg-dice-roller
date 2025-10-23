$(document).ready(function () {
  const diceRollAudio = new Audio("./audio/dice-142528.mp3");
  
  $(".roll-btn").on("click", function () {
    // play audio
    diceRollAudio.play();
    
    // get text input
    var inputText = $(".dice-input").val();
    console.log(`Input: ${inputText}`);

    // compute each dice roll
    var rollResult = 0;
    var diceMatch = inputText.matchAll(/([\+\-])?\s*(\d+)d(\d+)/g);
    for(const m of diceMatch){
      var diceSign = 1;
      
      if (m[1]){
        diceSign = Number(m[1]+"1")
      }
      
      var diceCount = Number(m[2]);
      var diceValue = Number(m[3]);
      
      for (var i = 0; i < diceCount; i++) {
        var rollValue = Math.floor(Math.random() * diceValue) + 1;
        rollResult += diceSign * rollValue;
        console.log(`Die 1d${diceValue} #${i + 1}: ${rollValue}`);
      }
    }
    
    // apply modifier
    var modifierMatch = inputText.matchAll(/[+\-]?\s*\b\d+\b/g);
    for(const m of modifierMatch){
      if (m[0]){
        var modifierValue = Number(m[0].replace(" ", ""));
        rollResult += modifierValue;
        console.log(`Modifier: ${modifierValue}`);
      }
    }

    // set result text
    $(".roll-result").text(rollResult);
    $(".roll-result").css("visibility", "visible");
  });
});
