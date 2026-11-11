---
title: "OSM에서 한국 건물의 유형을 읽는 법"
description: "빌라의 공동현관부터 시장 통로까지, OSM에서 한국 건물의 유형과 배달 경로를 읽는 기준."
date: 2026-11-10
updated: 2026-11-11
author: Mechureal
game: broke-rider-simulator
tags: [development, map, osm]
draft: false
lang: ko
translationKey: osm-building-classification
slug: osm-building-classification
---

같은 주소에 식당과 집이 있어도 배달원이 찾아갈 문은 다를 수 있다. 1층 식당은 보도에서 바로 들어가고, 위층 세대에는 옆의 공동현관을 거쳐 올라간다. [이전 개발 일지](/ko/devlog/osm-to-unity/)에서 가져온 OpenStreetMap(OSM) 윤곽에 외관과 출입구를 붙이려면 이런 차이를 기록해야 한다.

<h2 id="building-taxonomy">한국 건물의 대분류와 세부 유형</h2>

대분류는 주거·상업 같은 용도, 중분류는 빌라·아파트·근린상가 같은 건물 유형이다. 소분류는 외관과 출입 경로가 달라지는 구조다. 세부 항목에서 판정에 쓰는 태그와 공유 모듈을 함께 볼 수 있다. 아래의 `B=값`은 `building=값`의 줄임말이다.

<nav class="taxonomy-jump" aria-label="이 글의 대분류">
  <a href="#housing">주거</a>
  <a href="#commercial">상업</a>
  <a href="#mixed-use">복합용도</a>
  <a href="#offices">오피스</a>
  <a href="#accommodation">숙박</a>
  <a href="#industry">공업·물류</a>
  <a href="#education">교육·연구</a>
  <a href="#healthcare">의료·복지</a>
  <a href="#public-safety">공공·안전</a>
  <a href="#culture">문화·집회</a>
  <a href="#religion">종교</a>
  <a href="#sports">체육</a>
  <a href="#transport">교통·차량</a>
  <a href="#agriculture">농축산</a>
  <a href="#infrastructure">기반시설</a>
  <a href="#tourism">관광·휴게</a>
  <a href="#special">특수시설</a>
  <a href="#landmarks">역사·랜드마크</a>
  <a href="#outbuildings">부속 건물</a>
  <a href="#osm-evidence">OSM 판정 기준</a>
</nav>

<section class="taxonomy-section" aria-labelledby="housing">
<h3 id="housing">주거</h3>
<p>주거 배달은 주소를 찾은 뒤에도 문을 한 번 더 골라야 하는 경우가 많다. 단독주택은 대문과 현관 사이에 마당이 있을 수 있고, 연립·맞벽 주택은 벽이 이어져 있어도 세대별 문이 따로 있다. 빌라는 공동현관을 찾은 뒤 계단이나 승강기로 올라간다.</p>
<p>필로티 빌라에서는 도로에서 기둥 사이의 주차층을 지나 공동현관까지 걸어갈 자리가 필요하다. 기둥과 계단실을 배치하고 차가 서도 보행로가 남는지 본다. 닫힌 1층의 빌라라면 공동현관을 골목 쪽에 두고, 문이 도로보다 높을 때 외부 계단과 층참을 붙일 수 있다.</p>
<p>아파트 단지에서는 동 번호와 공동현관을 먼저 찾는다. 판상형은 긴 외벽에 창과 발코니가 이어지고, 탑상형은 여러 면에 창이 분산된다. 두 유형에 같은 창·발코니·승강기 모듈을 쓸 수 있다. 기숙사도 생활실 외벽을 공유하되, 캠퍼스 안에서 들어가는 경우와 거리에서 바로 접근하는 경우를 구분한다.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/jamsil-apartments.jpg" width="1000" height="750" loading="lazy" alt="서울 잠실 주공아파트 5단지의 긴 동과 층마다 반복되는 창" />
  <figcaption>서울 잠실 주공아파트 5단지. 긴 동을 따라 세대 창과 발코니가 반복된다. 사진 <a href="https://commons.wikimedia.org/wiki/File:Jamsil_Apartment_Complex_Phase_5_(5460805782).jpg">InSapphoWeTrust</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>.</figcaption>
</figure>
<details class="taxonomy-details" open>
  <summary>주거 세부 분류 5개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>단독주택</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>도시 골목형·마당형 / 농촌 단층형 / 도시 한옥형. 도로에서 현관까지의 거리, 마당 배치, 지붕으로 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=house/detached/bungalow/farm</code>. 한옥은 별도 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>저층 벽·경사지붕, 담장·대문, 마당 현관</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>연립·맞벽 주택</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>두 집 맞벽형 / 여러 세대 연속형. 공유 벽과 세대별 도로 진입</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=semidetached_house/terrace</code></dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>반복 전면, 세대별 현관</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>빌라·저층 공동주택</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd><strong>필로티 주차형 / 비필로티 실내계단형</strong>. 외부 진입계단은 양쪽에 붙일 수 있는 변형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=apartments</code> 또는 주거 용도가 확인된 <code>B=residential</code> + 저층 규모·평면. 필로티는 별도 판정</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>반복 창·발코니, 공동현관, 계단 코어, 필로티 기둥·주차층, 외부 계단·층참</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>아파트</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>판상형 / 탑상형. 동의 폭·깊이와 코어 배치로 구분. 신식·구식은 마감 옵션</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=apartments</code> + 동 단위 평면·높이. <code>apartments</code> 단독이면 공동주택까지만</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>반복 주거층, 동 현관, 승강기 코어, 발코니</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>기숙사</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>교내 저층 생활동형 / 도시 독립 생활관형. 캠퍼스 내부 접근인지 도로 직결인지 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=dormitory</code> + 부지 관계</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>생활실 반복 외피, 공용 현관·복도</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="commercial">
