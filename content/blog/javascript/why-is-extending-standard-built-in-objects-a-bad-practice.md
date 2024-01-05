---
title: JavaScript에서 내장 객체를 확장하는 것이 위험한 이유
date: '2023-05-03 10:16:52'
category: javascript
tags:
  - JavaScript
keywords:
  - 프로토타입
authorId: jaemin
thumbnail: ../thumbnails/js-expansion.jpg
summary: >-
  편리해 보이지만 예상치 못한 결과를 초래할 수 있는 일반적인 JavaScript 사례인 Array.prototype과 같은 표준 내장 객체를 확장하는 방법을 알아봅니다. 그리고 잠재적인 위험의 예를 자세히 살펴보고, 보다 읽기 쉽고 유지보수하기 쉬운 코드를 작성하는 데 도움이 되는 대체 접근 방식에 대해 알아봅니다. 또한 Object.definedProperty()를 사용하여 객체를 더 안전하게 확장하는 방법을 소개합니다.
---

## **내장 객체 확장의 매력**

JS로 작업할 때 `Array.prototype`과 같은 내장 객체에 직접 함수를 추가하려고 할 수도 있습니다. 이는배 열 인스턴스에서 직접 추가한 함수를 호출할 수 있기 때문에 좋아 보일 수 있습니다. 그러나 이렇게 하면다 른 개발자와 협업하거나 라이브러리를 사용할 때 충돌이 발생하고 코드를 이해하기 어려워질 수있습니다.

들어가기 전에 `Array.prototype` 과 `Array 생성자` 에 함수를 추가할 때 차이점에 대해 살펴보겠습니다.

### 두 방법의 차이점

`Array.prototype` 을 사용하여 Array 객체에 함수를 추가하면 Array 객체의 프로토타입이 확장됩니다. 이 는 배열의 모든 인스턴스가 추가된 함수에 액세스할 수 있음을 의미합니다. 반면 `Array.replace = …` 처럼 사용하는 경우에는 프로토타입이 아닌 Array 생성자 자체에 정적 함수를 추가하게 됩니다.

이 두 방법의 차이점에 대해 간단한 예시와 함께 살펴보도록 하겠습니다.

1. Array.prototype

   - `Array.prototype` 에 함수를 추가하면 모든 **Array 인스턴스에서** 함수를 사용할 수 있습니다.
   - 이는 모든 Array 인스턴스가 `Array.prototype` 에서 상속되기 때문입니다.

   ```tsx
   Array.prototype.myFunction = () => 'hello world';

   const arr = [1, 2, 3];
   arr.myFunction(); // Output: 'hello world'
   ```

2. Array constructor

   - Array 생성자에 직접 함수를 추가하면 정적 함수가 됩니다.
   - 정적 함수는 배열 인스턴스의 일부가 아니라 생성자 자체의 일부입니다.
   - 이는 Array의 인스턴스가 아닌 **Array 생성자에서만** 액세스할 수 있음을 의미합니다.

   ```tsx
   Array.myFunction = () => 'hello world';

   const arr = [1, 2, 3];
   arr.myFunction(); // Output: TypeError: arr.myFunction is not a function
   Array.myFunction(); // Output: 'hello world'
   ```

이제 위 방법으로 확장하는 게 왜 좋지 않은지 살펴보도록 하겠습니다.

## 문제가 발생할 수 있는 상황

`Array.prototype`과 같은 내장 객체를 확장하는 것은 일반적으로 좋은 방법이 아닙니다. 위에서말했다시피 프로토타입을 수정하면 충돌이 발생할 수 있으며 코드를 이해하고 유지보수하기가 더 어려워질수 있기 때문 입니다.

이제 내장 객체 확장의 잠재적인 위험을 보여주는 예를 살펴보겠습니다. 두 개의 JavaScript 라이브러리(라 이브러리 A 및 라이브러리 B)를 사용하는 웹 애플리케이션을 개발하고 있다고 가정해보겠습니다.

각 라이브러리의 구현 코드는 아래와 같습니다.

