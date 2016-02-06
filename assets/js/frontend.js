function mc_error(message, id) {
    alert(message);
    jQuery('#' + id).focus();
}

function mc_convertInchestoCM(inches) {
    return inches * 2.54;
}

function mc_convertPoundstoKilograms(lbs) {
    return lbs / 2.2046226218;
}

function mc_calcMifflinBMR(kg, cm, age) {
    bmr = (10 * kg) + (6.25 * cm) - (5 * age);
    if (gender == "m") {
        bmr = bmr + 5
    } else {
        bmr = bmr - 161
    }

    return bmr;
}

jQuery( document ).ready( function ( e ) {
    jQuery( "#form-macro-calculator" ).submit(function( event ) {
        event.preventDefault();

        // Validate and fetch data
        age = jQuery('#age').val();
        if (!age ||  !jQuery.isNumeric(age) || age < 10) {
            mc_error("A valid age is required", "age");
            return;
        }

        weight = jQuery('#weight').val();
        if (!weight ||  !jQuery.isNumeric(weight)) {
            mc_error("A valid weight is required", "weight");
            return;
        }

        inches = jQuery('#inches').val();
        if (!inches  ||  !jQuery.isNumeric(inches) || inches < 36) {
            mc_error("A valid height (in inches) is required", "inches");
            return;
        }

        gender = jQuery('input[name=gender]:checked').val();
        if (!gender) {
            alert("A valid gender is required");
            return;
        }

        goal = jQuery('input[name=goals]:checked').val()
        if (!goal) {
            alert("A valid goal is required");
            return;
        }

        // Get BMR
        bmr = mc_calcMifflinBMR(mc_convertPoundstoKilograms(weight), mc_convertInchestoCM(inches), age, gender);
        // Get TDEE
        tdee = bmr * jQuery('#activity').val();

        //Display results
        jQuery('#bmr').html(Math.ceil(bmr));
        jQuery('#tdee').html(Math.ceil(tdee));
        jQuery('#result').removeClass("hidden");
    });
});
