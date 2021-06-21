$(document).ready(function () {
    function sidebar_fix() {
        $(".column-left>#sidebar").css({ width: "auto" });
        var w = $(".column-left>#sidebar").width();
        $(".column-left>#sidebar").css({ width: w });
    }
    function columleft_fix() {
        $(".column-left").css({ "min-height": "inherit" });
        $(".column-right").css({ "min-height": "inherit" });
        if ($(window).width() >= 768) {
            var cR = $(".column-right").height() + 40;
            var cL = $(".column-left").height() + 40;
            if (cR > cL) {
                $(".column-left").css({ "min-height": cR });
                //return true;
                $('.column-left>#sidebar').affix({
                    offset: {
                        top: 0,
                        bottom: function () {
                            return (this.bottom = $('footer').outerHeight(true) + 20)
                        }
                    }
                });
            } else {
                $(".column-right").css({ "min-height": cL });
            }
        }
    }
    $(".img-responsive").load(function () {
        columleft_fix();
    });
    $(".column-right").bind("DOMSubtreeModified", function () {
        columleft_fix();
    });
    $(window).resize(function () {
        sidebar_fix();
        columleft_fix();
    });
    // Custom Selects
    if ($('[data-toggle="select"]').length) {
        $('[data-toggle="select"]').select2();
    }
    $("[contenteditable=true]").bind("DOMSubtreeModified", function () {
        columleft_fix();
    });
    $("[contenteditable=true]").keypress(function (key) {
        if (key.charCode == 13) {
            key.preventDefault();
            $("form").submit();
        }
    });
    $("[data-toggle='tooltip']").tooltip();
    $('#Change-Image,#ChangeImage').click(function (event) {
        $('#Imagen').click();
    });
    //capture selected filename
    $('#Imagen').change(function (event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        var original = $("#IMGImagen").data("src");
        $("#IMGImagen").fadeIn("slow").attr('src', tmppath != null ? URL.createObjectURL(event.target.files[0]) : (original != null ? original : "Images/evnt_upload_image.jpg"));
        $("#IMGImagen").load(function () {
            columleft_fix();
        });
    });
    $("#Revert-Image").click(function () {
        var original = $("#IMGImagen").data("src");
        $("#IMGImagen").fadeIn("slow").attr('src', original);
        $("#IMGImagen").load(function () {
            columleft_fix();
        });
    });
    $(document).on("click",".removeSeccion",function () {
        $(this).parent().remove();
        reIndexSecciones();
    })    
    $("#switchTheme").change(function () {
        var theme = $(this).val();
        loadThemeByName(theme);
    });
    $("#nuevaSeccion").on("click", function () {
        $.ajax("/Evento/TemplateSeccionNew", {
            type: "GET"
        }).success(function (response) {
            $("#seccionesEvento").append(response);
            reIndexSecciones();
            $("[data-toggle='tooltip']").tooltip();
        });
    });
    function loadThemeByName(styleTitle) {
        var exist = $("link[title='" + styleTitle + "']");
        if (exist.length != 0) {
            var styles = $("link[media=screen]");
            $.each(styles, function (clave, valor) {
                var title = $(valor).attr('title');
                if (title == styleTitle) {
                    $(valor).removeAttr('disabled');
                } else {
                    $(valor).attr('disabled', "true");
                }
            });
            localStorage.theme = styleTitle;
            $("#ThemeSelected").text(styleTitle);
            $('#switchTheme').val(styleTitle);
        }

    }
    //loadTheme("Secundario");
    function loadTheme() {
        if (localStorage.theme) {
            loadThemeByName(localStorage.theme)
        }
    }
    function reIndexSecciones() {
        var secciones = $(".seccion");
        $.each(secciones, function (key, value) {
            var inputs = $(value).find("input");
            $.each(inputs, function (key2, value2) {
                var name = $(value2).attr("name").replace(/([0-9])/g, key);
                $(value2).attr("name", name);
            });
            var targets = $(value).find("[data-form-target]");
            $.each(targets, function (key2, value2) {
                var data = $(value2).data("form-target").replace(/([0-9])/g, key);
                $(value2).attr("data-form-target", data);
            });
        });
    }
    loadTheme();
    columleft_fix();
    sidebar_fix();
})