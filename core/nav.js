const nav_btn_id_to_html_path = {
    nav_btn_home: "core/home.html",
    nav_btn_about: "core/about.html"
};


function set_inner_html(source_html_path, destination_element_id) {

    // read source html
    const request = new XMLHttpRequest();
    request.open("GET", source_html_path);
    request.send();

    // update inner html
    request.onload = function() {
        if (request.status = 200) {
            document
                .getElementById(destination_element_id)
                .innerHTML = request.responseText;
        };
    };
};


function set_startup_nav_and_main(nav_btn_id) {

    // select nav_btn
    document
        .getElementById(nav_btn_id)
        .classList
        .replace("nav_btn_unselected", "nav_btn_selected");

    // set main
    const source_html_path = nav_btn_id_to_html_path[nav_btn_id];

    set_inner_html(source_html_path, "main_panel_current");
};


function update_nav_selection(nav_btn_id) {

    // get nav btn element
    const nav_btn_element = document.getElementById(nav_btn_id);

    // cancel update if nav btn is already selected
    if (nav_btn_element.classList.contains("nav_btn_selected")) {
        return;
    };

    // clear prior selection
    document
        .getElementById("nav_list")
        .getElementsByClassName("nav_btn_selected")
        .item(0)
        .classList
        .replace("nav_btn_selected", "nav_btn_unselected");

    // set new selection
    nav_btn_element
        .classList
        .replace("nav_btn_unselected", "nav_btn_selected");
};


function react_to_nav_button_click(event) {

    // get nav btn id
    const nav_btn_id = event.target.id;

    // update nav selection
    update_nav_selection(nav_btn_id);

    // get html path
    const source_html_path = nav_btn_id_to_html_path[nav_btn_id];

    // update main
    set_inner_html(source_html_path, "main_panel_current");

};


function add_event_listeners_to_nav_btns() {

    Array.from(document.getElementsByClassName("nav_btn")).forEach(
        function(nav_btn) {
            nav_btn.addEventListener("click", react_to_nav_button_click);
        }
    );

};


function set_up_nav() {
    set_startup_nav_and_main("nav_btn_home");

    add_event_listeners_to_nav_btns();
};


window.addEventListener('load', set_up_nav);
