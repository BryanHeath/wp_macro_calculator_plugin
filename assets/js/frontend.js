var tdee, weight;

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
    var bmr = (10 * kg) + (6.25 * cm) - (5 * age);
    var gender = jQuery('input[name=gender]:checked').val();

    if (gender == "m") {
        bmr = bmr + 5
    } else {
        bmr = bmr - 161
    }

    return bmr;
}

jQuery( document ).ready( function ( e ) {
    jQuery("#calculate_tdee").click(function( event ) {
        event.preventDefault();

        // Validate and fetch data
        var age = jQuery('#age').val();
        if (!age ||  !jQuery.isNumeric(age) || age < 10) {
            mc_error("A valid age is required", "age");
            return;
        }

        weight = jQuery('#weight').val();
        if (!weight ||  !jQuery.isNumeric(weight)) {
            mc_error("A valid weight is required", "weight");
            return;
        }

        var inches = jQuery('#inches').val();
        if (!inches  ||  !jQuery.isNumeric(inches) || inches < 36) {
            mc_error("A valid height (in inches) is required", "inches");
            return;
        }

        var gender = jQuery('input[name=gender]:checked').val();
        if (!gender) {
            alert("A valid gender is required");
            return;
        }

        // Get BMR
        var bmr = mc_calcMifflinBMR(mc_convertPoundstoKilograms(weight), mc_convertInchestoCM(inches), age, gender);
        // Get TDEE
        tdee = bmr * jQuery('#activity').val();

        //Display results
        jQuery('#bmr').html(Math.ceil(bmr));
        jQuery('#tdee').html(Math.ceil(tdee));
        jQuery('#result').removeClass("hidden");
        jQuery('.div_plan').removeClass("hidden");
        jQuery("body, html").animate({
            scrollTop: jQuery( jQuery('#calculate_tdee') ).offset().top
        }, 600);
    });

    jQuery("#goal").change(function( event ) {
        var goal = jQuery("#goal").val();
        jQuery('#intensity-loss').addClass("hidden");
        jQuery('#intensity-gain').addClass("hidden");
        if (goal == 'loss') {
            jQuery('#intensity-loss').removeClass("hidden");
        } else if (goal == 'gain') {
            jQuery('#intensity-gain').removeClass("hidden");
        }
    });

    jQuery("#create_plan").click(function( event ) {
        event.preventDefault();

        var goal = jQuery("#goal").val();
        if (!goal || goal == 0) {
            mc_error("A valid goal is required", "goal");
            return;
        }

        var plan_tdee = null;

        if (goal == 'loss') {
            if (!jQuery('#intensity-loss').val() || jQuery('#intensity-loss').val() == 0) {
                mc_error("A valid goal is required", "intensity-loss");
                return;
            }
            plan_tdee = tdee - (tdee * jQuery('#intensity-loss').val());
        } else if (goal == 'gain') {
            if (!jQuery('#intensity-gain').val() || jQuery('#intensity-gain').val() == 0) {
                mc_error("A valid goal is required", "intensity-gain");
                return;
            }
            plan_tdee = tdee + (tdee * jQuery('#intensity-gain').val());
        } else {
            plan_tdee = tdee;
        }

        var protein = jQuery("input[name=protein]:checked").val();
        var fat = jQuery("input[name=fat]:checked").val();

        var protein_per_day = weight * protein;
        var fat_per_day = weight * fat;
        var carbs_per_day = (plan_tdee - ((protein_per_day * 4) + (fat_per_day * 9))) / 4;

        var meals = jQuery('#meals').val();

        jQuery('#div_plan').removeClass("hidden");

        jQuery('#carbs_per_day').html(Math.ceil(carbs_per_day));
        jQuery('#protein_per_day').html(Math.ceil(protein_per_day));
        jQuery('#fat_per_day').html(Math.ceil(fat_per_day));
        jQuery('#calories_per_day').html(Math.ceil(plan_tdee));

        jQuery('#carbs_per_meal').html(Math.ceil(carbs_per_day / meals));
        jQuery('#protein_per_meal').html(Math.ceil(protein_per_day / meals));
        jQuery('#fat_per_meal').html(Math.ceil(fat_per_day / meals));
        jQuery('#calories_per_meal').html(Math.ceil(plan_tdee / meals));

        jQuery('#create_plan').html("Recalculate");
    });

    jQuery("#meals").change(function() {
        jQuery("#create_plan").trigger("click");
    });
});
