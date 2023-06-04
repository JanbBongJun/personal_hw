//clearㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 페이지정보가 수정됬을때 페이지를 리로드해오는게 아닌 데이터만 받아와서 화면에 표시ok
// 1. 두번째 시도에서 grid와 메서드를 사용하여 grid안에 db에 저장된 영화 수에 따라 동적으로 추가하도록 만들 계획 ok
// 3. 설명부분 스크롤하면 내려가게 구현 ok
// 4. 만약 페이지넓이가 작아지면 가로 3개 => 2개 => 1개로 줄어들도록 구현 ok
// 페이지 넓이가 작아질 때 추가로 다른 요소들도 어느정도 반영되도록 해보기 ok
// 5. DOM으로 js에 구현 ok
// 6. 클래스의 메서드와 함수 모두 이용하며 context를 이해하며, data를 인스턴스로 교환해보기 ok => 함수와 전역변수만을 이용해 만들어보기 ok(현재 코드)
// 스크롤 안보이게도 해보기 ok 주석처리
// 2. 목차를 만들어 페이지당 20개씩 구현하도록 할 계획  ok
// 페이지네이션 구현, 클릭하면 색 바뀌도록 해보기 ok
// 페이지 네이션은 5개의 숫자버튼과 next, previous버튼으로 구성 ok

let now_page_num = 1;
let total_page;
let movie_db, movie_db_length;
let all_content_container;
let btnMake;
let searched_db;
let edge;
let isSearchOpen = false;
let searchKeyword;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWYyZGZlMzc0NWZlYWU4MzY4ZDRhMjNkYzI4NDdiZSIsInN1YiI6IjY0NzA4ODdjNzI2ZmIxMDBhOGIyMmZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs13EVcaBz_bPjqdcVihiMrzB8QawtsgIWKEeBioIkI'
    }
};

window.onload = () => { //html문서가 준비되면 실행
    edge = document.getElementById('edge');
    all_content_container = document.getElementById('all_content_container')
    btnMake = ['1', '2', '3', '4', '5'].map(x => document.getElementById(x)) //배열의 map기능을 이용하여 , btnMake에 각각의 버튼 저장
    btnSet(1);
    setScreen(1);
};

