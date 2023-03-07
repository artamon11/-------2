// const getData = (name, house) => {
//     fetch('./base.json')
//         .then((res) => res.json())
//         .then((data) => {
//             const array = category ? data.filter((item) => item[category] === value) : data

//             localStorage.setItem('goods', JSON.stringify(array))
//         })
// }
let inputText = document.querySelector('.inputText');
submitForm = document.querySelector('.submitForm');
descr = document.querySelector('.descr');
part = document.querySelectorAll('.part');
descrData = document.querySelectorAll('.descrData');


async function getResponse(text) {
    let response = await fetch('./base.json');
    let content = await response.json();
    let svg = document.querySelectorAll('path');
    // console.log(content);

    let list = document.querySelector('.posts')

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    if (text) {
        let key;

        for (key in content) {
            if ((content[key].house.toLowerCase() == text.toLowerCase()) || (content[key].name.toLowerCase().search(text.toLowerCase()) !== -1)) {
                list.innerHTML += `
        <li class='hoverLi' house='${content[key].house}'>${content[key].house}   ${content[key].name}</li>
        `
            }
            // console.log(content[key]);
        }
    }
    // let li = document.querySelectorAll('.hoverLi');
    // li.addEventListener('mouseenter', () => {
    //     li.classList.add('color1');
    //     console.log("click");
    // })

    $('li').on('mouseenter', function () {
        $(this).toggleClass('color1')
        let key;
        for (key in svg) {
            if (svg[key].getAttribute("descr-data") == $(this).attr('house')) {
                svg[key].classList.add('color2');
            }
            else{
                svg[key].classList.add('color3');
            }
        }
    });
    $('li').on('mouseleave', function () {
        $(this).removeClass('color1')
        for (key in svg) {
            if (svg[key].getAttribute("descr-data") == $(this).attr('house')) {
                svg[key].classList.remove('color2');
            }
            else{
                svg[key].classList.remove('color3');
            }
        }
    });
}

submitForm.addEventListener('click', (e) => {
    e.preventDefault();
    getResponse(inputText.value);
    // console.log(inputText.value);
    inputText.value = '';
})
$(document).keypress(function (e) {
    if (e.which == 13) {
        getResponse(inputText.value);
        // console.log(inputText.value);
        inputText.value = '';
    }
});
var allStates = $("svg.map1 > *");
allStates.on("click", (e) => {
    e.preventDefault();
    getResponse(descr.textContent);
    // console.log(descr.textContent);
    inputText.value = '';
})
// part.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log(part.content);
// })