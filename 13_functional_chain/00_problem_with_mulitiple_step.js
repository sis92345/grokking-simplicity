/**
 * 1 - problem
 *
 * 보통 함수 하나로 요구사항이 완료되지 않는다. 요구 사항은 여러 요구사항을 포함한다. 예를들어..
 *
 * 제품을 3개 이상 구매한 우수 고객 중 가장 비싼 구매를 알려주세요!
 * 이러면 3개 이상 구매한 우수 고객을 계산한 후 그 고객들이 산 가장 비싼 구매를 알려줘여 한다.
 * */


const biggestPurchaseBestCustomers = ( customers ) => {
	
	// 1. 3개 이상 구매한 우수 고객을 구한다
	const bestCustomers = customers.filter( ( customer ) => customer.purchases.length >= 3 );
	
	// 2. 우수 고객을 가장 비싼 구매로 바꾼다.
	const biggestPurchases = bestCustomers.map( (customer) => {
		// 콜백이 중첩되어 이해하기 어렵다. 이를 함수형 도구에서 사용할 수 있도록 분리한다.
		customer.purchases.reduce( ( previousItem, currentItem ) => {
			return currentItem.total < previousItem.total ? previousItem : currentItem;
		} , { total : 0 })
	})
}

/**
 * 1 - solve
 *
 * 이렇게 함수에 중첩된 콜백이 존재할 경우.. 콜백 지옥일 경우 다음과 같이 체인을 명확하게 만들 수 있다.
 *
 * 1. 단계에 이름 붙이기
 * 2. 콜백에 이름 붙이기
 *
 * 콜백에 이름을 붙이는 방식이 더 깔끔하다
 * 콜백에 이름 붙이기!!
 * */

// 1. 단계에 이름 붙이기 : 각 단계의 고차 함수를 분리해서 구현 가능
function biggestPurchaseBestCustomer_( customers ) {
	
	const _private = {
		selectBestCustomer : ( customer ) => customer.purchases.length >= 3,
		getBiggestPurchase : ( customer ) => { customer.purchase.reduce( (priItem, currItem) => priItem.total <= currItem.total ? currItem : priItem  , { total : 0 } ) }
,		getBiggestPurchases : ( customers ) => customers.map( ( customer)  => this.getBiggestPurchase( customer ) )
	}
	
	// 고차 함수를 분리
	const bestCustomer = _private.selectBestCustomer( customers );
	const biggestPurchase = _private.getBiggestPurchases( bestCustomer );
}

// 2. 콜백에 이름 붙이기
function biggestPurchaseBestCustomer( customers ) {
	
	const _private = {
		selectBestCustomer : ( customer ) => customer.purchases.length >= 3,
		getBiggestPurchase : ( customer ) => { customer.purchase.reduce( (priItem, currItem) => priItem.total <= currItem.total ? currItem : priItem  , { total : 0 } ) },
		getBiggestPurchases : ( customers ) => customers.map( ( customer)  => this.getBiggestPurchase( customer ) )
	}
	
	// 고차 함수를 분리 : 자세한 건 생략
	const bestCustomers = customers.filter( customer => _private.selectBestCustomer( customer ) );
	const biggestPurchase = bestCustomers.map( customer => _private.getBiggestPurchase() )
}