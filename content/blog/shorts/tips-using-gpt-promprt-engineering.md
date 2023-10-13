---
title: 프롬프트 엔지니어링을 이용한 ChatGPT 200% 활용 팁
date: '2023-09-08 11:22:15'
category: shorts
tags:
  - Tip
keywords: []
authorId: jaemin
thumbnail: ../thumbnails/react-profile.jpg
summary: ChatGPT에서 최상의 결과를 얻을 수 있는 것으로 입증된 5가지 프롬프트 패턴을 알아봅니다.
---

이 글은
[노마드 코더님의 영상](https://www.youtube.com/watch?v=WRkig3VeRLY&ab_channel=%EB%85%B8%EB%A7%88%EB%93%9C%EC%BD%94%EB%8D%94NomadCoders)
내용이 유용해 옮긴 글입니다. 이 글에 작성된 내용은 영상에서 확인할 수 있습니다.

ChatGPT를 올바르게 잘 활용한다면 생산성을 향상할 수 있습니다. 하지만 ChatGPT를 100% 신뢰할 순
없는데요. 실제로 스택 오버플로우에서 517개의 코딩 문제를 제시했을 때, ChatGPT는 52%의 경우
부정확하거나 작동하지 않는 코드가 포함된 답변을 제공한 것으로 나타났다고 합니다. 또 다른 문제는 이
모델이 정답을 틀리거나 반만 맞더라도, 꽤 **설득력 있는 답변**을 생성하는 것입니다.

때때로 환각을 보고 무언가를 지어내기 때문에 모든 답변을 신뢰할 수 없으며, 질문하는 주제에 대해 어느
정도 이해해야만 답변을 평가할 수 있습니다. 그래서 ChatGPT는 우리를 대체할 도구라기보다는 생산성을
높여주는 도구로 볼 수 있겠습니다.

그럼 어떻게 사용하면 좋을까요? 질문의 틀을 잘 짜는 방법을 알게 되면 ChatGPT에서 최상의 결과를 얻을
수 있습니다. 이 글에서는 ChatGPT에서 더 나은 답변을 얻을 수 있는 것으로 입증된 5가지 프롬프트 패턴을
알아보도록 하겠습니다. 패턴의 효과는 필요한 내용에 따라 다를 수 있으며 질문에 더 적합한 패턴을 찾을
때까지 자유롭게 혼합하거나 번갈아 가며 사용하면 됩니다.

## 페르소나 패턴

내가 **관심 있는 주제에 관해서만** 이야기하도록 하는 방법입니다. 실제로 활용하는 상황을 보겠습니다.

코드를 **검토**하거나 코드에서 **버그**를 찾고 싶을 때는 다음과 같이 ChatGPT에게 알려줄 수 있습니다.

> 당신은 ABC 회사의 선임 엔지니어인 척할 것입니다. 보안과 성능에 주의를 기울여 다음 코드를
> 검토하세요. 선임 엔지니어라면 해당 코드에 대해 생성할 수 있는 출력을 제공하세요.

또한, 블로그 글을 검토하도록 할 때는 다음과 같이 ChatGPT에게 알려줄 수 있겠죠.

> 이제부터 책 편집자가 되어 가독성에 중점을 두고 다음 블로그 글을 검토해 보세요.

이런 식으로 말한 다음에 질문하면 됩니다. 그러면 ChatGPT가 더 나은 결과를 제공하기 위해 초점을 맞추고
주목할 대상을 좁힐 수 있습니다.

## 레시피 패턴

달성하고 싶은 목표가 있고, 재료는 알고 있으며, 달성하기 위한 단계는 어느 정도 알고 있지만, 이를 모두
조합하는 데 도움이 필요할 때 유용합니다. 특히 프로그래머에게 유용한 패턴이라고 볼 수 있습니다.
실제로 활용하는 상황을 보겠습니다.

> 데이터를 암호화하는 Rust 프로그램을 작성하려고 합니다. 사용자 입력을 읽고, 유효성을 검사하고,
> 암호화하고, 암호화된 데이터를 반환해야 한다는 것을 알고 있습니다. 이를 위해, 전체 단계 순서를
> 알려주고, 누락된 단계를 채우고, 불필요한 단계가 있는지 확인해 주세요.

여기서 `누락된 단계를 채우세요`라는 건 내가 놓친 부분이 있으면 후속 질문을 하지 않고 ChatGPT가
부족한 부분을 바로 채우도록 하는 것이고, `불필요한 단계를 확인해 주세요`라는 마지막 문구는 더 나은
레시피를 만들기 위해 부정확한 부분을 찾아내도록 ChatGPT에 지시하기 때문에 유용합니다.

## 리플렉션 패턴

모든 답변에 대한 **이유를 설명**하도록 GPT에 요청할 수 있습니다. GPT에 다음과 같이 알려주고 질문을
하면 됩니다.

> 답변을 제공할 때는 답변의 근거와 가정을 설명하세요. 선택한 사항을 설명하고 잠재적인 제한 사항이나
> 엣지 케이스를 설명하세요.

이렇게 하면 답변이 훨씬 더 상세해지고 ChatGPT가 답변에 대한 배경 정보를 평소보다 훨씬 더 많이
제공합니다.

## 거부 차단기 패턴

ChatGPT가 지식 제한, 안전 등의 이유로 답변할 수 없다고 한 질문을 한 적이 있을 수 있을 겁니다. 이
패턴은 원하는 특정 질문의 문구를 **바꾸거나 재구성**하여 ChatGPT로 하여금 대답하게끔 유도합니다.

> 질문에 답할 수 없을 때마다 질문에 답할 수 없는 이유를 설명하세요. 답변할 수 있는 질문의 대체
> 표현을 하나 이상 제공하세요.

이제 질문을 하면, ChatGPT가 답변할 수 없는 경우, 원래 질문에 대한 답변이 될 수 있는 몇 가지 대체
질문이 표시되며, 이를 통해 궁극적으로 ChatGPT가 답변할 수 있게 됩니다.

## 뒤집힌 상호작용 패턴

원하는 것을 달성할 때까지 ChatGPT가 우리에게 질문하도록 유도할 수 있습니다. 이 패턴은 원하는 것을
알고 있지만, 그 목표를 달성하기 위한 단계를 모르거나, 그 목표를 달성하기 위해 ChatGPT가 어떤 정보가
있어야 하는지 모를 때 유용합니다.

> AWS에 있는 웹 서버에 Rust 바이너리를 배포하기 위한 질문을 나에게 하세요. 필요한 모든 정보를
> 얻으면, 배포를 자동화하는 bash 스크립트를 작성하세요.

이 쿼리를 실행하면 ChatGPT가 사용자에게 필요한 정보를 묻는 메시지가 표시됩니다. 그러면 ChatGPT에
필요한 정보와 단계 등을 먼저 알아내야 하는 번거로움을 덜 수 있습니다. 사용자가 대화를 주도하는 대신
ChatGPT가 대화를 주도하도록 하여 가능한 한 **적은 메시지와 상호 작용**으로 필요한 정보를 정확하게
전달할 수 있습니다.