- 라이브러리 A

  - 배열에서 `oldValue`의 **첫 번째 항목만** `newValue`로 바꿉니다. 중첩된 배열에서는 교체 작업을수 행하지 않습니다.

  ```tsx
  // Library A

  type NestedArray<T> = Array<T | NestedArray<T>>;

  declare global {
    interface Array<T> {
      replace<U extends T>(oldValue: U, newValue: U): NestedArray<T>;
    }
  }

  Array.prototype.replace = function <T>(
    this: NestedArray<T>,
    oldValue: T,
    newValue: T,
  ): NestedArray<T> {
    if (Array.isArray(this)) {
      let replaced = false;
      return this.map((item) => {
        if (!replaced && item === oldValue) {
          replaced = true;
          return newValue;
        }
        return item;
      });
    }
    return this;
  };

  export {};
  ```

- 라이브러리 B

  - 배열에서 `oldValue`의 **모든 항목**을 `newValue`로 바꾸고 중첩 배열을 재귀적으로 처리하여 동일한 교체 작업을 수행합니다.

  ```tsx
  // Library B

  type NestedArray<T> = Array<T | NestedArray<T>>;

  declare global {
    interface Array<T> {
      replace<U extends T>(oldValue: U, newValue: U): NestedArray<T>;
    }
  }

  Array.prototype.replace = function <T>(
    this: NestedArray<T>,
    oldValue: T,
    newValue: T,
  ): NestedArray<T> {
    if (Array.isArray(this)) {
      return this.map((item) => {
        if (Array.isArray(item)) {
          return (item as unknown as T[]).replace(oldValue, newValue);
        }
        return item === oldValue ? newValue : item;
      });
    }
    return this;
  };

  export {};
  ```

요약하면 `library-a`의 `replace`는 배열에서 처음 나타나는 값을 바꾸는 데 사용되는 반면, `library-b`의 `replace` 는 중첩 배열을 포함하여 모든 값을 바꾸는 데 사용됩니다.

이처럼 두 라이브러리 모두 `replace` 로 **이름은 같지만 구현과 목적이 다른 `replace` 함수를추가하여** **`Array.prototype`을 확장**하고 있습니다. 아래 코드를 보며 이처럼 프로토타입을 수정하면생길 수 있는 문제점을 살펴 보겠습니다.

```tsx
import 'library-b';
import 'library-a';

const arr1 = [1, [2, 1]];
// [1, [3, 1]]이 출력되길 원합니다 (library-a의 replace 함수가 실행됨)
console.log(arr1.replace(2, 3)); // 실제 출력 결과: [1, [2, 1]]

const arr2 = [10, '2', '2', '1'];
// [10, '1', '1', '1']이 출력되길 원합니다
console.log(arr2.replace('2', '1')); // 실제 출력 결과: [10, '1', '2', '1']

---

import 'library-a';
import 'library-b';

const arr1 = [1, [2, 1]];
// [1, [3, 1]]이 출력되길 원합니다 (library-b의 replace 함수가 실행됨)
console.log(arr1.replace(2, 3)); // 실제 출력 결과: [1, [3, 1]]

const arr2 = [10, '2', '2', '1'];
// [10, '1', '1', '1']이 출력되길 원합니다
console.log(arr2.replace('2', '1')); // 실제 출력 결과: [10, '1', '1', '1']
```

`library-a`와 `library-b`를 모두 가져오는 경우 가져오는 순서에 따라 결과값이 변경되는 것을 확인할 수 있습니다. 첫 번째 경우는 `library-b` 다음에 `library-a` 를 가져오므로 `library-a` 의 함수가 `library-b` 의 `replace` 함수를 덮어씁니다. 이는 두 라이브러리가 동일한 전역 `Array.prototype` 객체 를 수정하기 때문입니다.

이처럼 두 라이브러리를 모두 사용하는 상황일 경우 **충돌이 발생**하여 한 구현이 다른 구현을 덮어쓰게 되어 예기치 않은 동작이 발생하고 코드를 이해하고 디버깅하기 어려울 수 있습니다.

## **더 안전한 대안: Standalone Utility Function**

내장 객체를 확장하는 대신 코드베이스 전체에서 가져오고 사용할 수 있는 유틸리티 함수를 만드는 것이좋 습니다. 이 접근 방식은 내장된 Array 객체를 수정하지 않고 다른 라이브러리나 개발자 코드와의잠재적인충 돌을 방지하기 때문에 더 안전하고 유지보수가 쉽습니다.

예를 들어, 유틸리티 함수를 만들어 `Array.prototype`을 수정하지 않고 배열의 특정 항목을 교체하는것입 니다. 아래 코드는 위 `Array.prototype` 을 확장하던 코드를 유틸리티 함수로 구현한 코드입니다.

