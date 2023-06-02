let now_page_num = 1;
let total_page;
let movie_db;
let movie_db_length;
let one_movie_div;
let all_content_container;
let btnMake;
let ask_repeat_search;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWYyZGZlMzc0NWZlYWU4MzY4ZDRhMjNkYzI4NDdiZSIsInN1YiI6IjY0NzA4ODdjNzI2ZmIxMDBhOGIyMmZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs13EVcaBz_bPjqdcVihiMrzB8QawtsgIWKEeBioIkI'
    }
};

window.onload = () => {
    all_content_container = document.getElementById('all_content_container')
    getBtnElementArray();
    btnSet(1);

    setScreen(1);
};

async function setScreen(page_index) { //한페이지에 담길 영화들 all_content_container에 추가
    if(ask_repeat_search){
        edge.removeChild(ask_repeat_search);
        ask_repeat_search=null;
    }
    let directoryHtml = "";
    change_color_btn(btnMake[(now_page_num - 1) % 5], btnMake[(page_index - 1) % 5])

    now_page_num = await page_index; //현재 페이지 정보를 page_index로 수정
    await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=' + page_index, options)
        .then(response => response.json())
        .then(async (response) => {
            movie_db = await response.results;
            movie_db_length = movie_db.length;
            total_page = response.total_pages;
            movie_db.forEach((element) => { //한페이지에 담길 영화들 all_content_container에 추가 
                directoryHtml += makeMovieDirectory(element.id, element.poster_path, element.title, element.overview, element.vote_average)
            })
        }).catch(err => console.error(err));
    // console.log(directoryHtml)
    all_content_container.innerHTML = directoryHtml
}

function search() {

}

function change_color_btn(beforeElement, afterElement) {
    beforeElement.style.backgroundColor = 'blanchedalmond';
    beforeElement.style.fontWeight = 'normal'
    afterElement.style.backgroundColor = '#C48CE3';
    afterElement.style.fontWeight = 'bold'
}

let clicked_directory = (id) => alert('영화 id: ' + id)


function makeMovieDirectory(id, img, title, overview, vote_average) {//영화 요소 1개의 directory를 만드는 함수
    let temp_html = `
    <div class="movieDirectory" id="${id}" onclick="clicked_directory(${id})">
        <img src="https://image.tmdb.org/t/p/w400${img}" alt="Movie Image">
        <h2 class="original_title">${title}</h2>
        <div class="overview">${overview}</div>
        <p>vote_average: ${vote_average}</p>
    </div>
    `;
    return temp_html;
}


function getBtnElementArray() {
    let arr = ['1', '2', '3', '4', '5'];
    let set = () => { btnMake = arr.map(x => document.getElementById(x)) };
    set();
}

function btnSet(page_first_index) { //btn의 숫자를 지정하고, 클릭이벤트를 지정한다.

    if (page_first_index % 5 === 1) {
        btnMake.forEach((element) => {
            element.onclick = () => setScreen(element.value);
        })
    } else { console.log("page_first_index is wrong") }
}

function clicked_next_btn(btnMake) { //nextBtn눌렀을때 동작
    let page_index = now_page_num / 1 + 1;
    if (now_page_num === total_page) { //페이지 끝부분에서는 동작되지 않도록 설정ㄴ
        return;
    } else if (now_page_num % 5 !== 0) {
        setScreen(page_index)
    } else {
        btnMake.forEach(element => { //각각의 value+5
            element.value = element.value - (-5);
            element.innerText = element.value;
        })
        btnSet(page_index - (page_index % 5) + 1);
        setScreen(page_index)
    }
}

function clicked_prev_btn(btnMake) {
    if (now_page_num === 1) {//1페이지에서 동작되지 않도록 설정
        return;
    } else if (now_page_num % 5 !== 1) {
        setScreen(now_page_num - 1)
    } else {
        btnMake.forEach(element => { //각각의 value-5
            element.value = element.value - (5);
            element.innerText = element.value;
        })
        setScreen(now_page_num - 1)

    }
}
let clicked_home_btn = () => {
    edge.removeChild(ask_repeat_search);
    ask_repeat_search=null;
    document.getElementById('movieNameSearch').value = ''//홈버튼 눌렀을때 input창 비우기
    setScreen(1);
    btnSet(1);
}

function clicked_search_btn() {
    
    const input_element = document.getElementById('movieNameSearch');
    let value = input_element.value.toLowerCase()        //input 통해서 받은 value가져와서 소문자변환

    movie_db = movie_db.filter((currentValue) => {//문자를 모두 소문자로 변환하여 일치하는 지 비교 => true면 배열추가
        let str_is_same = currentValue.title.toLowerCase(); //각각의 title을 소문자로 변환
        return str_is_same === value; //참이면 반환
    })

    movieNumber = movie_db.length; //ok

    if (movie_db) {
        //기존 all_content_container 요소를 지우고 재검색 멘트 출력
        let directoryHtml = ``;
        all_content_container.innerHTML = directoryHtml

        const edge = document.getElementById('edge');
        
        ask_repeat_search = document.createElement('p')
        ask_repeat_search.id = 'ask_repeat_search'
        ask_repeat_search.classList.add("ask_repeat_search");
        ask_repeat_search.textContent = "검색된 영화가 없어요, 영화 제목을 다시 확인해주세요"
        edge.appendChild(ask_repeat_search)
        //화면에 검색된 영화가 없어요 표시
    }
    else {
        let directoryHtml = ``;
        const edge = document.getElementById('edge');
        let remove_content_container = document.getElementById('all_content_container')
        //기존 all_content_container 요소를 지우고
        edge.removeChild(remove_content_container)
        //새로운 요소 추가
        edge.appendChild(this.fill_container())
        return 'appendOK';
    }
}

function enter_search(e) {
    const code = e.code;
    if (code === 'Enter') {
        return clicked_search_btn();
    }
}

window.onresize = function (event) {
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
    all_content_container = document.getElementById("all_content_container");
    const btns = document.getElementById('buttons')

    // console.log(all_content_container);
    if (all_content_container) { //폰트사이즈도 같은 방법을 수정 가능
        if (innerWidth > 1000) {
            all_content_container.style.gridTemplateColumns = 'repeat(3, minmax(300px, auto))';
            all_content_container.style.gridTemplateRows = 'repeat(auto-fit, minmax(300px, auto))';
            btns.style.top = '16%';
            if (innerHeight < 640) btns.style.top = '20%'
        } else if (innerWidth <= 1000 && innerWidth > 500) {
            all_content_container.style.gridTemplateColumns = 'repeat(2, minmax(300px, auto))'
            all_content_container.style.gridTemplateRows = 'repeat(auto-fit, minmax(300px, 3000px))';
            btns.style.top = '8%';
            // if(innerHeight<640) btns.style.top='14%'
        } else if (innerWidth <= 500) {
            all_content_container.style.gridTemplateColumns = 'repeat(1, minmax(300px, 400px))'
            all_content_container.style.gridTemplateRows = 'repeat(auto-fit, minmax(300px, 700px))';
            btns.style.top = '5%';
        }
    }
};



