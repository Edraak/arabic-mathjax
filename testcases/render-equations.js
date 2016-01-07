jQuery(function($) {
    $.get('equations.html', function(template) {
        var rendered = Mustache.render(template, {
            equations: EQUATIONS
        });

        $('#equations').html(rendered);


        var render = function() {
            var $scriptTemplate = $('<script type="math/tex; mode=display"><\/script>');
            var equation = $('#dynamic-equation').val();

            $('#dynamic-ar').html(
                $scriptTemplate.clone().html(
                    '\\ar{' + equation + '}'
                )
            );

            $('#dynamic-en').html(
                $scriptTemplate.clone().html(
                    equation
                )
            );

            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        };

        $('#dynamic-equation').change(render);
        $('#show-dynamic-equation').click(render);

        MathJax.Hub.Configured();

        render();
    });
});
