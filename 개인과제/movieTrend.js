//clearㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 페이지정보가 수정됬을때 페이지를 리로드해오는게 아닌 데이터만 받아와서 화면에 표시ok
// 1. 두번째 시도에서 grid와 메서드를 사용하여 grid안에 db에 저장된 영화 수에 따라 동적으로 추가하도록 만들 계획 ok
// 3. 설명부분 스크롤하면 내려가게 구현 ok
// 4. 만약 페이지넓이가 작아지면 가로 3개 => 2개 => 1개로 줄어들도록 구현 ok
// 페이지 넓이가 작아질 때 추가로 다른 요소들도 어느정도 반영되도록 해보기
// 5. DOM으로 js에 구현 ok
// 6. 클래스의 메서드와 함수 모두 이용하며 context를 이해하며, data를 인스턴스로 교환해보기 ok 
// 스크롤 안보이게도 해보기 ok 주석처리
// 2. 목차를 만들어 페이지당 20개씩 구현하도록 할 계획  ok
// 페이지네이션 구현, 클릭하면 색 바뀌도록 해보기
// 페이지 네이션은 5개의 숫자버튼과 next, previous버튼으로 구성

// 8. 네이버 영화 검색기능 연결? 팀원들이랑 해보기
// 팀원들 => html을 따로 분리해서 가져옴 시간남으면 해보기
// 6. 시간 남으면 python으로 몽고db 사용해서 코멘트달기 기능 구현

//8. https://0422.tistory.com/210 dragger


// 고찰
// 해결할점 class와 함수를 통해 기능을 구현하였는데 class의 경우 메서드를 사용하기 위해 인스턴스를 받아와야하는 
// 점이 불편했다. 
// 예를들어 함수에서 메서드를 사용하고싶은 경우 class의 인스턴스 또는 컨텍스트를 직접 지정해야하는 점들이 불편했다.
// 또한, 인스턴스의 변수를 불러들이는 것 또한 불편했다.
// 지금은 학습을 위해 불필요한 경우에도 함수와 메서드를 이용하여 구현했지만, 충분한 학습 이후에
// 적재적소에 메서드와 함수의 장단점을 구분하여 사용해야하는 것의 필요성을 느꼈다.
// 비동기 처리를 할때는 어느정도 문제가 일어날 부분을 예상
// 또한, 코드 가독성을 고려하지 않고, 오로지 본인의 자바스크립트 언어 동작의 원리를 확인하기 위해 작성한 실험적인 코드이기 때문에
// 작성한 코드들을 이해하는데 어려움이 있다.
// 가독성은 유지보수를 쉽게하며, 협업을 진행하는데 있어서 중요한 요소라 생각한다.

// 코드를 작성하고 실행했을 때 생각보다 비동기문제가 빈번하게 일어날 수 있음을 확인했다.
// 아직 비동기문제가 발생할 만한 부분들에 대해 완벽하게 파악하지 못했지만, 경험적으로 어느 부분에서 비동기 문제가 발생하는지
// 조금이나마 깨닫게 되었다. 

// openwitliveserver을 통해 실행한 크롬의 디버깅기능을 활용하여 코드가 작동이 되지 않는 이유를 계속해서 분석해 보았다.
// 비동기 문제를 처리하며, 코드에는 이상이 없는 것 같은데 계속 고민하였지만, 결국 비동기 문제로 인해 2시간을 허비했다.
// 코드에 이상이 없지만, 값이 이상하게 나오는 것 같다면 실행순서와 동작이 완료되기까지의 순서가 일치하지 않는다는 것을 꼭 기억해야한다.


// 개인프로젝트 통한 목표설정
// 완벽하지는 않지만 동작원리를 여러 실험을 통해서 파악하였으므로, 함수,메서드/DOM,html/의 장점과 단점을 잘 구분하여 다음 프로젝트에서
// 기능만 고려하는 것이 아닌, 기능과 가독성을 모두 고려하도록 한다.

class movieTrend {

    constructor(movie_db) {
        this.movie_db = movie_db;
        this.movieNumber = this.movie_db.length;
    }

    movie_db; //현재 저장된 페이지 정보
    movieNumber;
    movie_page = [];
    now_page_num;
    total_page;

    // fillPageㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    // db를 통해 받아온 정보를 최종표출
    fillPage() {
        const edge = document.getElementById('edge');
        let remove_content_container = document.getElementById('all_content_container')
        edge.removeChild(remove_content_container)
        edge.appendChild(this.fill_container())
    }
 // 영화 목록을 만드는 메소드 <id는 요소당 한개씩만 가질 수 있으므로 유의하자, class는 요소끼리 공유할 수 있음>
    makeDirectory(movieDb_results_specified) {
        const originalTitle = movieDb_results_specified.title;
        const id = movieDb_results_specified.id;
        const overview = movieDb_results_specified.overview;
        const poster_path = movieDb_results_specified.poster_path;
        const rating = movieDb_results_specified.vote_average;

        // DOM요소 생성
        const movieDirectory = document.createElement('div');
        movieDirectory.classList.add("movieDirectory");
        movieDirectory.id = id;
        movieDirectory.onclick = function () { clicked_directory(movieDirectory.id) };

        const image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/w400" + poster_path;
        image.alt = "Movie Image"

        const original_title = document.createElement('h2');
        original_title.className = 'original_title';
        original_title.textContent = originalTitle;

        const paragraph1 = document.createElement('div');
        paragraph1.className = 'overview'
        paragraph1.textContent = overview;

        const paragraph2 = document.createElement('p');
        paragraph2.textContent = 'vote_average: ' + rating;

        movieDirectory.appendChild(image);
        movieDirectory.appendChild(original_title);
        movieDirectory.appendChild(paragraph1);
        movieDirectory.appendChild(paragraph2);

        return movieDirectory;
    }
   

    //화면 구성을 위한 메서드
    fill_container() {
        const movie_db = this.movie_db;
        const forMovieIndex = this.movieNumber;
        const all_content_container = document.createElement('div');
        all_content_container.classList.add("all_content_container");
        all_content_container.id = "all_content_container"; //요놈은 한놈밖에 없으니까 id 지정
        // console.log(movie_db)
        movie_db.forEach(element => {
            all_content_container.appendChild(this.makeDirectory(element))
        });
        // for (let i = 0; i < forMovieIndex; i++) {
        //     all_content_container.appendChild(this.makeDirectory(movie_db[i]))
        // }

        return all_content_container;
    }

    // i번째 페이지 movie_make에 추가
    // 동기화시켜야됨
    async get_page(page_index, movie_make) {
        const btnArr=await return_btn();
        console.log('nowpage'+(this.now_page_num-1)+'page_index'+(page_index-1))
        this.change_color_btn(btnArr[(this.now_page_num-1)%5],btnArr[(page_index-1)%5])
        
        movie_make.now_page_num = page_index //현재페이지 인덱스(1부터시작)
        // console.log(movie_make)//ok22
        //getMovieResults가 배열 형태로 안나오는 현상 = 비동기문제
        let db = movie_make.movie_db = await getMovieResults(page_index);
        movie_make.movieNumber = db.length;
        this.fillPage()
    }



