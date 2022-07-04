/**
 * 1 - what
 * 일급인 것과 일급이 아닌 것을 어떻게 구분할 것인가.
 *
 * - 이건 일급이 아닙니다.
 *  1. 수식 연산자
 *  2. 반복문
 *  3. 조건문
 *  4. try / catch
 *
 * - 일급은 이 걸 할 수 있습니다.
 *  1. 변수에 할당
 *  2. 함수의 인자로 넘기기
 *  3. 함수의 리턴값으로 받기
 *  4. 배열이나 객체에 담기
 *
 * - 01 예제에서는 일급이 아닌 함수명의 암묵적 인자를 인자로 받도록 변경해서 일급으로 만들었습니다.
 *  - setPriceByName()에서 price는 일급이 아니지만 인자로 뺀 field는 일급 값 입니다.
 *
 * 1 - problem
 * - 근데 여기서 의문점이 든다. 필드 명을 문자열로 사용하면 버그가 생기지 않을까?
 * - 추상화의 벽 아래에서 정의한 필드명을 외부에 노출시키는 것이 추상화의 벽 개념에 맞을 까?
 * */

// 나는 일급이 아니야!!

// + . * ...

// if , for , while ...

// 나는 1급이야
const a;
let b;

/**
 * 1 - solve
 *
 * 일급 값이기 때문에 내부에서 필드명을 변경하는 식으로 구현이 가능하다
 * 자바스크립트는 런타임 체크로 방어적 코드를 사용할 수 있다.
 * */
const validItemFields = [ "price" , "quantity" , "tax" , "shipping" ]
const changeColumns = {
	"quantity" : "number"
}

function setFieldByName( cert , name , field , value ) {
	
	if ( !validItemFields.includes( field ) ) {
		throw "Not Exist Item";
	}
	
	if ( changeColumns.hasOwnProperty( field ) ) {
		field = changeColumns[field];
	}
	
	const item = cert[name];
	// 이제 field는 item의 다른 값처럼 사용할 수 있으므로 일급 값입니다.
	const newItem = objectSet( item , field , value );
	return objectSet( cert , name , newItem );
}

/**
 * 3 - what
 *
 * 그렇다면 일급이 아닌 것들을 일급으로 바꿀 수 있을까요???
 * 예를 들어... 수식연산자나 if문을???
 * */

/**
 * 3 - solve
 *
 * 넵 가능합니다. 어떤 문법이든 일급 함수로 바꿀 수 있습니다.
 * */

// 수식연산자를 일급으로!
function multiple( x , y ) {
	
	return x * y;
}

