function rangeSlider() {
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

var TAB_VS_CONTENT_MAP = {
    'allTab': '#allTabContent',
    'specificTab': '#specificTabContent'
}

function onTabClick(event) {
    event.stopPropagation();
    var tabId = event.target.id;
    if (tabId === 'allTab') {
        $(TAB_VS_CONTENT_MAP['allTab']).show();
        $(TAB_VS_CONTENT_MAP['specificTab']).hide();
        $('#allTab').toggleClass("nav_active");
        $('#specificTab').toggleClass("nav_active");

    } else if (tabId === 'specificTab'){
        $(TAB_VS_CONTENT_MAP['allTab']).hide();
        $(TAB_VS_CONTENT_MAP['specificTab']).show();
        $('#allTab').toggleClass("nav_active");
        $('#specificTab').toggleClass("nav_active");
    }
}