    //input값을 가져와 소문자로 변환 후 movie_db[i].title과 일치비교(===)
    clicked_search_btn() {
        const input_element = document.getElementById('movieNameSearch');
        let value = input_element.value.toLowerCase()        //input 통해서 받은 value가져와서 소문자변환

        this.movie_db = this.movie_db.filter((currentValue) => {//문자를 모두 소문자로 변환하여 일치하는 지 비교 => true면 배열추가
            let str_is_same = currentValue.title.toLowerCase(); //각각의 title을 소문자로 변환
            return str_is_same === value; //참이면 반환
        })

        this.movieNumber = this.movie_db.length; //ok

        if (this.movieNumber === 0) {
            this.movieNumber = 0;
            const edge = document.getElementById('edge');
            const remove_content_container = document.getElementById('all_content_container')
            //기존 all_content_container 요소를 지우고 재검색 멘트 출력
            edge.removeChild(remove_content_container)
            const ask_repeat_search = document.createElement('p')
            ask_repeat_search.id = 'ask_repeat_search'
            ask_repeat_search.classList.add("ask_repeat_search");
            ask_repeat_search.textContent = "검색된 영화가 없어요, 영화 제목을 다시 확인해주세요"
            edge.appendChild(ask_repeat_search)
            //화면에 검색된 영화가 없어요 표시
            return 'no movie';
        }
        else {
            const edge = document.getElementById('edge');
            let remove_content_container = document.getElementById('all_content_container')
            //기존 all_content_container 요소를 지우고
            edge.removeChild(remove_content_container)
            //새로운 요소 추가
            edge.appendChild(this.fill_container())
            return 'appendOK';
        }
    }
    // next, prev클릭한 페이지 바꾸는 기능
    clicked_prev_btn(btnMake) {

        if (this.now_page_num === 1) {
            // console.log('page 1')
            return;
        } else if (this.now_page_num % 5 !== 1) {
            // this.change_color_btn(btnMake[(this.now_page_num - 1) % 5], btnMake[(this.now_page_num - 2) % 5]);
            this.get_page(this.now_page_num-1, this);
        } else {
            // this.change_color_btn(btnMake[0], btnMake[4])
            btnMake.forEach(element => { //각각의 value-5
                element.value = element.value - (5);
                element.innerText = element.value;
            })
            this.get_page(this.now_page_num-1, this);

        }
    }
    clicked_next_btn(btnMake) {
        if (this.now_page_num === 556) {
            // console.log('endpage')
            return;
        } else if (this.now_page_num % 5 !== 0) {
            console.log(btnMake)
            // this.change_color_btn(btnMake[(this.now_page_num - 1) % 5], btnMake[(this.now_page_num) % 5]);

            this.get_page(this.now_page_num+1, this);
        } else {
            btnMake.forEach(element => { //각각의 value+5
                // this.change_color_btn(btnMake[4], btnMake[0])
                element.value = element.value - (-5);
                element.innerText = element.value;
            })
            this.get_page(this.now_page_num+1, this);

        }
    }

    change_color_btn(beforeElement, afterElement) {
        beforeElement.style.backgroundColor = 'blanchedalmond';
        beforeElement.style.fontWeight ='normal'
        afterElement.style.backgroundColor = '#C48CE3';
        afterElement.style.fontWeight ='bold'
    }
}

//영화목록을 다시 초기화(홈버튼기능 구현)
//fetch처럼 요청을 기다리는 알고리즘은 동기 비동기 꼭 생각하기
let return_tmdb_data = (movie_make) => {
    //홈버튼 눌렀을때 input창 비우기
    if (movie_make.movieNumber === 0) {
        let ask_repeat_search = document.getElementById('ask_repeat_search');
        edge.removeChild(ask_repeat_search);
        let dom = document.createElement('div')
        dom.id = 'all_content_container'
        edge.appendChild(dom)
    }
    document.getElementById('movieNameSearch').value = ''
    movie_make.get_page(1, movie_make)
    reset_btn();
}

let make_search_btn = (movie_make) => {
    if (movie_make instanceof movieTrend) {
        // console.log(movie_make)
        movie_make.clicked_search_btn();
    } else {
        movie_make.clicked_search_btn();
    }
}

//directory를 클릭했을때 onclick이벤트로 실행되는 함수
//id 정보를 넘겨받아와서 메서드 실행
let clicked_directory = (id) => alert('영화 id: ' + id)

//초기 1페이지를 db로 받아오는 함수
async function get_db_set_screen() {
    movie_make = new movieTrend(await getMovieResults(1));
    movie_make.now_page_num = 1;
    const edge = document.getElementById('edge');
    await edge.appendChild(movie_make.fill_container());//새로운 요소 추가
    return movie_make; //then안의 화살표함수에 return movie_make; 을 구현하여 undefined를 반환하여 오류발생
}

function enter_search(e) {
    const code = e.code;
    if (code === 'Enter') {
        return make_search_btn(movie_make);
    }
}

// 원하는페이지 db를 배열 형태로 가져옴 <db의 results를 반환>
async function getMovieResults(page_index) {
    let movieResults;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWYyZGZlMzc0NWZlYWU4MzY4ZDRhMjNkYzI4NDdiZSIsInN1YiI6IjY0NzA4ODdjNzI2ZmIxMDBhOGIyMmZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs13EVcaBz_bPjqdcVihiMrzB8QawtsgIWKEeBioIkI'
        }
    };
    await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=' + page_index, options)
        .then(response => response.json())
        .then(async response => {
            movieResults = response.results;
        }).catch(err => console.error(err));
    // console.log(movieResults) ok
    return movieResults; //then안의 화살표함수에 return movie_make; 을 구현하여 undefined를 반환하여 오류발생
}