async function setScreen(page_index) { //원하는 페이지인덱스의 db를 불러오고, container에 해당 요소들을 추가한다.
    let elements = document.getElementsByClassName("ask_repeat_search"); // "className"은 제거하려는 요소의 클래스 이름입니다.
    while (elements.length) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    let directoryHtml = "";
    change_color_btn(btnMake[(now_page_num - 1) % 5], btnMake[(page_index - 1) % 5])

    now_page_num = page_index; //현재 페이지 정보를 page_index로 수정
    if (!isSearchOpen) {
        await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=' + page_index, options)
            .then(response => response.json())
            .then((response) => {
                movie_db = response.results;
                movie_db_length = movie_db.length;
                total_page = response.total_pages;
                total_results = response.total_results;
                movie_db.forEach((element) => { //한페이지에 담길 영화들 all_content_container에 추가 
                    directoryHtml += makeMovieDirectory(element.id, element.poster_path, element.title, element.overview, element.vote_average);
                })
            }).catch(err => console.error(err));
    } else {
        await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&include_adult=true&language=ko&page=1${now_page_num}`, options)
            .then(response => response.json())
            .then(async response => {
                movie_db = searched_db = await response.results;
                movie_db_length = movie_db.length;
                total_page = response.total_pages;
                // console.log(movie_db)
                movie_db.forEach((element) => { //한페이지에 담길 영화들 all_content_container에 추가 
                    directoryHtml += makeMovieDirectory(element.id, element.poster_path, element.title, element.overview, element.vote_average);
                })
            })
            .catch(error => console.error(err));
    }
    console.log(now_page_num)

    // console.log(directoryHtml)
    all_content_container.innerHTML = directoryHtml
}


function change_color_btn(beforeElement, afterElement) { //이전페이지와 현재 클릭된 페이지의 색과 글자굵기를 변경
    beforeElement.style.backgroundColor = 'blanchedalmond';
    beforeElement.style.fontWeight = 'normal'
    afterElement.style.backgroundColor = '#C48CE3';
    afterElement.style.fontWeight = 'bold'
}

let clicked_directory = (id) => alert('영화 id: ' + id) //alert창을 실행


function makeMovieDirectory(id, img, title, overview, vote_average) {//영화 요소 1개의 directory를 만드는 함수
    let temp_html = `
    <div class="movieDirectory" id="${id}" onclick="clicked_directory(${id})">
        <img src="https://image.tmdb.org/t/p/w400${img}" alt="Movie Image">
        <h2 class="original_title">${title}</h2>
        <div class="overview">${overview}</div>
        <p>vote_average: ${vote_average}</p>
    </div>
    `; // 템플릿리터럴을 통해서 html파일을 작성
    return temp_html;
}

function btnSet(page_first_index) { //btn의 숫자를 지정하고, 클릭이벤트를 지정한다.

    if (page_first_index % 5 === 1) { //매개변수로 들어온 페이지인덱스가 잘 설정되었는지 확인
        btnMake.forEach((element) => { // btnMake배열에 저장된 요소들을 각각 onclick함수 지정
            element.onclick = () => setScreen(element.value); //다음에 구현할때 같은 class명으로 묶고, 한번에 onclick 지정해보기
        })
    } else { console.log("page_first_index is wrong") }
}

function clicked_next_btn(btnMake) { //nextBtn눌렀을때 동작
    let page_index = now_page_num / 1 + 1;
    if (now_page_num === total_page) { //페이지 끝부분에서는 동작되지 않도록 설정
        return;
    } else if (now_page_num % 5 !== 0) {
        setScreen(page_index)
    } else { //nextBtn은 우측끝에서 눌렸을때 btnMake의 index가 달라지는걸 고려
        btnMake.forEach(element => { //각각의 value+5를 통해서 해당 버튼이 클릭됬을때 넘어오는 정보를 수정
            element.value = element.value - (-5); //각각의 value+5  element.value를 숫자로 변환하여 계산하기 위해 -(-5)
            element.innerText = element.value; //innerText의 내용을 수정
        })
        btnSet(page_index - (page_index % 5) + 1);
        setScreen(page_index)
    }
}

function clicked_prev_btn(btnMake) {
    let page_index = now_page_num / 1 - 1
    if (now_page_num === 1) {//1페이지에서 동작되지 않도록 설정
        return;
    } else if (now_page_num % 5 !== 1) {
        setScreen(page_index)
    } else {
        btnMake.forEach(element => { //각각의 value-5
            element.value = element.value - (5);
            element.innerText = element.value;
        })
        setScreen(page_index)
    }
}
let clicked_home_btn = () => {
    isSearchOpen = false;
    document.getElementById('movieNameSearch').value = ''//홈버튼 눌렀을때 input창 비우기
    setScreen(1);
    let i = 1
    btnMake.forEach((element) => {
        element.value = i
        element.innerText = i++
    })
    btnSet(1);
}

async function clicked_search_btn() {
    const input_element = document.getElementById('movieNameSearch');
    let value = searchKeyword = input_element.value;
    let total_results;
    isSearchOpen = true;
    change_color_btn(btnMake[(now_page_num - 1) % 5], btnMake[0])
    now_page_num = 1;
    let i = 1
    btnMake.forEach((element) => {
        element.value = i
        element.innerText = i++
    })

    //query부분 String으로 형변환 필수, 
    //&include_adult=true&language=ko&page=1 청불true, language ko로 지정, page=1로지정
    await fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=true&language=ko&page=1`, options)
        .then(response => response.json())
        .then(response => {
            movie_db = searched_db = response.results;
            // console.log(response)

            movie_db_length = movie_db.length;
            total_page = response.total_pages;
            total_results = response.total_results;
        })
        .catch(error => console.error(err));

    if (!total_results) {
        //만약 searched_db에 저장된 요소가 없으면 "검색된 영화가 없어요, 영화 제목을 다시 확인해주세요" 화면에 출력
        let directoryHtml = ``;
        all_content_container.innerHTML = directoryHtml
        const ask_repeat_search = document.createElement('p')
        ask_repeat_search.id = 'ask_repeat_search'
        ask_repeat_search.classList.add("ask_repeat_search");
        ask_repeat_search.textContent = "검색된 영화가 없어요, 영화 제목을 다시 확인해주세요"
        edge.appendChild(ask_repeat_search)
    }
    else {
        let elements = document.getElementsByClassName("ask_repeat_search"); // "className"은 제거하려는 요소의 클래스 이름입니다.
        while (elements.length) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        let directoryHtml = "";
        searched_db.forEach((element) => {
            directoryHtml += makeMovieDirectory(element.id, element.poster_path, element.title, element.overview, element.vote_average);
        })
        all_content_container.innerHTML = directoryHtml;
    }
    btnSet(1);
}

function enter_search(e) {
    const code = e.code;
    if (code === 'Enter') {
        return clicked_search_btn();
    }
}


// window.onresize = function (event) {
//     let innerWidth = window.innerWidth;
//     let innerHeight = window.innerHeight;
//     all_content_container = document.getElementById("all_content_container");
//     const btns = document.getElementById('buttons')

//     // console.log(all_content_container);
//     if (all_content_container) { //폰트사이즈도 같은 방법을 수정 가능
//         if (innerWidth > 1000) {
//             all_content_container.style.gridTemplateColumns = 'repeat(3, minmax(300px, auto))';
//             all_content_container.style.gridTemplateRows = 'repeat(auto-fit, minmax(300px, auto))';
//             btns.style.top = '16%';
//             if (innerHeight < 640) btns.style.top = '20%'
//         } else if (innerWidth <= 1000 && innerWidth > 500) {
//             all_content_container.style.gridTemplateColumns = 'repeat(2, minmax(300px, auto))'
//             all_content_container.style.gridTemplateRows = 'repeat(auto-fit, minmax(300px, 3000px))';
//             btns.style.top = '8%';
//             // if(innerHeight<640) btns.style.top='14%'
//         } else if (innerWidth <= 500) {
//             all_content_container.style.gridTemplateColumns = 'repeat(1, minmax(300px, 400px))'
//             all_content_container.style.gridTemplateRows = 'repeat(auto-fit, minmax(300px, 700px))';
//             btns.style.top = '5%';
//         }
//     }
// };