```typescript
// utils/array.ts

type NestedArray<T> = Array<T | NestedArray<T>>;

const replace = <T>(array: NestedArray<T>, oldValue: T, newValue: T): NestedArray<T> => {
  if (Array.isArray(array)) {
    let replaced = false;
    return array.map((item) => {
      if (!replaced && item === oldValue) {
        replaced = true;
        return newValue;
      }
      return item;
    });
  }
  return array;
};

const replaceAll = <T>(array: NestedArray<T>, oldValue: T, newValue: T): NestedArray<T> => {
  if (Array.isArray(array)) {
    return array.map((item) => {
      if (item === oldValue) {
        return newValue;
      } else if (Array.isArray(item)) {
        return replaceAll(item, oldValue, newValue);
      } else {
        return item;
      }
    });
  }
  return array;
};

export { replace, replaceAll };
```

이 유틸리티 함수들을 사용하기 위해 가져옵니다.

```tsx
// main.ts
import { replace, replaceAll } from './utils/array';

const arr1 = [1, [2, 1]];
const arr2 = [10, '2', '2', '1'];

console.log(replace(arr1, 2, 3)); // Output: [1, [2, 1]]
console.log(replaceAll(arr1, 2, 3)); // Output: [1, [3, 1]]
console.log(replace(arr2, '2', '3')); // Output: [10, '3', '2', '1']
console.log(replaceAll(arr2, '2', '3')); // Output: [10, '3', '3', '1']
```

이렇게 하면 유틸리티 함수가 `Array.prototype` 을 수정하지 않으며 필요에 따라 가져와 사용할 수있습니 다.

## Object.defineProperty()를 사용하여 객체를 보다 안전하게 확장

그래도 배열 인스턴스에서 호출해 사용하고 싶을 수도 있겠죠. 이럴 땐 `Object.defineProperty()`을사용하 여 더 안전하게 추가할 수 있습니다. `Object.defineProperty()` 정적 함수는 객체에 새로운 속성을직접 정 의하거나 이미 존재하는 속성을 수정한 후, 해당 객체를 반환합니다. 객체에 새 속성을 정의하고속성을 지 정하며 실수로 덮어쓰거나 하는 충돌을 방지할 수 있습니다.

아래 코드는 `Object.defineProperty()` 을 사용해 `Array.prototype` 에 `replace` 함수를 추가하는 예시 코드입니다.

```tsx
const arr1 = [1, 2, 3, 2];

if (!Array.prototype.replace) {
  Object.defineProperty<unknown[]>(Array.prototype, 'replace', {
    value: function (oldValue: unknown, newValue: unknown) {
      let replaced = false;
      return this.map((item: unknown) => {
        if (!replaced && item === oldValue) {
          replaced = true;
          return newValue;
        }
        return item;
      });
    },
    configurable: true, // `true`로 설정하면 나중에 속성을 삭제하거나 변경할 수 있습니다.
  });
}

console.log(arr1.replace(2, 555)); // Output: [1, 555, 3, 2]
```

`configurable` 속성의 기본값은 false입니다. 따라서 정의된 속성을 재정의하려고 하면 "TypeError: Cannot redefine property: replace" 오류가 발생합니다 . 이 오류는 JavaScript가 속성의 재정의를허용하 지 않기 때문에 발생합니다.

이 오류를 방지하려면 먼저 속성이 이미 존재하는지 확인하면 됩니다. `replace` 함수가 `Array.prototype`에 이미 존재하는지 확인하는 것이죠. 존재하지 않는 경우 함수가 정의됩니다. 또한 `configurable` 속성을 true로 설정하여 속성을 다시 정의할 수 있도록 했습니다. 자세한 건 [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#parameters)에 서확인할 수 있습니다.

## **결론**

개발자로서 JavaScript에서 표준 내장 객체 확장과 관련된 잠재적인 위험을 인지하는 게 중요합니다. 유틸 리티 함수와 보다 안전한 `Object.defineProperty()` 함수를 사용하면 충돌을 방지하고 코드유지보수성을향 상시키며 동료와 보다 효과적으로 협업할 수 있습니다. 따라서 다음 번에 내장된프로토타입을 수정하고싶을 때는 다시 한 번 생각해 보고 더 안전한 대안을 고려해 보는 것을추천드립니다.

## 참고

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#parameters)
