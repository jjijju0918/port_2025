window.addEventListener('load', function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;

                    // 메뉴 초기화 함수 호출 (header.html이 로드된 후)
                    if (el.tagName.toLowerCase() === 'header') {
                        initializeMenu();
                    }
                    console.log('Loaded:', includePath); // 로드된 내용을 확인
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});

// 메뉴 이동 및 해당 섹션일 경우 active 추가
function initializeMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('main > div.section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // 모든 메뉴 항목에서 active 클래스 제거
            menuItems.forEach(i => {
                i.classList.remove('active');
            });

            // 클릭한 메뉴 항목에 active 클래스 추가
            item.classList.add('active');

            // 해당 섹션으로 스크롤
            const targetId = item.querySelector('a').getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // 현재 스크롤 위치가 섹션의 위쪽과 아래쪽 사이에 있는지 확인
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        // 메뉴 항목에 active 클래스 추가
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('a').getAttribute('href').substring(1) === currentSection) {
                item.classList.add('active');
            }
        });
    });
}

