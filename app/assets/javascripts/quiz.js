let default_score = 50;
let added = 0;
let next_question = true;

function next(clicked_id){
    let next_id = parseInt(clicked_id)+1;
    let val = 0;
    if (clicked_id === "2"){
        val = getCheckedBoxes(("form_q"+clicked_id+"[q"+clicked_id+"]"));
    }
    else {
        val = getRadioVal(("form_q"+clicked_id+"[q"+clicked_id+"]"), clicked_id)
    }

    if(next_question) {
        default_score += val;
        added = val;
        document.getElementById("warn"+clicked_id).classList.add("d-none");
        console.log(default_score);
        if (clicked_id === "3") {
            localStorage.setItem("score", default_score);
            sendResult(default_score);
            window.location.href = "/result";
        } else {
            document.getElementById("q" + clicked_id).classList.add("d-none");
            document.getElementById("q" + next_id).classList.remove("d-none");
        }
    }
}

function previous(clicked_id) {
    let id = parseInt(clicked_id.match(/\d+/g));
    let previous_id = id - 1;

    default_score-= added;
    document.getElementById("q" + id).classList.add("d-none");
    document.getElementById("q" + previous_id).classList.remove("d-none");
}


function getRadioVal(name, id) {
    let val;
    // get list of radio buttons with specified name
    let radios = document.getElementsByName(name);
    let checked = 0;

    // loop through list of radio buttons
    for (let i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            checked++;
            break; // and break out of for loop
        }
    }
    if (checked === 0){
        next_question = false;
        document.getElementById("warn"+id).classList.remove("d-none");
    } else {
        next_question = true;
    }
    return parseInt(val); // return value of checked radio or undefined if none checked
}

function getCheckedBoxes(name) {
    let val = 0;
    let checkboxes = document.getElementsByName(name);
    let checked = 0;

    // loop over them all
    for (let i=0; i<checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            val+= parseInt(checkboxes[i].value);
            checked++;
        }
    }
    if (checked == 0){
        next_question = false;
        document.getElementById("warn2").classList.remove("d-none");
    } else {
        next_question = true
    }
    return parseInt(val);
}

function sendResult(score) {
  $.ajax({
      async: false,
      type: 'POST',
      url: '/store_metric',
      data: { score }
  })
}