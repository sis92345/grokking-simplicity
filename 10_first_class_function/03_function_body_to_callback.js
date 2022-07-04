/**
 * 1 - what
 *
 * - 함수 본문을 콜백으로 변경
 *
 * try catch문에서 catch문은 함수 본문을 콜백으로 바꾸기 단계로 변경할 수 있다.
 *
 * */
const errorToServer = (e) => {};
const funBody = () => {};

/**
 * 1 - solve
 *
 * 1. 본문과 본문의 앞 부분과 뒷 부분을 변경합니다.
 * 2. 전체를 함수로 빼냅니다.
 * 3. 본문 부분을 빼낸 함수의 인자를 전달한 함수로 변경합니다.
 * */

// 1. 함수 파트 구분
try{ // 앞부분
	funBody(); // 본문
}
catch ( e ) { // 뒷 부분
	errorToServer(e);
}

// 2. 전체를 함수로 뺀다.
function withLogging() {
	try{ // 앞부분
		funBody(); // 본문
	}
	catch ( e ) { // 뒷 부분
		errorToServer(e);
	}
}

// 3. 본문 부분을 빼낸 함수의 인자를 전달한 함수로 변경합니다.

function withLogging2( runFun ) {
	try {
		runFun();
	}
	catch ( e ) {
		errorToServer(e);
	}
}
