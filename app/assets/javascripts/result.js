let name = document.getElementById("payment_option_name");
let box = document.getElementById("payment_option_box");
let extra1 = document.getElementById("extra1");
let extra2 = document.getElementById("extra2");
let payment_text = document.getElementById("payment_options_text");
let paymentSelected;

$(document).ready(function() {
    let score = localStorage.getItem("score");
    console.log(score);
    let result = calculateResult(score);
    document.getElementById(result).classList.remove("d-none");
    setupGauge(score);
});

function calculateResult(val){
    let result = "results";
    let text = document.getElementById("gauge-text");
    if(val<30){
        result += "1";
        text.innerHTML = "Poor";
    }
    else if (val<=71){
        result += "2";
        text.innerHTML = "Average";
    }
    else {
        result += "3";
        text.innerHTML = "Above Average";
    }
    return result;
}

function showSubscribe(paymentOption){
    let price = document.getElementById("price_text");
    let feature_description = document.getElementById("feature_description");
    paymentSelected = paymentOption;

    switch(paymentOption){
        case "bronze":
            name.innerHTML = "BRONZE PLAN";
            price.innerHTML = "FREE";
            feature_description.innerHTML = "Take our expanded quiz and view general feedback.";
            break;
        case "silver":
            name.innerHTML = "SILVER PLAN";
            name.classList.remove("text-light");
            name.classList.add("text-dark");
            feature_description.innerHTML = "Take our expanded quiz and view answers and specific feedback with tailored tips.";
            extra1.classList.remove("d-none");
            price.innerHTML = "£5.99/year";
            break;
        case "gold":
            name.innerHTML = "GOLD PLAN";
            name.classList.remove("text-light");
            name.classList.add("text-dark");
            feature_description.innerHTML = "Take our expanded quiz and view answers and specific feedback with tailored tips.";
            extra1.classList.remove("d-none");
            extra2.classList.remove("d-none");
            price.innerHTML = "£7.99/year";
            document.getElementById("back").style.marginBottom = "30rem";
            break;
    }
    box.classList.add(paymentOption);
    name.classList.add(paymentOption);

    payment_text.classList.add("d-none");
    document.getElementById("payment_options").classList.add("d-none");
    document.getElementById("subscribe").classList.remove("d-none");

    sendPlanSelection(paymentOption);
}

function hideSubscribe() {
    document.getElementById("payment_options").classList.remove("d-none");
    payment_text.classList.remove("d-none");
    document.getElementById("subscribe").classList.add("d-none");
    name.classList.remove("text-dark");
    name.classList.add("text-light");
    name.classList.remove(paymentSelected);
    box.classList.remove(paymentSelected);

    extra1.classList.add("d-none");
    extra2.classList.add("d-none");
}

//Gauge
function setupGauge(val){
    let opts = {
        angle: 0.01, // The span of the gauge arc
        lineWidth: 0.29, // The line thickness
        radiusScale: 0.93, // Relative radius
        pointer: {
            length: 0.55, // // Relative to gauge radius
            strokeWidth: 0.099, // The thickness
            color: '#000000' // Fill color
        },
        limitMax: false,     // If false, max value increases automatically if value > maxValue
        limitMin: false,     // If true, the min value of the gauge will be fixed
        strokeColor: '#E0E0E0',  // to see which ones work best for you
        percentColors: [[0.0, "#ff0000" ], [0.31, "#f9c802"], [1.0, "#30B32D"]],
        staticZones: [
            {strokeStyle: "#ff0000", min: 0, max: 30}, // Red from 0 to 30
            {strokeStyle: "#f9c802", min: 30, max: 70}, // Yellow
            {strokeStyle: "#30B32D", min: 70, max: 100}, // Green
        ],
        generateGradient: true,
        highDpiSupport: true     // High resolution support
    };
    let target = document.getElementById('canvas-gauge'); // your canvas element
    let gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 100; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 128; // set animation speed (32 is default value)
    gauge.set(val); // set actual value
}

function sendPlanSelection(plan) {
  $.ajax({
      async: false,
      type: 'POST',
      url: '/store_metric',
      data: { plan }
  })
}
