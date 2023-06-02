let now_page_num = 1;
let total_page;
let movie_db, movie_db_length;
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

window.onload = () => { //html문서가 준비되면 실행
    all_content_container = document.getElementById('all_content_container')
    btnMake = ['1', '2', '3', '4', '5'].map(x => document.getElementById(x)) //배열의 map기능을 이용하여 , btnMake에 각각의 버튼 저장
    btnSet(1);
    setScreen(1);
};

async function setScreen(page_index) { //원하는 페이지인덱스의 db를 불러오고, container에 해당 요소들을 추가한다.
    if (ask_repeat_search) {
        edge.removeChild(ask_repeat_search);
        ask_repeat_search = null;
    }
    let directoryHtml = "";
    change_color_btn(btnMake[(now_page_num - 1) % 5], btnMake[(page_index - 1) % 5])

    now_page_num = await page_index; //현재 페이지 정보를 page_index로 수정
    await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=' + page_index, options)
        .then(response => response.json())
        .then((response) => {
            movie_db = response.results;
            movie_db_length = movie_db.length;
            total_page = response.total_pages;
            movie_db.forEach((element) => { //한페이지에 담길 영화들 all_content_container에 추가 
                directoryHtml += makeMovieDirectory(element.id, element.poster_path, element.title, element.overview, element.vote_average);
            })
        }).catch(err => console.error(err));
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
    if (now_page_num === total_page) { //페이지 끝부분에서는 동작되지 않도록 설정ㄴ
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
    if(ask_repeat_search){
        edge.removeChild(ask_repeat_search); //만약 검색창에 입력값 없이 눌렀을 때 나오는 창의 html요소를 부모요소인 edge에서 삭제 
        ask_repeat_search = null; //변수를 null로 초기화
    }
    document.getElementById('movieNameSearch').value = ''//홈버튼 눌렀을때 input창 비우기
    setScreen(1);
    let i=1
    btnMake.forEach((element)=>{
        element.value=i
        element.innerText=i++
    })
    btnSet(1);
}

function clicked_search_btn() {

    const input_element = document.getElementById('movieNameSearch');
    let value = input_element.value.toLowerCase()        //input 통해서 받은 value가져와서 소문자변환
    let i = 0;
    movie_db = movie_db.filter((currentValue) => {//문자를 모두 소문자로 변환하여 일치하는 지 비교 => true면 배열추가
        let str_is_same = currentValue.title.toLowerCase(); //각각의 title을 소문자로 변환
        if (str_is_same === value) {
            i++
            return true;
        }
        return false;
    })
    console.log(movie_db)
    console.log(i)

    movieNumber = movie_db.length; //ok

    if (!i) {
        //만약 movie_db에 저장된 요소가 없으면 "검색된 영화가 없어요, 영화 제목을 다시 확인해주세요" 화면에 출력
        let directoryHtml = ``;
        all_content_container.innerHTML = directoryHtml

        const edge = document.getElementById('edge');
        ask_repeat_search = document.createElement('p')
        ask_repeat_search.id = 'ask_repeat_search'
        ask_repeat_search.classList.add("ask_repeat_search");
        ask_repeat_search.textContent = "검색된 영화가 없어요, 영화 제목을 다시 확인해주세요"
        edge.appendChild(ask_repeat_search)
    }
    else {
        let directoryHtml = "";
        const edge = document.getElementById('edge');
        movie_db.forEach( (element)=>{
            directoryHtml += makeMovieDirectory(element.id, element.poster_path, element.title, element.overview, element.vote_average);
        })
        all_content_container.innerHTML=directoryHtml;
        
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



