---
title: PUT과 PATCH의 차이점과 멱등성
date: "2024-05-13 12:00:51"
category: http_method
tags:
  - http-method
  - idempotent
keywords: []
authorId: jaemin
thumbnail: ../thumbnails/javascript.jpg
summary: "PUT과 PATCH의 실제 사용 사례, 멱등성에 대해 알아보며 두 메서드의 차이점을 이야기합니다."
---

## 정의

웹 API를 설계할 때 HTTP 표준에 따라 용도에 맞는 HTTP 메서드를 사용해야 합니다.

리소스를 수정하는 용도로 사용하는 HTTP 메서드는 `PUT`과 `PATCH`가 있습니다. 이 글에선 둘 사이의 차이점을 이해하는 데 중점을 둡니다.

먼저 PUT과 PATCH 메서드의 간단한 정의부터 살펴보겠습니다.

### PUT

[RFC](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.6) 문서에 따르면 PUT 메서드는 **새 리소스를 만들거나 리소스를 교체**하는 데 사용됩니다.

- 요청한 URI가 이미 존재하는 리소스를 가리키는 경우
  - 요청 받은 payload에 담긴 정보를 이용해서 새로운 리소스를 만들어 기존에 존재하던 리소스를 완전히 교체합니다. 그러면 서버는 200을 반환(권한이 정상이라고 가정)합니다.
- 요청한 URI가 기존 리소스를 가리키지 않는 경우
  - POST와 마찬가지로 새로운 리소스를 저장하고 서버가 201을 반환(리소스를 생성할 수 있다고 가정)합니다.

전송하는 payload만으로 자원의 전체 상태를 알 수 있어야 합니다. 따라서 PUT 메서드를 사용하는 클라이언트는 해당 자원의 상태를 모두 알고 있다고 가정되어야 합니다.

### PATCH

[RFC](https://datatracker.ietf.org/doc/html/rfc5789) 문서에 따르면 기존 리소스의 **일부를 업데이트**할 때 사용됩니다.

PATCH는 부분 수정을 위한 데이터만 요청의 payload로 보내면 됩니다.

### 차이점

이 두 요청 메서드는 자원을 수정한다는 건 같지만 명확한 차이점이 존재합니다.

여기서 `1` 유저의 “email” 속성만 변경하고 싶을 때 PUT과 PATCH를 사용했을 때 차이점을 살펴보겠습니다.

먼저 PUT 요청의 예시를 살펴보겠습니다:

```json
GET /users/1
{
  "userName": "1",
  "email": "one@example.com"
},
PUT /users/1
{
  "email": "first@example.com"
}
GET /users/1
{
  "email": "first@example.com"
},
```

PUT을 사용했을 때 “email” 속성만 전달했기 때문에 이 자원에는 “email” 속성만 있습니다. 이로 인해 데이터 손실이 발생했습니다.

이제 PATCH 요청의 예시를 살펴보겠습니다:

```json
GET /users/1
{
  "userName": "1",
  "email": "one@example.com"
},
PATCH /users/1
{
  "email": "first@example.com"
}
GET /users/1
{
  "userName": "1",
  "email": "first@example.com"
},
```

PATCH를 사용했을 때 수정을 원하는 속성만 포함해 전달하면 해당 속성만 업데이트하고 나머지는 그대로 놔둡니다.

그럼 이 상황에서 어떻게 하면 PUT 요청을 사용할 때 PATCH와 동일한 결과를 내도록 할 수 있을까요?

```json
PUT /users/1
{
  "userName": "1",
  "email": "first@example.com"
}
```

전체 속성을 명시해주면 위 PATCH와 동일한 결과를 낼 수 있습니다. 이제 이 둘의 차이점을 알 수 있습니다.

PUT에는 이 사용자에 대한 모든 속성이 포함되지만 PATCH에는 수정할 속성만 포함됩니다.

## 멱등성

여기서 멱등성이란 의미는 동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일하게 남을 때를 의미합니다.

[9가지 HTTP 요청 메서드 특징](https://lazy-dev.netlify.app/http_method/http-request-methods) 글을 보셨다면 PUT 메서드는 멱등성을 지니고 PATCH 메서드는 멱등성을 지니지 않는다는 것을 알고 있을 것입니다.

위 예에서 PUT과 PATCH 모두 `1` 사용자의 이메일 주소를 변경한다는 동일한 목표를 달성합니다. 하지만 PUT은 전체 속성을 교체하여 처리하는 반면, PATCH는 제공된 속성만 업데이트합니다.

PUT 요청은 전체 속성이 포함되므로 동일한 요청을 반복해도 항상 동일한 결과가 나타납니다. 전송한 데이터가 자원의 전체 데이터기 때문입니다. 따라서 PUT은 멱등성을 지닌다고 할 수 있습니다. 반면 PATCH는 멱등성을 지니지 않습니다.

필자는 “PATCH도 결국 동일한 요청을 여러 번 보내도 동일한 결과가 반환되지 않나? 왜 멱등성을 지니지 않을까?” 라는 생각을 했었습니다. [여기](https://stackoverflow.com/questions/28459418/use-of-put-vs-patch-methods-in-rest-api-real-life-scenarios/39338329#39338329)서 좋은 정보를 얻을 수 있었고 이 글을 작성하게 되었습니다.

### PATCH가 멱등성을 지니지 않는 이유

/users 리소스가 있다고 가정하고, `GET /users`를 호출해 사용자 목록을 응답으로 받았다고 가정합니다:

```json
[
  {
    "userName": "1",
    "email": "one@example.com"
  }
]
```

서버가 /users를 허용한다고 가정하고 PATCH 요청을 해보겠습니다:

```json
PATCH /users
{
  "userName": "2",
  "email": "two@example.com"
}
```

`2` 사용자를 사용자 목록에 추가하도록 요청합니다. 이렇게 처음 호출하면 아래 자원이 반환됩니다:

```json
[
  {
    "userName": "1",
    "email": "one@example.com"
  },
  {
    "userName": "2",
    "email": "two@example.com"
  }
]
```

그리고 위와 똑같은 PATCH 요청을 한 번 더 요청(/users 리소스가 중복 사용자 이름을 허용한다고 가정)합니다. 그럼 새 사용자가 목록에 추가되고 아래 자원이 반환됩니다:

```json
[
  {
    "userName": "1",
    "email": "one@example.com"
  },
  {
	  "userName": "2",
	  "email": "two@example.com"
	}
  {
	  "userName": "2",
	  "email": "two@example.com"
	}
]
```

정확히 동일한 end-point에 동일한 PATCH를 실행했음에도 불구하고 /users 리소스가 다시 변경되었습니다. PATCH가 f(x)인 경우, f(f(x))는 f(x)와 같지 않으므로 PATCH는 멱등성을 지니지 않는다고 말할 수 있습니다.

## 참고

- https://developer.mozilla.org/en-US/docs/Glossary/Idempotent
- https://stackoverflow.com/questions/28459418/use-of-put-vs-patch-methods-in-rest-api-real-life-scenarios/39338329#39338329
- https://tecoble.techcourse.co.kr/post/2020-08-17-put-vs-patch/
