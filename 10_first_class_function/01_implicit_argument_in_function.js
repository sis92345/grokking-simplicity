/**
 * 1 - what
 * 다른 부서에서 아래와 같은 요청사항이 들어왔다.
 *
 * 1. 장바구니에 있는 제품 값을 설정하는 기능
 * 2. 장바구니에 있는 제품 개수를 설정하는 기능
 * 3. 장바구니에 있는 제품에 배송을 설정하는 기능
 *
 * 위 기능은 모두 비슷하다. 이 기능을 만들 때 아래와 같이 모두 메소드로 빼야 할 까?
 * */

// 1. 장바구니에 있는 제품 값을 설정하는 기능
function setPriceByName( cert , name, price ) {
	
	const item = cert[name];
	return objectSet( item, "price", price );
}

// 2. 장바구니에 있는 제품 개수를 설정하는 기능
function setQuantityByName( cert , name, quantity ) {
	
	const item = cert[name];
	const newItem = objectSet( item , "quantity" , quantity );
	return objectSet( item, name, newItem );
}

// 3. 장바구니에 있는 제품에 배송을 설정하는 기능
function setShippingByName( cert , name, ship ) {
	
	const item = cert[name];
	const newItem = objectSet( item , "shipping" , ship );
	return objectSet( item, name, newItem );
}

// 4. 장바구니에 있는 제품에 세금을 설정하는 방법
function setTaxByName( cert , name, tax ) {
	
	const item = cert[name];
	const newItem = objectSet( item , "tax" , tax );
	return objectSet( item, name, newItem );
}


function objectSet( object , key , value ) {
	const copy = Object.assign( {} , object );
	copy[key] = value;
	return copy;
}

/**
 * 1 - problem implicit argument in function name
 * - 위 함수는 설정할 필드의 이름만 같고 모두 같다. 즉 함수의 이름이 암시적으로 인자를 나타내고 있다
 * - 이를 함수 이름에 있는 암묵적 인자라고 부른다.
 *
 * 함수 이름에 암묵적 인자가 있을 경우 다음 특징을 보인다.
 * 1. 함수 구현이 똑같다.
 * 2. 함수 이름이 구현의 차이를 만든다.
 *
 * 위 코드에서 Tax가 어떤 값으로 들어올 지 예상이 되는가? 세금이니까 number 어떤 세금인지 명시하는 string? 따라서 이를 명시적으로 field로 변경하는 것이 좋다.
 * */

/**
 * 1 - solve
 * 함수 이름의 암묵적 인자는 암묵적 인자 드러내기 리팩토링으로 사용할 수 있다.
 * 즉 암묵적인 인자를 명시적인 인자로 변경한다.
 *
 * 1. 함수 이름에 있는 암묵적 인자를 찾는다.
 *  - 각 함수 이름에 있는 암묵적 인자 : price , tax , shipping, quantity
 * 2. 명시적인 인자를 추가한다.
 *  - field로 변경한다.
 * 3. 함수 본문에 하드 코딩된 값을 인자로 바꾼다.
 * 4. 함수를 부르는 고친다.
 * */

// 사실 위의 4개 함수는 공통화할 수 있다.
function setFieldByName( cert , name , field , value ) {
	
	const item = cert[name];
	// 이제 field는 item의 다른 값처럼 사용할 수 있으므로 일급 값입니다.
	const newItem = objectSet( item , field , value );
	return objectSet( cert , name , newItem );
}

// 추가 예제

// problem
const cook = (a) => {};
const eat = (a) => {};

const foods = [];

function cookAndEatFoods() {
	for ( let i = 0; i < food.length; i++ ) {
		
		const food = foods[i];
		
		cook( food );
		eat( food );
	}
}

// solve - 1 : 리펙토링된 함수이다. 다만 이 함수도 eatAndFood라는 함수를 사용하고 있기 때문에 냄새가 있는 코드이다.
function cookAndEatArray( array ) {
	
	const eatAndFood = ( object ) => {
		cook( object );
		eat( object );
	}
	
	for ( let i = 0; i < array.length; i++ ) {
		
		const food = foods[i];
		eatAndFood(food);
	}
}

// solve 1 - 1
function operateArray( array , operateFunction ) {
	
	array.forEach( item => {
		operateFunction( item );
	})
}