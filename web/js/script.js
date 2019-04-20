$(function() {
    /* Foot Dimension Deatails btn */
    $("#mesurments-btn").click(function() {
        $("#mesurments").removeClass("hide");
    });

    /* Choice between "predefined color model" and "color picker" */
    $(".pickerNav__item").click(function() {
        $(".pickerNav__item").removeClass("active");
        $(this).addClass("active");

        $("#slider").addClass("hide");
        $("#colors").addClass("hide");

        if (this.id === "pickerNav-predefined") {
            $("#slider").removeClass("hide");
        } else if (this.id === "pickerNav-colors") {
            $("#colors").removeClass("hide");
        }
    });

    /* Adding active class on "predefined color model" item */
    $(".card-item").click(function() {
        $(".card-item").removeClass("active");
        $(this).addClass("active");
    });



});

