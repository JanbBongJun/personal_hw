let query = String('')
let apikey;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWYyZGZlMzc0NWZlYWU4MzY4ZDRhMjNkYzI4NDdiZSIsInN1YiI6IjY0NzA4ODdjNzI2ZmIxMDBhOGIyMmZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs13EVcaBz_bPjqdcVihiMrzB8QawtsgIWKEeBioIkI'
  }
};
//query부분 String으로 형변환 필수, 
//&include_adult=true&language=ko&page=1 청불true, language ko로 지정, page=1로지정
fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=ko&page=1`, options)
  .then(response => response.json())
  .then(data => {
    // 응답 처리
    console.log(data);
  })
  .catch(error => {
    // 에러 처리
    console.log(error);
  });

  // {
  //   page: 1,
  //   results: [
  //     {
  //       adult: false,
  //       backdrop_path: '/67eKM9rkCOZmNVrsgXVKiCvJh1.jpg',
  //       genre_ids: [Array],
  //       id: 479718,
  //       original_language: 'ko',
  //       original_title: '범죄도시',
  //       overview: '2004년 서울. 중국 하얼빈에서 활동하다 피신한 신흥 범죄조직의 악랄한 보스 장첸. 가리봉동 일대로 넘어온 장첸과 그의 일당들은 단숨에 기존 조직들을 장악하고 가장 강력한 세력인 춘식이파 보스 황사장까지 위협하며 도시 일대의 최강자로 급부상한다. 한편 대한민국을 뒤흔든 장첸 일당을 잡기 위해 오직 주먹 한방으로 도시의 평화를 유지해 온 괴물형사 마석도와  인간미 넘치는 든든한 리더 전일만 반장이 이끄는 강력반은 눈에는 눈 방식의  소탕 작전을 기획하는데...',
  //       popularity: 23.031,
  //       poster_path: '/A5MIbqxuQfQRtzGxg5UUTAxHfsM.jpg',
  //       release_date: '2017-10-03',
  //       title: '범죄도시',
  //       video: false,
  //       vote_average: 7.808,
  //       vote_count: 271
  //     },
  //     {
  //       adult: false,
  //       backdrop_path: '/qK6uDoIFsir4tn8YIvlkigmD1v9.jpg',
  //       genre_ids: [Array],
  //       id: 307663,
  //       original_language: 'en',
  //       original_title: 'Vice',
  //       overview: '법도 규칙도 책임도 없는 도시 ‘바이스’. 이곳에서 사람들은 폭력, 살인, 강간 등 현실에선 불법인 광기를 분출한다. ‘바이스’에서 고객들의 욕망을 충족 시켜주는 건 인간의 유전자를 복제한 인공 지능 로봇으로 이들은 자신이 로봇이란 사실을 모른다. 그리고 이를 철저하게 통제하고 관리하는 건 냉혹한 경영자 ‘줄리안’(브루스 윌리스)이다.  어느 날, 로봇 중 하나인 ‘켈리’가 시스템의 오류로 모든 기억이 되살아 낸 채 ‘바이스’를 탈출한다.  이를 막으려는 ‘줄리안’과 ‘바이스’때문에 현실로 범죄가 이어진다고 비난하던 형사 ‘로이’(토마스 제인)가  이상한 낌새를 알아채고 ‘켈리’를 추격하기 시작한다.  그리고 ‘켈리’와 ‘로이’는 점차 믿을 수 없는 충격적 사실들과 마주하게 되는데…',
  //       popularity: 17.943,
  //       poster_path: '/vn8akeiW9Ex4bilkMK9gVWSnCqO.jpg',
  //       release_date: '2015-01-16',
  //       title: '바이스: 범죄도시',
  //       video: false,
  //       vote_average: 4.4,
  //       vote_count: 497
  //     },
  //     {
  //       adult: false,
  //       backdrop_path: '/7kMst7k4UfCisp48lYQ0tr2PEO2.jpg',
  //       genre_ids: [Array],
  //       id: 185567,
  //       original_language: 'en',
  //       original_title: 'Zulu',
  //       overview: '참혹한 살인사건이 연쇄적으로 일어난다. 특수대는 신종 약물이 사건과 연결된 걸 밝혀낸다. 거친 범죄도시의 갱단은 무차별 공격으로 저항한다. 배후에 과거 국가의 인종 청소 프로젝트와 관련 있는데…',
  //       popularity: 8.511,
  //       poster_path: '/h5OZD7pVkIKR5jf4lGFzQQrLmLc.jpg',
  //       release_date: '2013-12-04',
  //       title: '줄루: 범죄도시',
  //       video: false,
  //       vote_average: 6.684,
  //       vote_count: 440
  //     },
  //     {
  //       adult: false,
  //       backdrop_path: '/xpXkdDAw1ilEtkhiCcUSgIwrttX.jpg',
  //       genre_ids: [Array],
  //       id: 15801,
  //       original_language: 'en',
  //       original_title: "What Doesn't Kill You",
  //       overview: '브라이언(마크 러팔로)과 폴리(에단 호크)는 어린 시절부터 뒷골목 세계에서 거칠게 성장하며 추운 보스턴의 겨울을 버텨낸다. 시간이 흘러 어느덧 가정을 이루고 두 아들을 둔 브라이언은 계속되는 불안정한 생활에서 벗어나고 싶어하면서도 폴리와 함께 점점 더 큰 돈이 걸린 위험한 범죄에 뛰어들게 된다. 결국 화물트럭을 털다 수감생활을 하게 되는 두 사람. 출소 후 조직 내 입지에 대한 불안함과 생활고를 견디다 못해 현금 수송 차량을 털어 크게 한 방 터뜨리기로 결심하지만 마지막 순간의 선택은 이들의 운명을 정반대로 바꾸어놓는데..',
  //       popularity: 6.757,
  //       poster_path: '/6DjoU0tYbHPUNyxq6wKQmGhnlDR.jpg',
  //       release_date: '2008-12-12',
  //       title: '범죄도시',
  //       video: false,
  //       vote_average: 6.056,
  //       vote_count: 161
  //     },
  //     {
  //       adult: false,
  //       backdrop_path: '/nS0MqsEucHusa77hEdsXB8RsqMo.jpg',
  //       genre_ids: [Array],
  //       id: 589885,
  //       original_language: 'en',
  //       original_title: 'Eminence Hill',
  //       overview: '황량한 애리조나 황무지 중심에 어느 날, 최고의 실력을 지닌 총잡이들이 모여든다. 형제의 복수를 위해 냉혹한 살인마가 된 로이스. 살인마에게 걸린 현상금을 노리는 연방 보안관 퀸시. 운명은 두 사람을 외부에 알려지지 않은 미지의 마을로 인도하고, 그곳에서 최후의 결전이 벌어지는데...',
  //       popularity: 6.679,
  //       poster_path: '/lvfPG1fflSu5JPqgMtKG9rxym5Z.jpg',
  //       release_date: '2019-11-01',
  //       title: '범죄도시: 나쁜놈들 전성시대',
  //       video: false,
  //       vote_average: 4.8,
  //       vote_count: 20
  //     },
  //     {
  //       adult: false,
  //       backdrop_path: '/yDNP14m81xw6kudFQpane8FcP3u.jpg',
  //       genre_ids: [Array],
  //       id: 548669,
  //       original_language: 'zh',
  //       original_title: '狂徒',
  //       overview: '잘나가던 스타 농구 선수에서 한순간에 조폭 심부름꾼으로 전락한 ‘레이’. 그러던 어느 날, 우연히 은행강도범 ‘벤’을 만난 그는 얼떨결에 그의 범행을 도와주게 된다. 시궁창 같은 생활에서 벗어나기 위해 ‘벤’의 다음 범행을 돕기로 한 ‘레이’. 과연 이들의 한탕 대작전은 성공할 수 있을 것인가!',
  //       popularity: 2.329,
  //       poster_path: '/abxLlNu8UvZVESn4S84Cvx0Jqod.jpg',
  //       release_date: '2018-10-26',
  //       title: '대범죄도시: 나쁜녀석들',
  //       video: false,
  //       vote_average: 6.9,
  //       vote_count: 13
  //     },
  //     {
  //       adult: false,
  //       backdrop_path: '/5DKVH8KeqFwPacWFMyYqTaECxJP.jpg',
  //       genre_ids: [Array],
  //       id: 955555,
  //       original_language: 'ko',
  //       original_title: '범죄도시3',
  //       overview: '베트남 납치 살해범 검거 후 7년 뒤, 마석도는 새로운 팀원들과 함께 살인사건을 조사한다. 사건 조사 중, 마석도는 신종 마약 사건이 연루되었음을 알게 되고 수사를 확대한다. 한편, 마약 사건의 배후인 주성철은 계속해서 판을 키워가고 약을 유통하던 일본 조직과 리키까지 한국에 들어오며 사건의 규모는 점점 더 커져가는데...',
  //       popularity: 54.559,
  //       poster_path: '/jbremGnsRR4XZMDj97YHt20isRP.jpg',
  //       release_date: '2023-05-31',
  //       title: '범죄도시3',
  //       video: false,
  //       vote_average: 6.25,
  //       vote_count: 4
  //     },
  //     {
  //       adult: false,
  //       backdrop_path: '/eGyvNUw7Kess2QfgtqZjAHC7DqW.jpg',
  //       genre_ids: [Array],
  //       id: 619803,
  //       original_language: 'ko',
  //       original_title: '범죄도시2',
  //       overview: '가리봉동 소탕작전으로부터 4년이 지난 2008년, 금천경찰서 강력반은 베트남으로 도주한 용의자를 인도받아 오라는 미션을 받는다. 그렇게 현지를 물색하던 마석도와 전일만은 용의자에게 미심쩍음을 느껴 추궁한 끝에, 악랄한 강해상의 존재를 알게 된다. 두 형사는 수사권이 없는 상황에도 한국과 베트남을 오가며 역대급 범죄를 저지르는 그를 잡겠다는 일념 하나로 호찌민 이곳저곳을 거침없이 누빈다.',
  //       popularity: 39.666,
  //       poster_path: '/wxNUnSzuMgsT8DFkZjX9GtfOKJX.jpg',
  //       release_date: '2022-05-18',
  //       title: '범죄도시2',
  //       video: false,
  //       vote_average: 7.177,
  //       vote_count: 155
  //     },
  //     {
  //       adult: false,
  //       backdrop_path: null,
  //       genre_ids: [Array],
  //       id: 1017163,
  //       original_language: 'ko',
  //       original_title: '범죄도시4',
  //       overview: '국내 최대의 불법 온라인 도박 조직을 잡기 위해 사이버수사대와 전담팀을 결성한 괴물형사 ‘마석도’의 업그레이드된 범죄 소탕작전을 그린 대한민국 대표 액션 시리즈',
  //       popularity: 1.834,
  //       poster_path: '/9DVtwkuxzCLGVMapioeJ4RflfyW.jpg',
  //       release_date: '2024-12-31',
  //       title: '범죄도시4',
  //       video: false,
  //       vote_average: 0,
  //       vote_count: 0
  //     }
  //   ],
  //   total_pages: 1,
  //   total_results: 9
  // }