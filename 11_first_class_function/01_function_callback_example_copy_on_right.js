/**
 * 1 - what
 *
 * 카이 온 라이트 리펙토링을 통한 콜백 분리 예제
 * */

// 1. 카피온 라이트 함수의 앞, 뒷 부분을 확인한다.
function arraySet( array , idx , value ) {
	
	// 앞
	const copy = [...array];
	// 본문
	copy[idx] = value;
	// 뒤
	return copy;
}

function drop_last ( array ) {
	// 앞
	const array_copy = [...array];
	// 본문
	array_copy.pop();
	//뒤
	return array_copy;
}

// 2. 함수 빼내기 : 앞 뒤는 함수의 핵심이므로 이 부분을 분리해서 함수로 생성
// 여기서 분문을 함수로 콜백으로 빼내기 리팩터링을 적용
const withArrayCopy = ( array , modifiedFunc ) => {
	// 앞
	const array_copy = [...array];
	// 본문
	modifiedFunc(array)
	//뒤
	return array_copy;
}

/**
 * 1 - solve
 * 이제 본문을 함수로 빼내기 리펙토링을 사용해봅시다.
 * 핵심은 이 리펙토링을 적용한다는 사실 보다는, 호출마다 달라지는 함수를 변경
 * */

function arraySetRefactor (  array , idx , value ) {
	return withArrayCopy( array, ( copy ) => {
		copy[ idx ] = value;
	} )
}

arraySetRefactor( [ { key : "AN" } , { key : "AN" } ] , 1 , { key : "SON" } )

// 사실 아래 방법이 더 좋은 방법입니다!
function arraySetBuilder ( modifyLogic ) {
	
	return ( { array , idx, name ,value }) => withArrayCopy( array , modifyLogic( array , idx , name , value  ) );
}

// 이렇게 전에 만들어 놓고...
const copyOnRightByIndex = arraySetBuilder( ( { array , idx ,value } ) => array[idx] = value );
const copyOnRightByName = arraySetBuilder( ( { array , name ,value } ) => array[name] = value );

// 이렇게 사용 가능
copyOnRightByIndex( { array : [] ,idx : 0 , value : 3 });
copyOnRightByName( { array : {} , name : "key" , value : 3 });

// 전 챕터의 try catch 문을 본문을 함수로 빼내기 방법을 사용한다면 더욱 더 좋은 방법이 됩니다;
function axiosLogBuilder ( runFunction ) {
	
	return function ( ...args) {
		const _logSender = (e) => "";
		try {
			runFunction( ...args );
		}
		catch ( e ) {
			_logSender( e );
		}
	}
}

const saveUserAxios = axiosLogBuilder( () => {
	// 로직 로직
} )

saveUserAxios( 1, 2, 3, 4, 5 );