<h3 id="commercial">상업</h3>
<p>음식 픽업의 기준은 동네 상가다. 주문 주소에 도착하면 도로를 따라 나란히 붙은 가게 중에서 <strong>해당 가게의 간판과 문</strong>을 찾아야 한다. 독립 단층 점포라면 보도에서 바로 문에 닿는다. 가로 연속 점포형에서는 같은 건물 전면에 문이 여럿 있으므로 점포별로 연결한다. 다층 상가는 1층 점포문과 상층 공용문을 구분한다. 위층 가게에 가려면 공용문에서 계단이나 승강기를 거쳐 매장 문까지 이어져야 한다.</p>
<p>같은 쇼윈도·간판·점포문을 여러 점포에 쓸 수 있다. 픽업 위치는 매장 안 카운터처럼 주문에 연결된 지점으로 기록한다. 전통시장이나 몰에서는 보도 다음에 지붕 덮인 골목이나 공용 로비가 추가된다. 마트와 백화점은 고객문과 상품 하역구를 구분한다.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/korean-bbq-storefront.jpg" width="640" height="960" loading="lazy" alt="서울의 한 음식점에서 보도와 맞닿은 출입문 위로 간판이 보이는 모습" />
  <figcaption>서울의 한 음식점. 도로에서 간판을 확인한 뒤 보도에서 매장 문으로 들어간다. 사진 <a href="https://www.pexels.com/photo/entrance-to-a-korean-bbq-restaurant-18936030/">Pincalo</a>, <a href="https://www.pexels.com/license/">Pexels License</a>. 웹용으로 크기를 줄였다.</figcaption>
</figure>
<figure>
  <img src="/images/devlog/osm-building-classification/restaurant-storefronts.jpg" width="1440" height="982" loading="lazy" alt="서울 골목 양쪽에 음식점 간판과 출입구가 이어진 모습" />
  <figcaption>서울의 음식점 골목. 같은 길에 도착해도 주문에 맞는 간판과 문을 찾아야 한다. 사진 <a href="https://commons.wikimedia.org/wiki/File:Walking_beneath_restaurant_signs_in_Seoul_(55614010409).jpg">Sergiy Galyonkin</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. 웹용으로 크기를 줄였다.</figcaption>
</figure>
<details class="taxonomy-details" open>
  <summary>상업 세부 분류 4개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>근린상가</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>독립 단층 점포형 / 가로 연속 점포형 / 다층 상가형. 직접 출입하는 점포 수와 상층 공용 코어로 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=retail/commercial/kiosk</code>. <code>shop=*</code>, <code>amenity=restaurant/cafe</code> 등은 입점 시설로 연결</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>쇼윈도·간판·점포문, 상층 공용 현관·계단</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>전통시장</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>아케이드 골목형 / 실내 상가동형. 점포가 외부 골목을 향하는지 내부 복도를 향하는지 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=marketplace</code> + 시장 경계·건물·보행로</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>아케이드 지붕, 점포 전면, 시장 게이트·실내 통로</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>대형 판매시설</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>도심 다층 마트형 / 창고형 매장 / 백화점형. 층별 판매장·주차와 하역 위치로 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=supermarket</code>, <code>shop=supermarket/department_store</code> + 규모·층 구성</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>대형 벽체·쇼윈도, 고객 로비, 주차 램프·하역문</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>쇼핑몰</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>실내 몰형 / 야외 가로형. 점포 사이 이동이 내부 통로인지 외부 광장인지 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>shop=mall</code> + 동 배치·보행 연결</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>공용 몰 로비·내부 가로 또는 야외 광장·반복 점포</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="mixed-use">
<h3 id="mixed-use">복합용도</h3>
<p>1층 식당과 상층 주거가 같은 주소를 쓰면 식당 픽업은 점포문으로, 세대 배달은 공동현관으로 안내한다. 공용문을 함께 쓰는 건물에서는 들어간 뒤 목적 층과 점포·세대 문으로 갈라진다. 이 사례를 먼저 만들어 외관의 문, 실내 진입, 주문 안내가 같은 출입구를 가리키는지 확인할 계획이다.</p>
<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/building-types-and-entrances.png" alt="필로티 빌라, 실내계단형 빌라, 1층 상가와 상층 주거 건물의 입구를 비교한 개념도" />
  <figcaption>비슷한 저층 건물이라도 1층 배치에 따라 공동현관과 점포문의 역할이 달라진다.</figcaption>
</figure>
<details class="taxonomy-details">
  <summary>복합용도 세부 분류 1개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>상가주택·상업복합</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd><strong>1층 상가·상층 주거</strong> / 저층 상가·상층 업무 또는 숙박 / 층별 용도 미정</dd></div>
          <div><dt>OSM 근거</dt><dd>송도 <code>B=mixed_use</code>, <code>building:use=multipurpose</code> 또는 복수 용도. 구체적인 조합에는 각 용도의 층·범위 근거 필요</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>점포 직결문 + 상층 공용 현관. 두 문이 성립하면 분리하고, 공용문이 확인되면 그 뒤에서 분기</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<h2 id="osm-evidence">OSM 태그를 어디까지 믿을 수 있을까</h2>

