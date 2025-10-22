$(document).ready(function () {
  const diceRollAudio = new Audio("./audio/dice-142528.mp3");
  
  $(".roll-btn").on("click", function () {
    // play audio
    diceRollAudio.play();
    
    // get text input
    var inputText = $(".dice-input").val();
    console.log(`Input: ${inputText}`);

    // Parse: dice quantity, dice value, modifier
    // TODO: support unlimited sequence of dice and modifiers
    var dice = inputText.match(
      /(?<quantity>\d+)d(?<value>\d+)\s*(?<modSign>[\+\-])?\s*(?<modValue>\d+)?/
    );

    // compute each dice roll
    var rollResult = 0;
    var diceQuantity = Number(dice.groups.quantity);
    var diceValue = Number(dice.groups.value);
    for (var i = 0; i < diceQuantity; i++) {
      var rollValue = Math.floor(Math.random() * diceValue) + 1;
      rollResult += rollValue;
      console.log(`Die #${i + 1}: ${rollValue}`);
    }

    // apply modifier
    if (dice.groups.modSign) {
      if (dice.groups.modSign == "+") {
        rollResult += Number(dice.groups.modValue);
      } else {
        rollResult -= Number(dice.groups.modValue);
      }
      console.log(`Modifier: ${dice.groups.modSign}${dice.groups.modValue}`);
    } else {
      console.log("No modifier included.");
    }

    // set result text
    $(".roll-result").text(rollResult);
    $(".roll-result").css("visibility", "visible");
  });
});
