### 0. 기존 디자인 수정

#### login, create-account 페이지

### 1. users 페이지

#### profile과 분리

profile은 나의 정보, users는 나의 정보 및 다른 사용자의 정보

#### /users/[username]/edit

profile에서 이동
useOptimistic, revalidatePath 사용
비밀번호 확인을 통해 본인인증 후 정보 수정

### 2. search 페이지

### 3. 추가 기능

#### 사용자의 tweet을 보여줄 때 inifinite 스크롤 도입, response 스크롤

#### tweet 최대 길이 수정

#### 페이지마다 타이틀 변경

### 4. 배포

#### 24일 까지 배포

추가 기능 및 문제 해결 제외

### 5. 문제 해결

#### 새로운 tweet 등록 후 다시 / 페이지로 돌아갈 경우 tweet 반영 X

#### 화살표 버튼이 / 페이지로 돌아가기만 하는 문제
