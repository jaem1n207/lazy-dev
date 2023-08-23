---
title: "Gatsby에서 원활한 경험을 보장하기: window 객체 사용"
date: "2023-04-20 16:39:38"
category: gatsby
tags:
  - Gatsby
  - DX
keywords:
  - 개츠비
  - browser-monads
authorId: jaemin
thumbnail: ../thumbnails/gatsby-thumbnail.jpeg
summary: Gatsby의 특성을 알아보고 Gatsby에서 window 객체를 사용하기 위한 여러가지 방법을 알아봅니다.
---

## 들어가며

Gatsby는 개발 환경에서는 브라우저, 빌드 프로세스 중엔 Node.js 환경에서 실행됩니다. 이러한 특성으로 인해 브라우저 환경에서만 사용할 수 있는 전역 객체인 `window` 객체를 사용할 때 혼란을 초래할 수 있습니다.

이 글에서는 Gatsby가 작동하는 방식과 그렇게 작동하는 이유, `useEffect` 훅 외부에서 `window` 객체를 사용할 때 방어 코드의 필요성, `useEffect` 훅에서 `window` 객체를 사용하는 것이 허용되는 이유 및 [browser-monads](https://www.npmjs.com/package/browser-monads) 패키지를 사용하여 방어 코드를 작성하지 않고 브라우저와 비브라우저 환경 모두에서 원활하게 작동하는 코드를 작성하는 방법을 알아보겠습니다.

## Gatsby를 선택한 이유

얼마 전, 개발 블로그를 만들기 위해 크게 아래와 같은 이유로 `Gatsby`를 선택해 개발하게 되었습니다.

- **높은 성능**: Gatsby는 정적 HTML 파일을 생성하여 매우 빠른 페이지 로드와 향상된 사용자 경험을 제공합니다. 또한 이미지 최적화, 코드 스플리팅, 지연 로딩도 간단하게 할 수 있게 기본 제공해줍니다.
- **정적 사이트 생성(SSG)**: React의 SSR 기능을 활용하여 빌드 프로세스 중에 정적 파일을 생성합니다. 이렇게 되면 CSR에 비해 더 나은 SEO, 더 빠른 페이지 로드가 가능합니다.
- **뛰어난 데이터 결합**: GraphQL을 사용하여 CMS, API 및 로컬 파일과 같은 다양한 소스에서 데이터를 가져올 수 있습니다. 이러한 유연성은 개발 블로그를 만드는 데 큰 이점을 줄 것 같았습니다.
- **플러그인 생태계**: 프로젝트의 기능을 향상하거나 확장하기 위해 쉽게 추가 가능한 방대한 플러그인 생태계를 제공합니다. 이 모듈식 접근 방식은 개발 시간을 절약하고 깔끔한 코드베이스를 유지하는 데 많은 도움이 되었습니다.

물론 `Next.js` 또한 SSG와 SSR에 중점을 둔 좋은 프레임워크지만 Gatsby의 데이터 처리와 빠르게 개발 가능하게 해주는 방대한 플러그인들이 이와 차별화 된다고 생각했습니다.

결론적으로 성능, 데이터 처리의 유연성, 광범위한 플러그인 생태계 및 활성화된 커뮤니티 및 문서에 중점을 둔 Gatsby를 선택하게 되었습니다.

그런데 사용할수록 정말 만족하던 Gatsby였지만 유일하게 거슬리던 게 있었습니다. 스크롤 이벤트나 화면 사이즈 정보를 가져오기 위해 `window` 객체를 사용했습니다. 그러나 Gatsby의 이중 환경에 의해 `window` 객체를 사용하려면 항상 존재 여부를 확인하는 방어 코드를 작성해야만 했습니다.

## Gatsby의 이중 환경 이해 및 window 객체 사용

Gatsby는 애플리케이션을 빠르게 개발하기 위해 **개발 환경**에서 작업할 때 **브라우저에서 실행**되어 HMR, 실시간 프리뷰와 같은 기능을 제공하여 개발자 경험을 향상시킵니다. 그러나 **빌드 프로세스** 중에 **Node.js 환경**에서 작동하여 최적화된 정적 파일을 생성하고 로컬 파일과 같은 다양한 소스에서 데이터를 가져와 처리합니다. 이러한 최적화는 더 빠른 로드 시간과 더 나은 성능을 제공할 수 있게 되므로 유저에게 좋은 경험을 줄 수 있게 해줍니다.

다만 이러한 Gatsby의 이중 환경으로 인해 Gastby를 사용해 개발할 때는 브라우저 환경에서만 사용할 수 있는 `window` 객체를 사용할 때 주의해야 합니다. 만약 `window` 객체를 사용해야 한다면 아래와 같은 방법들을 사용해야 합니다.

### window 객체에 대한 방어 코드

위에서 설명했듯이, 개발 중에는 CSR과 동일한 환경에서 동작하기 때문에 window 객체가 존재하지만 빌드 중에는 Node 환경에서 window 객체가 존재하지 않습니다. 따라서 Gatsby 프로젝트가 두 환경에서 원활하게 실행되도록 하려면 `window` 객체를 사용할 때 방어 코드를 작성하는 것이 중요합니다.

```tsx
const isBrowser = typeof window !== "undefined"

export default const MyComponent = () => {
  let loggedIn = false
  if (isBrowser) {
    window.localStorage.getItem("isLoggedIn") === "true"
  }

  return <div>Am I logged in? {loggedIn}</div>
}
```

위 코드는 Gatsby가 빌드하는 동안 코드가 실행되지 않도록 `window` 객체가 정의되어 있는지 확인하는 것을 의미합니다. 이렇게 하지 않으면 빌드 프로세스 중 오류가 발생합니다.

### useEffect 훅 내부에서 사용

`useEffect` 훅은 구성 요소가 렌더링된 후 클라이언트 측(브라우저 환경)에서만 실행됩니다. 이렇게 하면 방어 코드를 작성하지 않고도 `useEffect` 훅 내부에선 안전하게 사용할 수 있습니다.

```tsx
useEffect(() => {
  const handleScroll = () => {...}
  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])
```

### browser-monads 패키지 사용

`browser-monads` 패키지는 내부적으로 방어 코드를 처리하는 일련의 모나드 함수를 제공하여 Gatsby 프로젝트에서 `window` 객체로 작업하는 프로세스를 단순화합니다. `browser-monads` 를 사용하면 `window` 객체에 액세스하는 문제를 해결하는 데 도움이 됩니다. 이 패키지는 브라우저와 Node.js 환경 모두에서 코드가 원활하게 작동하도록 보장하기 때문입니다.

그럼 어떻게 두 환경에서 코드가 원활하게 작동하도록 보장할까요? `browser-monads` 패키지가 이를 달성하는 방법은 다음과 같습니다.

1. 해당 패키지에서는 window, document와 같은 몇 가지 모나드를 반환합니다.
2. 브라우저 환경에서 사용될 때 내보낸 모나드는 실제 `window` 및 `document` 객체에 대한 참조이므로 필요한 기능을 사용할 수 있습니다.
3. 브라우저가 아닌 환경(ex: Node.js 또는 SSR 중)에서는 `nothing` 의 인스턴스가 됩니다. 즉, 이러한 객체의 속성이나 메서드에 참조하려고 하면 오류가 발생하지 않고 단순히 “nothing” 값을 반환합니다.
`nothing` 인스턴스는 호출하는 메서드에 관계없이 항상 자신을 반환하는 기본 프록시입니다. 즉, 인스턴스가 존재하지 않는 경우 적합한 대체 자원입니다.
4. 따라서 패키지에서 제공하는 모나드를 사용하면 실행 환경이나 방어 코드 작성에 대해 걱정할 필요 없이 코드를 작성할 수 있습니다.

```jsx
// https://github.com/slmgc/Nothing/blob/master/src/index.js

export const Nothing = (() => {
	const fn = () => Nothing
	fn.toString = fn.toLocaleString = fn[Symbol.toPrimitive] = () => ''
	fn.valueOf = () => false

	return new Proxy(Object.freeze(fn), {
		get: (o, key) => o.hasOwnProperty(key) ? o[key] : Nothing
	})
})()

export const toBool = (o) => !!(o && o.valueOf())
export const isNothing = (o) => o === Nothing
export const isSomething = (o) => !(o === Nothing || o == null)
export const serialize = (o) => JSON.stringify(o, (k, v) => v === Nothing ? null : v)
export const deserialize = (s) => JSON.parse(s, (k, v) => v === null ? Nothing : v)
```

사용하는 방법은 다음과 같습니다.

```tsx
import { window } from ‘browser-monads’

console.log(`Location: ${window.location.href}`)
```

비브라우저 환경에서 코드를 실행하더라도 `browser-monads` 패키지에서 제공하는 모나드가 정상적으로 처리하므로 오류가 발생하지 않습니다.

이처럼 `browser-monads` 패키지를 사용해 오류 가능성을 줄이면서 코드 가독성과 유지보수성을 향상시킬 수 있었습니다.

## 결론

요약하자면, Gatsby의 이중 환경 특성은 `window` 객체를 사용할 때 주의를 요합니다. `useEffect` 훅 내에서 `window` 객체를 사용하면 안전합니다. 만약 `useEffect` 훅 외부에서 사용할 거라면 방어 코드를 작성하거나 `browser-monads` 패키지를 활용하면 두 환경에서 원활한 경험을 보장할 수 있습니다.

## 참고

- [https://www.gatsbyjs.com/docs/debugging-html-builds/](https://www.gatsbyjs.com/docs/debugging-html-builds/)
- [https://medium.com/@Jense5_/use-document-and-window-with-gatsby-e9a92ee31f36](https://medium.com/@Jense5_/use-document-and-window-with-gatsby-e9a92ee31f36)
- [https://github.com/slmgc/Nothing](https://github.com/slmgc/Nothing)