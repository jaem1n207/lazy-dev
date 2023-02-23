// gatsby는 Node 환경에서 build 하기 때문에, window 객체가 없다. 따라서, window 객체를 사용하려면 아래 코드를 추가해야 한다.
export const isBrowser = typeof window !== 'undefined';
