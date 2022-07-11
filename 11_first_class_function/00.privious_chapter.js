/**
 * 1 - what I learned
 *
 * 함수 이름에 있는 암묵적 인자
 * 함수 본문에 사용하는 어떤 값이 함수이름에 나타나는 현상
 * */

// 이 코드는 냄새가 납니다! 함수 이름에 암묵적인 인자가 드러나기 때문
const calCartForFood = ( cart , food ) => {
	
	let cartTotalPrice = cart.price;
	
	for ( let i = 0; i < food.length; i++ ) {
		cartTotalPrice+=food.price;
	}
	
	return cartTotalPrice;
}

/**
 * 1 - refactor
 *
 * 위 코드는 암묵적 인자를 드러내는 방식으로 해결합니다.
 * */

// 1. 함수 이름에 있는 암묵적인 인자를 확인한다 : cart food
// 2. 명시적인 인자를 추가한다 : cart , food
const calTotalItem = ( cart , item , food ) => {
	
	// 3. 함수 본문에 하드 코딩된 값을 새로운 인자로 변경
	let cartTotalPrice = cart[item];
	
	for ( let i = 0; i < food.length; i++ ) {
		cartTotalPrice+=food[item];
	}
	
	return cartTotalPrice;
}

// 4. 함수 호출하는 곳을 변경s

/**
 * 2 - what I learned
 *
 * 함수 본문을 콜백으로 바꾸기
 * */

// 아래 함수를 설정

const polling = () => {
	
	try {
		setInterval(()=>{
			// 실제 비즈니스 로직
		})
	}
	catch ( e ) {
		console.log( e );
	}
}

/**
 * 2 - refactor
 *
 * 함수 본문을 콜백으로 분리
 * */

// 1, 본문에서 바꿀 부분의 앞부분과 뒷 부분을 확인
const polling = () => {
	
	try { // 앞
		// 본문
		setInterval(()=>{
			// 실제 비즈니스 로직
		})
	}
	// 여기서부터 뒤1
	catch ( e ) {
		console.log( e );
	}
}

// 2. 리펙터링 할 코드를 함수로 빼낸다.
// 빼낸 함수의 인자로 넘길 부분을 또 다른 함수로 빼냅니다.
const pollingRefactor = ( runFun = () => "" , runFunAlr = () => "" ) => {
	
	try { // 앞
		
		setInterval(()=>{
			// 본문
			runFun( runFunAlr )
			
		})
	}
		// 여기서부터 뒤
	catch ( e ) {
		console.log( e );
	}
}