지도에서 먼저 구분할 것은 **태그가 가리키는 범위**다. 한 건물의 외곽선, 그 안에 있는 식당 점, 여러 동을 묶는 학교 부지는 각각 다른 OSM 객체일 수 있다. 식당 점이 건물 안에 들어 있다고 해서 나머지 층도 상업시설로 분류할 수는 없다. 건물 윤곽에 붙은 태그와 입점 시설에 붙은 태그를 따로 읽는 이유다.

### 건물과 입점 시설을 나눠 읽기

`building=yes`는 건물의 존재를, `building=apartments`는 공동주택 유형을 기록한다. `building:use`가 있으면 현재 쓰임을 함께 확인할 수 있다. 건물 윤곽과 시설이 **같은 OSM 객체**라면 시설 태그를 건물 용도 판정의 근거로 삼는다. 인계 추출본의 NC백화점 수원점은 건물 태그가 `building=yes`였지만 같은 객체에 `shop=department_store`가 있어 대형 판매시설 후보로 분류할 수 있었다. [OSM 건물 태그](https://wiki.openstreetmap.org/wiki/Key:building) · [OSM 건물 용도 태그](https://wiki.openstreetmap.org/wiki/Key:building:use)

식당이 **별도 위치 점**이라면 윤곽과 주소를 대조해 입점 시설로 연결한다. `level`이 확인되면 그 식당의 층을 기록한다. 이때 건물 전체의 용도는 확인된 범위에 머문다. 주문이 찾아갈 층과 문도 식당에 연결된 별도의 정보로 다룬다. [OSM 층 태그](https://wiki.openstreetmap.org/wiki/Key:level) · [OSM 출입구 태그](https://wiki.openstreetmap.org/wiki/Key:entrance)

### 용도가 확인된 뒤에 구조를 고르기

공동주택의 층수와 윤곽을 함께 보면 저층 공동주택과 큰 아파트 동을 구분하는 후보를 만들 수 있다. 길고 좁은 윤곽은 판상형 외관을 고르는 단서가 된다. 1층이 실제로 열려 있는지, 주차층에서 어느 문으로 이어지는지는 별도 정보가 필요하다. 송도의 `building=mixed_use`도 용도가 섞여 있다는 범위까지 기록하고, 상가와 주거가 있는 층이나 두 문이 분리돼 있는지는 보류했다.

### 인계와 송도 추출본에서 확인한 범위

건물 태그만 적용했을 때 대분류까지 잡힌 건물은 인계 **720개**, 송도 **1,227개**였다. 같은 객체의 시설 태그를 결합하고, 건물명과 용도 근거가 어긋난 사례를 검토로 돌렸다. 일부 시설명과 층수·윤곽을 활용한 시범 규칙까지 적용한 누적 결과는 다음과 같다.

- **인계** 4,596개 중 대분류 753개, 중분류 322개, 소분류 외관 후보 139개.
- **송도** 1,546개 중 대분류 1,255개, 중분류 869개, 소분류 외관 후보 305개.

소분류 후보 대부분은 평면 비율과 층수로 고른 판상형·탑상형 외관이다. 두 추출본에서 필로티 주차나 점포문·주거문 분리까지 확인된 건물은 없었다.

## 다른 대분류의 외관과 출입구

<section class="taxonomy-section" aria-labelledby="offices">
<h3 id="offices">오피스</h3>
<p>소형 사옥은 골목에서 작은 현관으로 들어갈 수 있고, 큰 업무동은 로비를 지나 층을 찾는다. 여러 타워가 한 저층부를 공유하면 건물 주소에 도착한 뒤에도 타워를 골라야 한다. 격자형 창과 유리 전면은 같은 로비 동선에 다른 외관을 입힐 수 있는 변형이다.</p>

<details class="taxonomy-details">
  <summary>오피스 세부 분류 3개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>소형 사옥</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>골목 단독현관형 / 1층 쇼룸 병설형. 거리에서 들어가는 업무 현관과 쇼룸의 관계로 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=office</code> 또는 건물 전체 업무 사용 근거. <code>office=*</code> 한 점은 사무실 하나일 수 있음</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>작은 업무 현관·코어, 쇼룸 전면</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>일반 오피스</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>벽·창 격자형 / 유리 전면형. 입면 선택이며 로비와 출입 모듈은 공유</dd></div>
          <div><dt>OSM 근거</dt><dd>위와 동일. 외벽 자료가 있으면 반영</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>벽·창 패널 또는 커튼월, 공용 로비·승강기</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>고층 오피스</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>단일 타워형 / 공용 저층부·복수 타워형. 저층부와 타워별 로비 연결로 구분</dd></div>
          <div><dt>OSM 근거</dt><dd>업무 용도 + <code>height</code>, <code>building:levels</code>, <code>building:part=*</code> 및 동 관계</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>저층부, 반복 타워 외피, 타워별 로비·코어</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="accommodation">
<h3 id="accommodation">숙박</h3>
<p>호텔은 로비로 진입하는 방식과 차량 하차 공간의 유무로 나뉜다. 모텔은 공용 복도에서 객실을 찾는 방식과 차고에서 개별 객실로 접근하는 방식이 있다. 리조트나 여러 채로 된 한옥 숙소는 객실 번호보다 숙박동부터 찾는다. 주문의 인수 지점도 로비와 객실 중 어디인지 구분한다.</p>

<details class="taxonomy-details">
  <summary>숙박 세부 분류 4개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>모텔·여관</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>골목 공용현관형 / 객실별 차고형. 공용 복도를 쓰는지 차량에서 객실로 개별 접근하는지 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>tourism=motel</code>. 여관은 숙박 태그와 시설 정보로 구별</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>작은 숙박 로비·객실 복도 또는 번호가 붙은 차고·객실문</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>호텔</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>보도 직결형 / 차량 하차 캐노피형. 로비 앞 차량 동선 유무로 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=hotel</code>, <code>tourism=hotel</code> + 진입로·하차 공간</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>로비·객실층, 하차 캐노피·차로</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>리조트·콘도</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>객실동 집중형 / 저층 객실동 분산형. 한 로비에서 층을 찾는지 부지에서 동을 먼저 찾는지 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>leisure=resort</code> 등 부지 정보 + 숙박동·객실 배치</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>숙박 로비·코어 또는 단지 정문·동 번호·산책로</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>펜션·한옥 숙소</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>단층 독채형 / 다객실 단일동형 / 한옥 마당·채 분리형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>tourism=guest_house/apartment/chalet</code>는 후보. 펜션 운영과 한옥 형태는 별도 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>독채 현관·데크, 객실 복도, 마당·회랑·채별 문</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="industry">
<h3 id="industry">공업·물류</h3>
<p>작업장은 골목 셔터 하나로 드나들 수 있지만, 물류센터에는 하역구가 여러 개 있고 차량이 올라가는 램프도 있을 수 있다. 부지 정문과 특정 하역구를 따로 기록하면 보행문, 경비실, 상품 인수처를 목적에 맞게 쓸 수 있다.</p>

<details class="taxonomy-details">
  <summary>공업·물류 세부 분류 4개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>소규모 작업장</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>골목 셔터형 / 앞마당 반입형. 도로와 작업장 문 사이의 차량 대기 공간으로 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=industrial</code> + 소규모 생산 근거. 관련 <code>craft=*</code>는 시설 단서</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>철골·패널 외피, 셔터·보행문, 반입 마당</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>공장</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>단독 생산동형 / 다동 생산단지형. 정문에서 바로 생산동으로 가는지 내부 도로를 거치는지 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=industrial</code> + 제조 용도. <code>landuse=industrial</code>은 부지 단서</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>큰 생산동, 보행문·화물문, 경비실·단지 도로</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>창고</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>단층 일반 보관형 / 냉장·냉동 보관형. 냉장은 설비·운영 자료로 확인</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=warehouse</code>. 저온 보관은 별도 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>철골·패널 창고, 화물문, 필요 시 밀폐 접안부</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>물류센터</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>지상 도크 열형 / 층별 차량 램프형. 트럭이 어느 층에 직접 접안하는지 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=warehouse</code> + <code>industrial=logistics</code> 등 물류 용도 근거. 도크·램프는 별도 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>도크 반복, 번호 안내, 트럭 회차장·램프</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="education">
<h3 id="education">교육·연구</h3>
<p>학교나 대학은 한 부지에 교사동, 기숙사, 체육관처럼 기능이 다른 건물이 모인다. 학교 정문을 지난 뒤 목적 동을 찾아야 하고, 연결 복도가 있다면 실내에서 옆 동으로 갈 수 있다. 연구 시설은 방문 로비와 장비를 들이는 큰 문을 따로 둘 수 있다.</p>

<details class="taxonomy-details">
  <summary>교육·연구 세부 분류 4개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>어린이집·유치원</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>독립 저층동형 / 아파트 단지 내 부속시설형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=kindergarten</code>, <code>amenity=kindergarten/childcare</code> + 단지 관계</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>보육동 외피, 대문·정원, 안내 현관</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>초·중·고</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>운동장 앞 교사동형 / 안뜰형 / 본관·별관 연결형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=school</code>, <code>amenity=school</code> + 운동장·동·연결통로. 학교 부지 안의 체육관 등은 개별 분류</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>반복 교실 외피, 학교 정문, 동별 현관·연결 복도</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>대학</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>독립 강의동형 / 여러 동 연결형. 광장·보행축에 면한 본관은 진입 변형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=college/university</code>, <code>amenity=college/university</code> + 건물별 용도</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>강의동·로비, 캠퍼스 안내, 연결 복도</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>연구·시험시설</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>연구실 반복형 / 대형 장비 시험동형 / 다동 연구단지형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=research_institute</code> + 건물별 기능·부지 관계</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>업무 외피·방문 로비, 큰 시험홀·장비 반입문, 단지 정문</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="healthcare">
<h3 id="healthcare">의료·복지</h3>
<p>골목 의원은 거리에서 바로 들어가지만, 상가 상층의 의원은 공용 계단이나 승강기를 거친다. 병원은 외래 로비, 응급실 입구, 물품 인수문에 서로 다른 역할을 준다. 요양시설과 복지관에서도 주문 목적지에 따라 접수처와 생활동 출입구를 구분한다.</p>

<details class="taxonomy-details">
  <summary>의료·복지 세부 분류 5개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>의원</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>지상 직결형 / 상가 상층 입점형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>healthcare=doctor/clinic</code>, <code>amenity=doctors/clinic</code> + <code>level</code>·출입 관계</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>접수·대기, 점포 직결문 또는 상가 공용 코어</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>종합병원</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>외래 본관 중심형 / 본관·센터 분산형. 응급·물품 인수는 별도 출입 역할</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=hospital</code>, <code>amenity=hospital</code>, <code>healthcare=hospital</code>. 종합병원 여부와 외래·병동 역할은 별도 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>외래 로비, 동별 안내, 응급 출입구, 물품 인수문</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>보건소·보건지소</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>도시 다부서 청사형 / 읍면 저층 지소형</dd></div>
          <div><dt>OSM 근거</dt><dd>의료·공공시설 태그 + 보건소·지소의 시설 정보. 범용 의료 태그만으로는 의원과 구별 보류</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>안내·접수, 층별 창구 또는 저층 직결 현관</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>노인요양시설</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>도시 다층 생활동형 / 저층 마당형. 생활층 이동과 마당 연결로 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=social_facility</code> + <code>social_facility=nursing_home</code> 등 확인된 돌봄 기능</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>생활실 외피, 접수, 승강기, 마당문</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>종합사회복지관</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>복지관 전용동형 / 문화·체육시설 복합형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=social_facility</code> 또는 <code>amenity=community_centre</code> + 복지관 기능 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>안내 창구, 상담·프로그램층, 복합시설 공용 코어</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="public-safety">
<h3 id="public-safety">공공·안전</h3>
<p>구청과 주민센터는 민원 창구까지 가는 길이 중심이다. 본관·별관이나 층별 기능이 나뉜 복합청사에서는 동과 층 정보를 덧붙인다. 소방시설에서는 차고 셔터가 거리에서 눈에 띄어도 보행으로 방문할 문은 따로 기록한다.</p>

<details class="taxonomy-details">
  <summary>공공·안전 세부 분류 4개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>시·군·구청</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>본관 중심형 / 본관·별관 분산형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=government</code>, <code>office=government</code>, <code>amenity=townhall</code> + 기관·동 정보. <code>B=public/civic</code> 단독은 공공시설까지만</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>청사 전면, 민원 로비, 광장·동별 안내</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>주민센터</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>동네 민원 중심형 / 층별 복합청사형</dd></div>
          <div><dt>OSM 근거</dt><dd>공공·정부 태그 + 주민센터·행정복지센터 확인. 복합 여부는 입점 시설·층 정보</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>민원 창구, 공용 코어, 층별 안내</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>소방시설</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>전면 차고형 119안전센터 / 본서 청사형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=fire_station</code>, <code>amenity=fire_station</code>. 본서·센터는 기관 정보로 구별</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>출동 셔터·차로, 보행 현관, 행정 로비</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>경찰시설</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>동네 파출소형 / 본서 민원 청사형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=police</code> + 기관 정보</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>소형 민원 현관 또는 청사 로비, 차량 게이트</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="culture">
<h3 id="culture">문화·집회</h3>
<p>박물관은 로비 뒤 전시실로 갈라지거나, 마당을 건너 전시동을 찾는 구조다. 공연장과 전시장에는 관객 입구와 장비 반입구가 있을 수 있다. 같은 대형 홀 외관을 쓰더라도 방문객과 물품이 만나는 위치는 다르다.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/national-museum.jpg" width="1440" height="957" loading="lazy" alt="국립중앙박물관의 큰 지붕 아래 야외 통로를 오가는 방문객" />
  <figcaption>국립중앙박물관. 큰 지붕 아래 야외 통로가 여러 접근 방향을 잇는다. 사진 <a href="https://commons.wikimedia.org/wiki/File:National_Museum_of_Korea_exterior.jpg">Tristan Surtel</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. 웹용으로 크기를 줄였다.</figcaption>
</figure>
<details class="taxonomy-details">
  <summary>문화·집회 세부 분류 4개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>박물관</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>한 동·공용 로비형 / 여러 전시동 분산형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=museum</code>, <code>tourism=museum</code> + 동 배치</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>전시 외피, 안내 로비 또는 마당·전시동 안내</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>도서관</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>동네 소형 열람형 / 층별 자료실형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=library</code> + 건물 범위·층 정보</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>안내대, 열람층, 공용 코어</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>공연장</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>단일 공연장 중심형 / 여러 공연장 복합형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=theatre</code> + 공연장·홀 정보</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>관객 로비·검표, 홀 안내, 무대 반입구</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>전시장·컨벤션</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>전시·회의 수직 결합형 / 전시장 동 분리형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=exhibition_centre/conference_centre</code> + 동·홀·층 정보</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>대형 홀 외피, 관람 로비, 동·홀 번호, 하역구</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="religion">
<h3 id="religion">종교</h3>
<p>상가에 입점한 교회나 기도시설은 상층 의원과 공용 계단을 공유하는 경우처럼 표현할 수 있다. 독립 예배시설은 거리에서 전용 현관을 찾고, 여러 전각이 있는 사찰은 부지 입구를 지나 마당과 전각 사이를 이동한다.</p>

<details class="taxonomy-details">
  <summary>종교 세부 분류 5개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>개신교 교회</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>상가 입점형 / 독립 예배당형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=place_of_worship</code> + <code>religion=christian</code>과 교단 정보. <code>B=church/chapel</code> 단독이면 교파 미정</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>상가 공용 코어 또는 예배당 외피·전용 현관</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>천주교 성당</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>성전·교육공간 적층형 / 성전·교육관 분리형</dd></div>
          <div><dt>OSM 근거</dt><dd>예배시설 + 가톨릭 <code>denomination=*</code> 또는 본당 확인. <code>B=cathedral</code>은 외피 단서</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>성전 외피, 교육층 코어 또는 마당·별동 현관</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>불교 사찰</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>도심 건물형 법당 / 여러 전각을 둔 가람형</dd></div>
          <div><dt>OSM 근거</dt><dd>예배시설 + <code>religion=buddhist</code>. <code>B=temple</code> 단독이면 종교 세부 미정</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>도심 현관·코어 또는 진입문·마당·전각</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>이슬람 기도시설</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>상가·복합건물 입점형 / 독립 성원형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>religion=muslim</code> + 예배시설, <code>B=mosque</code>는 전용 외피 단서</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>상가 공용 코어 또는 전용 예배시설 현관</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>기타·세부 미정 예배시설</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>건물 입점형 / 독립 시설형 / 부속동. 용도와 연결이 확인된 범위까지</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=religious/shrine/synagogue/kingdom_hall/monastery/presbytery</code> 등. 예배·거주·관리 역할 구분</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>공용 코어·전용 현관·부속동</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="sports">
<h3 id="sports">체육</h3>
<p>생활체육관은 접수처와 탈의실을 거쳐 운동 공간으로 이어진다. 관람 경기장은 관객이 검표문을 지나 객석 구역을 찾아간다. 경기 장비는 별도의 반입문을 쓸 수 있다. 두 경우 모두 큰 홀이 필요하지만 출입구의 역할이 달라진다.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/anyang-stadium.jpg" width="1280" height="720" loading="lazy" alt="안양종합운동장의 경기장과 둘레 관중석" />
  <figcaption>안양종합운동장. 경기 공간과 관중석 둘레가 구분된다. 사진 <a href="https://commons.wikimedia.org/wiki/File:Anyang_Stadium.jpg">고려</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. 웹용으로 크기를 줄였다.</figcaption>
</figure>
<details class="taxonomy-details">
  <summary>체육 세부 분류 3개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>실내체육관</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>생활체육형 / 관람 경기장형. 객석·검표 동선으로 구분</dd></div>
          <div><dt>OSM 근거</dt><dd><code>leisure=sports_hall/sports_centre</code>, <code>B=sports_hall/sports_centre</code> + 관람 시설 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>큰 경기홀 외피, 접수·탈의 또는 관객 로비·장비 반입구</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>실내수영장</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>전용 수영동형 / 복합시설 입점형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>leisure=swimming_pool</code> 또는 <code>sport=swimming</code>이 있는 시설 + 건물·층 관계</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>접수·탈의·샤워, 전용 현관 또는 공용 코어</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>실외 운동장·경기장</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>생활 운동장형 / 관중석 둘레형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>leisure=pitch/track/stadium</code>, <code>B=stadium/grandstand</code> + 관중석·게이트 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>펜스·보행문 또는 관중석·검표 게이트, 장비문</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="transport">
<h3 id="transport">교통·차량</h3>
<p>지하철역은 거리 곳곳의 출입구가 같은 대합실로 이어질 수 있다. 철도역은 선로 위나 아래에 대합실을 두면 승강장까지 올라가거나 내려가는 방향이 달라진다. 터미널과 공항은 공개 로비, 승차·탑승 공간, 차량 진입을 나눠 목적지와 연결한다.</p>
<figure>
  <img src="/images/devlog/osm-building-classification/suwon-station.jpg" width="1280" height="960" loading="lazy" alt="버스가 정차하는 도로에서 바라본 수원역 정면" />
  <figcaption>수원역. 역 앞 도로에서 역사 진입부로 접근한다. 사진 <a href="https://commons.wikimedia.org/wiki/File:Suwon_station.JPG">Nils Öberg</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>. 웹용으로 크기를 줄였다.</figcaption>
</figure>
<details class="taxonomy-details">
  <summary>교통·차량 세부 분류 7개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>도시철도역</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>지하·분산 출입구형 / 고가 승강장형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>railway=station</code> + <code>station=subway</code> 등 운행 유형. <code>railway=subway_entrance</code>는 개별 거리 입구. 선로·대합실 높이는 별도 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>거리 계단·캐노피·엘리베이터, 대합실·개찰 연결</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>일반·고속철도역</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>선로 옆 지상역사형 / 선상역사형 / 선하역사형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=train_station</code>, <code>railway=station</code>, <code>public_transport=station</code> + 선로·역사 상대 위치. 고속철도 여부만으로 역사 배치 결정 불가</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>역광장·대합실, 육교·지하통로·승강장 계단</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>버스터미널</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>지상 독립형 / 상업 복합형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=bus_station</code>, <code>B=transportation</code> + 복합시설 연결</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>매표·대합실, 승차장, 버스 회차로·보행문</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>공항 여객청사</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>단일 청사형 / 본 청사·별도 탑승동형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>aeroway=terminal</code> + 청사·탑승동 관계. <code>aeroway=aerodrome</code>은 공항 부지</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>차량 하차 캐노피, 공개 로비, 통제문·연결통로</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>여객선터미널</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>연안 대합실·부두 직결형 / 국제 출입국 분리형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=ferry_terminal</code> + 여객청사·부두 관계. 국제선과 차량 선적은 별도 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>대합실, 보행 승선로, 차량 대기·통제문</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>주차 건물·주유소</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>적층 주차동·주차타워 / 주유 캐노피와 관리동</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=parking/garages</code>, <code>amenity=parking</code> + <code>parking=multi-storey</code> / <code>amenity=fuel</code></dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>차량 램프·차단기, 개방형 지붕, 관리실</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt>격납·보관시설</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>격납고 / 선박 보관동</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=hangar/boathouse</code></dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>대형 셔터, 철골 외피, 관리문</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="agriculture">
<h3 id="agriculture">농축산</h3>
<p>온실은 반투명 지붕과 반복 골조로, 축사와 작업동은 열린 측벽과 큰 작업문으로 구분할 수 있다. 농장 전체에 붙은 용도 정보는 부지에 남기고, 개별 동의 외벽과 문은 확인된 건물 형태를 따른다.</p>

<details class="taxonomy-details">
  <summary>농축산 세부 분류 1개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>온실·축사·농업 작업동</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>연동 온실 / 개방 측벽 축사 / 닫힌 작업동</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=greenhouse/conservatory</code> / <code>B=barn/farm_auxiliary/stable/cowshed/sty/livestock</code></dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>반투명 지붕, 반복 철골·패널, 작업 차량문</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="infrastructure">
<h3 id="infrastructure">기반시설</h3>
<p>변전소나 발전시설에서는 설비동과 관리용 출입구가 중심이다. 자원순환시설에는 차량 반입문을 둘 수 있다. 같은 부지 안에 사무동이 있다면 일반 업무 로비를 공유하되 설비 구역의 접근과 따로 기록한다.</p>

<details class="taxonomy-details">
  <summary>기반시설 세부 분류 1개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>전력·발전·자원순환·방송</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>옥내 변전소 / 발전동·설비 결합 / 폐기물 반입형 / 업무동·제작동형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>power=substation/plant</code>, <code>man_made=wastewater_plant</code>, <code>amenity=waste_transfer_station</code> 등 부지 근거. 방송은 기관·제작동 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>설비동·펜스·관리문, 반입 셔터, 업무 로비</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="tourism">
<h3 id="tourism">관광·휴게</h3>
<p>휴게소는 넓은 주차면에서 여러 점포나 편의시설로 걸어가는 흐름이다. 수련시설은 숙소와 활동동이 떨어져 있을 수 있어 부지 안에서 동을 찾는 단계가 추가된다.</p>

<details class="taxonomy-details">
  <summary>관광·휴게 세부 분류 1개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>휴게소·수련시설</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>주차장 전면형 / 숙소·활동동 분산형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>highway=services</code>는 휴게소 부지. 수련시설은 시설 정보와 숙박·활동동 관계 확인</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>주차장 전면 점포, 대형 공용 현관, 숙박동·단지 보행로</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="special">
<h3 id="special">특수시설</h3>
<p>장례시설에서는 의식 공간과 마당을 중심으로 접근을 잡는다. 교정·군사시설은 부지 입구와 내부 동의 접근을 따로 본다. 일반 배달 경로는 공개 인수 지점이 확인된 범위에서 연결한다.</p>

<details class="taxonomy-details">
  <summary>특수시설 세부 분류 1개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>장례·추모 / 교정 / 군사</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>의식동·중정형 / 담장·통제동형 / 병영 생활동형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>amenity=funeral_hall/prison</code>, <code>landuse=military</code>, <code>B=barracks</code> 등. 부지 태그와 개별 건물 역할 분리</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>의식 로비·마당, 통제 게이트·담장, 반복 생활동</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="landmarks">
<h3 id="landmarks">역사·랜드마크</h3>
<p>성문과 문루는 주변 거리에서 알아볼 수 있는 형태 자체가 중요하다. 외관을 직접 배치하고, 문을 통과하는 보행로가 있다면 통과 지점으로 따로 연결한다.</p>

<details class="taxonomy-details">
  <summary>역사·랜드마크 세부 분류 1개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>성문·문루 등</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>석축·목조 문루형 등 개별 외형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>historic=city_gate</code> 등 명시된 랜드마크</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>수동 배치 에셋, 필요한 경우 통과 연결</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

<section class="taxonomy-section" aria-labelledby="outbuildings">
<h3 id="outbuildings">부속 건물</h3>
<p>경비실, 창고, 개방 지붕은 큰 건물 옆에서 보이지만 주문의 목적지는 따로 정한다. 작은 상자형 외피나 기둥·지붕을 공유하고, 실제 인수처로 쓰는 경비실에만 그 역할을 기록한다.</p>

<details class="taxonomy-details">
  <summary>부속 건물 세부 분류 1개</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt>경비실·소형 부속동·개방 지붕</dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>소분류와 구조</dt><dd>초소형 / 닫힌 설비·창고형 / 개방 지붕형</dd></div>
          <div><dt>OSM 근거</dt><dd><code>B=guardhouse/gatehouse/shed/hut/outbuilding/garage/toilets/service/tech_cab/carport/roof</code> 등</dd></div>
          <div><dt>공유 외관·출입 모듈</dt><dd>소형 박스 외피, 관리문, 개방 지붕·기둥</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>
</section>

## 미분류 건물도 거리를 채운다

용도가 미분류인 건물도 윤곽과 기록된 높이로 외관을 만들 수 있다. 저층에는 벽과 창을 몇 칸 배치하고, 중층은 같은 창 모듈에 층 띠와 코너 패널을 더한다. 고층은 패널을 여러 층 반복하고 기단과 상단 마감으로 구간을 나눈다. 어느 벽에 전면 마감을 줄지는 도로의 이름뿐 아니라 외벽과 도로가 마주 보는 방향, 사이를 가로막는 건물이 있는지도 함께 본다. 실제로 어느 문을 쓰는지는 별도로 기록한다.

<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/ingye-songdo-facades.png" alt="인계와 송도의 OSM 건물 윤곽 및 주변 도로를 제안한 외관과 나란히 놓은 그림" />
  <figcaption>건물 윤곽과 높이를 유지하면서 도로를 향한 면의 창 반복과 마감을 조정한다.</figcaption>
</figure>

<details class="taxonomy-details">
  <summary>태그가 부족할 때의 판정</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt><strong>용도와 구조가 확인됨</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>저장할 분류</dt><dd>대·중·소분류 확정</dd></div>
          <div><dt>생성할 외관·동선</dt><dd>확인된 외관 구조와 출입구를 적용. 수동 지정은 지정한 필드에 우선 적용</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt><strong>건물 용도만 확인됨</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>저장할 분류</dt><dd>대·중분류 확정, 소분류 미정</dd></div>
          <div><dt>생성할 외관·동선</dt><dd>규모에 맞는 공용 외피와 성립하는 기본 진입을 사용. 생성한 진입은 실제 출입구와 구별해서 기록</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt><strong>건물 안 입점 시설만 확인됨</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>저장할 분류</dt><dd>건물은 기존 분류 또는 미분류, 해당 시설만 등록</dd></div>
          <div><dt>생성할 외관·동선</dt><dd>윤곽·주소·층이 맞는 범위에 시설을 연결. 확인된 층이나 출입구가 있으면 그 시설 경로에만 적용</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt><strong><code>building=yes</code>·빈 값·알 수 없는 값, 또는 건물 전체 용도 근거가 충돌함</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>저장할 분류</dt><dd>확인 가능한 가장 구체적인 분류까지만 저장. 용도 근거가 없으면 미분류</dd></div>
          <div><dt>생성할 외관·동선</dt><dd>윤곽·높이·도로 방향으로 기본 외관 생성. 인근 토지 이용이나 직사각형 평면은 외관의 보조 단서로 사용</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>

<details class="taxonomy-details">
  <summary>공유 외관·출입 모듈</summary>
  <dl class="taxonomy-entries">
    <div class="taxonomy-entry">
      <dt><strong>거리 직결문 + 반복 전면</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>같은 구조를 쓰는 유형</dt><dd>근린 점포, 지상 의원, 작은 민원시설, 독립 예배시설</dd></div>
          <div><dt>출입구 연결</dt><dd>전면의 문을 시설과 직접 연결</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt><strong>공용 현관 + 수직 코어 + 층별 문</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>같은 구조를 쓰는 유형</dt><dd>빌라, 다층 상가, 상층 의원·교회, 오피스, 호텔</dd></div>
          <div><dt>출입구 연결</dt><dd>거리 입구 ID와 실내 목적층·시설 문을 연결</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt><strong>마당·단지 정문 + 동별 현관</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>같은 구조를 쓰는 유형</dt><dd>아파트 단지, 학교, 병원, 사찰, 리조트, 공장</dd></div>
          <div><dt>출입구 연결</dt><dd>정문을 경유점으로 두고 배달 목적 동의 문을 따로 지정</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt><strong>관객·여객 로비 + 검표·통제문</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>같은 구조를 쓰는 유형</dt><dd>공연장, 경기장, 역, 공항·항만</dd></div>
          <div><dt>출입구 연결</dt><dd>공개 구역의 인수처와 통제문을 별도 지점으로 기록</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt><strong>차량 진입 + 셔터·도크·하역구</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>같은 구조를 쓰는 유형</dt><dd>작업장, 물류센터, 대형 매장, 전시장, 소방시설</dd></div>
          <div><dt>출입구 연결</dt><dd>차량문과 보행문을 분리하고, 차량문에는 하역·출동 등 실제 역할을 부여</dd></div>
        </dl>
      </dd>
    </div>
    <div class="taxonomy-entry">
      <dt><strong>저층부 + 상부 반복 외피</strong></dt>
      <dd>
        <dl class="taxonomy-fields">
          <div><dt>같은 구조를 쓰는 유형</dt><dd>아파트, 오피스 타워, 숙박, 복합건물</dd></div>
          <div><dt>출입구 연결</dt><dd>상부 외피나 마감이 바뀌어도 저층 현관의 역할과 ID를 유지</dd></div>
        </dl>
      </dd>
    </div>
  </dl>
</details>

소형 부속 건물은 공용 배경 모듈을 쓴다. `stilt_house`, `houseboat`, `tent`, `bunker`처럼 드문 형태는 개별 에셋 후보로 둔다. `construction`, `ruins`, `abandoned:building=*`는 상태로 기록하고 자동 배달 대상에서 제외한다. `building=no`나 철거된 객체는 독립 건물을 생성하지 않으며, `building:part=*`는 상위 건물의 일부로 처리한다. [OSM 건물 부분 태그](https://wiki.openstreetmap.org/wiki/Key:building:part)

첫 플레이 검증에서는 같은 건물의 식당 픽업과 상층 세대 배달을 각각 진행한다. 주문이 서로 다른 문을 가리키는지, 문을 열었을 때 주변 벽의 충돌체가 통과를 막지 않는지 확인할 계획이다.
