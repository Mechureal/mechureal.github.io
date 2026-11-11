---
title: "한국의 건물을 배달의 관점에서 분류하기"
description: "한국에서 볼 수 있는 건물 유형을 먼저 정리하고, 배달 동선과 OSM 태그를 연결하는 기준을 세웠다."
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

한국에서 볼 수 있는 건물 유형을 정리하기로 했다. 골목의 단독주택부터 아파트 단지, 근린상가, 물류센터, 공항까지 한 분류 안에서 다룰 수 있어야 했다. 배달 게임에서 건물 유형이 달라진다는 건 외관이 바뀌는 것과 함께, 주소에 도착한 사람이 다음에 어디로 가야 하는지도 달라진다는 뜻이다.

예를 들어 같은 주소의 1층 식당과 위층 세대는 서로 다른 문을 쓸 수 있다. 식당 주문을 받으러 간 사람은 보도에서 점포문으로 들어간다. 세대에 배달할 사람은 옆의 공동현관에서 층과 호수를 찾아간다. 건물 분류는 이런 차이를 설명할 수 있어야 한다.

[한국 건물 분류 목록 바로 보기](#building-taxonomy)

## 한국 건물의 유형부터 정리한다

분류의 출발점은 한국에서 실제로 볼 수 있는 건물이다. 주거와 상업 외에도 업무·숙박·교육·의료·공공·문화·종교·체육·교통 시설, 농축산과 기반시설, 작은 부속 건물까지 범위를 넓혔다. 「건축법 시행령」의 용도별 목록은 빠진 시설이 있는지 살펴보는 참고 자료로 삼았다. 게임에서 쓸 세부 유형은 거리에서 보이는 형태와 실제 접근 방식에 맞춰 정했다. [용도별 건축물의 종류](https://www.law.go.kr/lsBylInfoPLinkR.do?bylBrNo=00&bylCls=BE&bylNo=0001&lsNm=%EA%B1%B4%EC%B6%95%EB%B2%95+%EC%8B%9C%ED%96%89%EB%A0%B9)

- **대분류**는 주거, 상업, 교육처럼 건물이 어떻게 쓰이는지 나타낸다.
- **중분류**는 빌라, 아파트, 근린상가처럼 그 용도 안에서 건물 유형을 구분한다.
- **소분류**는 필로티 주차형 빌라, 판상형 아파트, 가로 연속 점포형처럼 외관이나 출입 경로가 달라지는 구조를 기록한다.

층마다 용도가 다르면 건물의 분류와 각 층의 쓰임을 함께 기록한다. 상가 건물 2층에 의원이 들어와도 상가의 공용 계단은 그대로 쓸 수 있다. 반대로 한 학교 부지 안의 교사동, 체육관, 기숙사는 동별로 분류해야 각각 알맞은 입구를 연결할 수 있다.

## 배달원이 실제로 거치는 길을 본다

### 주거에서 찾아야 하는 문

단독주택은 주소에 도착한 뒤 대문에서 마당을 지나 현관에 닿을 수 있다. 연립형 주택은 외벽이 이어져 보여도 집마다 입구가 따로 있다. 빌라는 공동현관을 먼저 찾고 계단이나 승강기를 이용한다. 아파트 단지에서는 주소 외에도 동 번호와 공동현관을 알아야 한다.

필로티 빌라를 만들 때는 기둥과 계단실을 놓고도 차가 들어갈 폭이 남는지 본다. 차가 주차된 뒤에도 사람이 공동현관까지 걸어갈 수 있어야 한다. 닫힌 1층의 빌라에는 벽체와 공동현관을 배치한다. 문이 도로보다 높으면 외부 계단과 층참을 붙일 수 있다. 외부 계단은 필로티 여부와 별도로 판단한다.

<figure class="building-example">
  <img src="/images/devlog/osm-building-classification/jamsil-apartments.jpg" width="1000" height="750" loading="lazy" alt="서울 잠실 주공아파트 5단지의 긴 동과 층마다 반복되는 창" />
  <figcaption>서울 잠실 주공아파트 5단지. 긴 동을 따라 세대 창과 발코니가 반복된다. 사진 <a href="https://commons.wikimedia.org/wiki/File:Jamsil_Apartment_Complex_Phase_5_(5460805782).jpg">InSapphoWeTrust</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>.</figcaption>
</figure>

### 동네 상가에서 음식 픽업하기

음식 픽업의 기준은 동네 상가다. 독립 점포는 보도에서 매장으로 바로 들어간다. 여러 점포가 나란히 붙은 상가는 주소에 도착한 뒤 주문에 적힌 간판과 문을 골라야 한다. 위층 식당이라면 상가 공용문에서 계단이나 승강기를 거쳐 매장 문으로 이어진다. 주문에는 점포와 출입구, 음식을 건네받을 카운터를 연결한다.

쇼윈도와 간판, 점포문은 여러 가게에서 재사용할 수 있다. 전통시장에서는 시장 골목, 쇼핑몰에서는 공용 로비나 야외 광장이 중간에 추가된다. 마트와 백화점에는 고객 출입구와 상품 하역구가 따로 있을 수 있다. 외관을 공유해도 픽업 경로는 건물마다 달라진다.

<figure class="building-example">
  <img src="/images/devlog/osm-building-classification/korean-bbq-storefront.jpg" width="640" height="960" loading="lazy" alt="서울의 한 음식점에서 보도와 맞닿은 출입문 위로 간판이 보이는 모습" />
  <figcaption>서울의 한 음식점. 도로에서 간판을 확인한 뒤 보도에서 매장 문으로 들어간다. 사진 <a href="https://www.pexels.com/photo/entrance-to-a-korean-bbq-restaurant-18936030/">Pincalo</a>, <a href="https://www.pexels.com/license/">Pexels License</a>. 웹용으로 크기를 줄였다.</figcaption>
</figure>

<figure class="building-example">
  <img src="/images/devlog/osm-building-classification/restaurant-storefronts.jpg" width="1440" height="982" loading="lazy" alt="서울 골목 양쪽에 음식점 간판과 출입구가 이어진 모습" />
  <figcaption>서울의 음식점 골목. 같은 길에 도착해도 주문에 맞는 간판과 문을 찾아야 한다. 사진 <a href="https://commons.wikimedia.org/wiki/File:Walking_beneath_restaurant_signs_in_Seoul_(55614010409).jpg">Sergiy Galyonkin</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. 웹용으로 크기를 줄였다.</figcaption>
</figure>

### 한 주소에서 갈라지는 두 경로

상가주택에서는 1층 식당으로 가는 주문과 위층 세대로 가는 주문을 각각의 문에 연결한다. 공용문을 함께 쓰는 건물이라면 문을 지나 안쪽에서 경로를 나눈다. 이 사례를 첫 검증 대상으로 삼아 외관의 문과 실내 연결, 주문 안내가 같은 출입구를 가리키는지 확인할 계획이다. 문과 주변 벽도 같은 개구부 정보를 사용해, 열린 문 앞을 벽의 충돌체가 막지 않도록 한다.

<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/building-types-and-entrances.png" alt="필로티 빌라, 실내계단형 빌라, 1층 상가와 상층 주거 건물의 입구를 비교한 개념도" />
  <figcaption>비슷한 저층 건물이라도 1층 배치에 따라 공동현관과 점포문의 역할이 달라진다.</figcaption>
</figure>

<h2 id="osm-evidence">OSM 태그를 분류에 연결한다</h2>

[이전 개발 일지](/ko/devlog/osm-to-unity/)에서는 OpenStreetMap(OSM)에서 건물 윤곽을 가져오는 과정을 다뤘다. 지도에서 읽은 정보를 앞에서 정한 유형에 연결한다. 첫 단계는 **태그가 건물 전체, 건물 안의 시설, 부지 중 어디에 붙었는지** 확인하는 일이다.

1. **건물 자체에 붙은 정보를 먼저 읽는다.** `building=yes`는 건물이 있다는 뜻이고, `building=apartments`는 공동주택이라는 단서다. `building:use`가 있으면 현재 용도도 확인할 수 있다. 인계의 NC백화점 수원점은 백화점 시설 태그가 건물 윤곽에 붙어 있었다. `building=yes`와 `shop=department_store`를 함께 읽어 대형 판매시설 후보로 분류했다. [OSM 건물 태그](https://wiki.openstreetmap.org/wiki/Key:building) · [OSM 건물 용도 태그](https://wiki.openstreetmap.org/wiki/Key:building:use)
2. **별도로 찍힌 점포는 입점 시설로 연결한다.** 식당 점이 건물 윤곽 안에 있으면 주소가 맞는지 살펴본다. `level`이 있으면 식당이 있는 층에만 적용한다. 병원이나 학교 부지의 태그도 부지에 연결하고, 안에 있는 주차동이나 체육관은 개별 건물 정보를 확인한다. [OSM 층 태그](https://wiki.openstreetmap.org/wiki/Key:level) · [OSM 출입구 태그](https://wiki.openstreetmap.org/wiki/Key:entrance)
3. **확인된 용도 안에서 외관 후보를 좁힌다.** 공동주택은 층수와 윤곽으로 저층 빌라와 큰 아파트 동을 가르는 후보를 만들 수 있다. 길고 좁은 윤곽은 판상형 외관의 단서다. 필로티 주차, 점포 전용문, 연결 복도는 추가 근거가 필요하다. 송도의 `building=mixed_use`는 복합용도까지 기록하고, 상가와 주거가 각각 몇 층에 있는지는 미정으로 뒀다.

`building=yes`에 건물 전체의 용도를 설명하는 정보가 더 없으면, 주변이 주거지라는 이유만으로 공동주택으로 판정하지 않는다. 태그가 충돌할 때는 확인된 단계까지만 저장하고, 윤곽이나 층수로 고른 외관은 추정으로 기록한다.

건물 태그만 적용했을 때 대분류까지 잡힌 건물은 인계 720개, 송도 1,227개였다. 같은 객체의 시설 태그를 결합하고 일부 시설명, 층수, 윤곽을 시범 규칙에 넣은 결과는 다음과 같다. 각 숫자는 해당 단계까지 판정한 누적 건물 수다.

- **인계** 4,596개 중 대분류 753개, 중분류 322개, 소분류 외관 후보 139개.
- **송도** 1,546개 중 대분류 1,255개, 중분류 869개, 소분류 외관 후보 305개.

소분류 후보 대부분은 층수와 윤곽으로 고른 판상형·탑상형 외관이다. 두 추출본의 태그만으로는 필로티 주차나 점포문과 주거문의 분리를 확인할 수 없었다. 외관 후보와 확인된 출입구는 따로 기록한다.

## 게임에서 자세히 만들 범위를 정한다

- **자주 쓰는 픽업·배달 경로**에는 보도에서 문까지 가는 길, 공용 계단과 승강기, 층별 문, 인수 지점이 필요하다. 주거·근린상가·상가주택부터 이 경로를 구현해 볼 계획이다.
- **규모가 크거나 접근이 제한된 시설**에서는 주문에 필요한 구간을 정한다. 병원은 공개 로비의 인수처, 물류센터는 지정 하역구처럼 목적지에 맞는 문을 연결한다. 역의 개찰구 안이나 병원 응급 입구처럼 별도 권한이 필요한 곳은 일반 주문 경로에서 제외한다.
- **배경 건물과 부속 구조물**은 외관 위주로 만든다. 창고, 경비실, 개방 지붕은 공용 부재를 공유할 수 있다. 경비실이 실제 인수처로 쓰이면 그때 접근 경로를 지정한다. 공사 중이거나 폐쇄된 건물은 자동 주문 대상에서 제외하고, `building:part=*`는 상위 건물에 붙인다. [OSM 건물 부분 태그](https://wiki.openstreetmap.org/wiki/Key:building:part)

## 분류가 어려운 건물은 이렇게 남긴다

**건물 유형은 알지만 소분류를 모르면** 해당 유형의 기본 외관을 쓴다. 저층 공동주택이라면 반복 창과 공동현관을 쓰고, 닫힌 1층을 기본 외관으로 선택할 수 있다. 실제 구조는 미정으로 남겨 나중에 필로티가 확인되면 해당 부분을 바꿀 수 있게 한다.

**건물 용도를 모르면** 미분류로 두고 윤곽, 확인된 높이와 층수, 도로 방향으로 기본 외관을 만든다. 저층은 벽과 창을 몇 칸 배치하고, 중층은 같은 부재에 층을 구분하는 띠와 모서리 마감을 더하며, 고층은 창을 반복하고 저층부와 상단을 나눠 마감한다. 전면을 고를 때는 외벽이 도로를 향하는지, 그 사이에 다른 건물이 있는지 살핀다. 입점 식당이 따로 확인됐으면 그 식당만 건물에 연결한다. 실제 주문을 보내려면 픽업 층과 문, 보도에서 그 문까지 갈 수 있는 경로를 먼저 정한다.

<figure class="optional-image" hidden>
  <img data-optional-src="/images/devlog/osm-building-classification/ingye-songdo-facades.png" alt="인계와 송도의 OSM 건물 윤곽 및 주변 도로를 제안한 외관과 나란히 놓은 그림" />
  <figcaption>건물 윤곽과 높이를 유지하면서 도로를 향한 면의 창 반복과 마감을 조정한다.</figcaption>
</figure>

<h2 id="building-taxonomy">한국 건물 분류 목록</h2>

목록을 열면 대분류별 설명과 세부 유형을 볼 수 있다. 각 유형 아래에 외관·출입 구조, 지도에서 찾을 태그, 재사용할 부재를 한 항목씩 배치했다. 목록에서 `B=값`은 `building=값`을 뜻한다.

<div class="taxonomy-reference">
  <h3>주거·상업·업무·숙박</h3>
  <details class="taxonomy-category" id="housing">
    <summary>주거</summary>
    <div class="taxonomy-category-content">
      <p>아파트 단지에서는 동 번호와 공동현관을 먼저 찾는다. 판상형은 긴 외벽에 창과 발코니가 이어지고, 탑상형은 여러 면에 창이 분산된다. 두 유형에 같은 창·발코니·승강기 모듈을 쓸 수 있다. 기숙사도 생활실 외벽을 공유하되, 캠퍼스 안에서 들어가는 경우와 거리에서 바로 접근하는 경우를 구분한다.</p>
      <section class="taxonomy-item">
        <h4>단독주택</h4>
        <p class="taxonomy-layout">도시 골목형·마당형 / 농촌 단층형 / 도시 한옥형. 도로에서 현관까지의 거리, 마당 배치, 지붕으로 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=house/detached/bungalow/farm</code>. 한옥은 별도 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>저층 벽·경사지붕, 담장·대문, 마당 현관</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>연립·맞벽 주택</h4>
        <p class="taxonomy-layout">두 집 맞벽형 / 여러 세대 연속형. 공유 벽과 세대별 도로 진입</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=semidetached_house/terrace</code></dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>반복 전면, 세대별 현관</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>빌라·저층 공동주택</h4>
        <p class="taxonomy-layout"><strong>필로티 주차형 / 비필로티 실내계단형</strong>. 외부 진입계단은 양쪽에 붙일 수 있는 변형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=apartments</code> 또는 주거 용도가 확인된 <code>B=residential</code> + 저층 규모·평면. 필로티는 별도 판정</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>반복 창·발코니, 공동현관, 계단 코어, 필로티 기둥·주차층, 외부 계단·층참</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>아파트</h4>
        <p class="taxonomy-layout">판상형 / 탑상형. 동의 폭·깊이와 코어 배치로 구분. 신식·구식은 마감 옵션</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=apartments</code> + 동 단위 평면·높이. <code>apartments</code> 단독이면 공동주택까지만</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>반복 주거층, 동 현관, 승강기 코어, 발코니</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>기숙사</h4>
        <p class="taxonomy-layout">교내 저층 생활동형 / 도시 독립 생활관형. 캠퍼스 내부 접근인지 도로 직결인지 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=dormitory</code> + 부지 관계</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>생활실 반복 외피, 공용 현관·복도</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="commercial">
    <summary>상업</summary>
    <div class="taxonomy-category-content">
      <p>근린상가는 보도에서 점포문으로 바로 이어지거나, 공용문에서 계단을 올라 매장에 닿는다. 시장, 마트, 쇼핑몰은 통로와 고객 출입구, 하역구의 배치에서 차이가 난다.</p>
      <section class="taxonomy-item">
        <h4>근린상가</h4>
        <p class="taxonomy-layout">독립 단층 점포형 / 가로 연속 점포형 / 다층 상가형. 직접 출입하는 점포 수와 상층 공용 코어로 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=retail/commercial/kiosk</code>. <code>shop=*</code>, <code>amenity=restaurant/cafe</code> 등은 입점 시설로 연결</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>쇼윈도·간판·점포문, 상층 공용 현관·계단</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>전통시장</h4>
        <p class="taxonomy-layout">아케이드 골목형 / 실내 상가동형. 점포가 외부 골목을 향하는지 내부 복도를 향하는지 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=marketplace</code> + 시장 경계·건물·보행로</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>아케이드 지붕, 점포 전면, 시장 게이트·실내 통로</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>대형 판매시설</h4>
        <p class="taxonomy-layout">도심 다층 마트형 / 창고형 매장 / 백화점형. 층별 판매장·주차와 하역 위치로 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=supermarket</code>, <code>shop=supermarket/department_store</code> + 규모·층 구성</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>대형 벽체·쇼윈도, 고객 로비, 주차 램프·하역문</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>쇼핑몰</h4>
        <p class="taxonomy-layout">실내 몰형 / 야외 가로형. 점포 사이 이동이 내부 통로인지 외부 광장인지 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>shop=mall</code> + 동 배치·보행 연결</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>공용 몰 로비·내부 가로 또는 야외 광장·반복 점포</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="mixed-use">
    <summary>복합용도</summary>
    <div class="taxonomy-category-content">
      <p>1층 상가와 상부 주거·업무 공간은 건물을 함께 쓰면서도 층과 출입구의 역할이 달라질 수 있다.</p>
      <section class="taxonomy-item">
        <h4>상가주택·상업복합</h4>
        <p class="taxonomy-layout"><strong>1층 상가·상층 주거</strong> / 저층 상가·상층 업무 또는 숙박 / 층별 용도 미정</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd>송도 <code>B=mixed_use</code>, <code>building:use=multipurpose</code> 또는 복수 용도. 구체적인 조합에는 각 용도의 층·범위 근거 필요</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>점포 직결문 + 상층 공용 현관. 두 문이 성립하면 분리하고, 공용문이 확인되면 그 뒤에서 분기</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="offices">
    <summary>오피스</summary>
    <div class="taxonomy-category-content">
      <p>소형 사옥은 골목에서 작은 현관으로 들어갈 수 있고, 큰 업무동은 로비를 지나 층을 찾는다. 여러 타워가 한 저층부를 공유하면 건물 주소에 도착한 뒤에도 타워를 골라야 한다. 격자형 창과 유리 전면은 같은 로비 동선에 다른 외관을 입힐 수 있는 변형이다.</p>
      <section class="taxonomy-item">
        <h4>소형 사옥</h4>
        <p class="taxonomy-layout">골목 단독현관형 / 1층 쇼룸 병설형. 거리에서 들어가는 업무 현관과 쇼룸의 관계로 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=office</code> 또는 건물 전체 업무 사용 근거. <code>office=*</code> 한 점은 사무실 하나일 수 있음</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>작은 업무 현관·코어, 쇼룸 전면</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>일반 오피스</h4>
        <p class="taxonomy-layout">벽·창 격자형 / 유리 전면형. 입면 선택이며 로비와 출입 모듈은 공유</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd>위와 동일. 외벽 자료가 있으면 반영</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>벽·창 패널 또는 커튼월, 공용 로비·승강기</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>고층 오피스</h4>
        <p class="taxonomy-layout">단일 타워형 / 공용 저층부·복수 타워형. 저층부와 타워별 로비 연결로 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd>업무 용도 + <code>height</code>, <code>building:levels</code>, <code>building:part=*</code> 및 동 관계</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>저층부, 반복 타워 외피, 타워별 로비·코어</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="accommodation">
    <summary>숙박</summary>
    <div class="taxonomy-category-content">
      <p>호텔은 로비로 진입하는 방식과 차량 하차 공간의 유무로 나뉜다. 모텔은 공용 복도에서 객실을 찾는 방식과 차고에서 개별 객실로 접근하는 방식이 있다. 리조트나 여러 채로 된 한옥 숙소는 객실 번호보다 숙박동부터 찾는다. 주문의 인수 지점도 로비와 객실 중 어디인지 구분한다.</p>
      <section class="taxonomy-item">
        <h4>모텔·여관</h4>
        <p class="taxonomy-layout">골목 공용현관형 / 객실별 차고형. 공용 복도를 쓰는지 차량에서 객실로 개별 접근하는지 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>tourism=motel</code>. 여관은 숙박 태그와 시설 정보로 구별</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>작은 숙박 로비·객실 복도 또는 번호가 붙은 차고·객실문</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>호텔</h4>
        <p class="taxonomy-layout">보도 직결형 / 차량 하차 캐노피형. 로비 앞 차량 동선 유무로 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=hotel</code>, <code>tourism=hotel</code> + 진입로·하차 공간</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>로비·객실층, 하차 캐노피·차로</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>리조트·콘도</h4>
        <p class="taxonomy-layout">객실동 집중형 / 저층 객실동 분산형. 한 로비에서 층을 찾는지 부지에서 동을 먼저 찾는지 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>leisure=resort</code> 등 부지 정보 + 숙박동·객실 배치</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>숙박 로비·코어 또는 단지 정문·동 번호·산책로</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>펜션·한옥 숙소</h4>
        <p class="taxonomy-layout">단층 독채형 / 다객실 단일동형 / 한옥 마당·채 분리형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>tourism=guest_house/apartment/chalet</code>는 후보. 펜션 운영과 한옥 형태는 별도 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>독채 현관·데크, 객실 복도, 마당·회랑·채별 문</dd>
        </dl>
      </section>
    </div>
  </details>
  <h3>생산·교육·공공·생활 시설</h3>
  <details class="taxonomy-category" id="industry">
    <summary>공업·물류</summary>
    <div class="taxonomy-category-content">
      <p>작업장은 골목 셔터 하나로 드나들 수 있지만, 물류센터에는 하역구가 여러 개 있고 차량이 올라가는 램프도 있을 수 있다. 부지 정문과 특정 하역구를 따로 기록하면 보행문, 경비실, 상품 인수처를 목적에 맞게 쓸 수 있다.</p>
      <section class="taxonomy-item">
        <h4>소규모 작업장</h4>
        <p class="taxonomy-layout">골목 셔터형 / 앞마당 반입형. 도로와 작업장 문 사이의 차량 대기 공간으로 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=industrial</code> + 소규모 생산 근거. 관련 <code>craft=*</code>는 시설 단서</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>철골·패널 외피, 셔터·보행문, 반입 마당</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>공장</h4>
        <p class="taxonomy-layout">단독 생산동형 / 다동 생산단지형. 정문에서 바로 생산동으로 가는지 내부 도로를 거치는지 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=industrial</code> + 제조 용도. <code>landuse=industrial</code>은 부지 단서</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>큰 생산동, 보행문·화물문, 경비실·단지 도로</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>창고</h4>
        <p class="taxonomy-layout">단층 일반 보관형 / 냉장·냉동 보관형. 냉장은 설비·운영 자료로 확인</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=warehouse</code>. 저온 보관은 별도 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>철골·패널 창고, 화물문, 필요 시 밀폐 접안부</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>물류센터</h4>
        <p class="taxonomy-layout">지상 도크 열형 / 층별 차량 램프형. 트럭이 어느 층에 직접 접안하는지 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=warehouse</code> + <code>industrial=logistics</code> 등 물류 용도 근거. 도크·램프는 별도 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>도크 반복, 번호 안내, 트럭 회차장·램프</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="education">
    <summary>교육·연구</summary>
    <div class="taxonomy-category-content">
      <p>학교나 대학은 한 부지에 교사동, 기숙사, 체육관처럼 기능이 다른 건물이 모인다. 학교 정문을 지난 뒤 목적 동을 찾아야 하고, 연결 복도가 있다면 실내에서 옆 동으로 갈 수 있다. 연구 시설은 방문 로비와 장비를 들이는 큰 문을 따로 둘 수 있다.</p>
      <section class="taxonomy-item">
        <h4>어린이집·유치원</h4>
        <p class="taxonomy-layout">독립 저층동형 / 아파트 단지 내 부속시설형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=kindergarten</code>, <code>amenity=kindergarten/childcare</code> + 단지 관계</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>보육동 외피, 대문·정원, 안내 현관</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>초·중·고</h4>
        <p class="taxonomy-layout">운동장 앞 교사동형 / 안뜰형 / 본관·별관 연결형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=school</code>, <code>amenity=school</code> + 운동장·동·연결통로. 학교 부지 안의 체육관 등은 개별 분류</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>반복 교실 외피, 학교 정문, 동별 현관·연결 복도</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>대학</h4>
        <p class="taxonomy-layout">독립 강의동형 / 여러 동 연결형. 광장·보행축에 면한 본관은 진입 변형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=college/university</code>, <code>amenity=college/university</code> + 건물별 용도</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>강의동·로비, 캠퍼스 안내, 연결 복도</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>연구·시험시설</h4>
        <p class="taxonomy-layout">연구실 반복형 / 대형 장비 시험동형 / 다동 연구단지형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=research_institute</code> + 건물별 기능·부지 관계</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>업무 외피·방문 로비, 큰 시험홀·장비 반입문, 단지 정문</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="healthcare">
    <summary>의료·복지</summary>
    <div class="taxonomy-category-content">
      <p>골목 의원은 거리에서 바로 들어가지만, 상가 상층의 의원은 공용 계단이나 승강기를 거친다. 병원은 외래 로비, 응급실 입구, 물품 인수문에 서로 다른 역할을 준다. 요양시설과 복지관에서도 주문 목적지에 따라 접수처와 생활동 출입구를 구분한다.</p>
      <section class="taxonomy-item">
        <h4>의원</h4>
        <p class="taxonomy-layout">지상 직결형 / 상가 상층 입점형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>healthcare=doctor/clinic</code>, <code>amenity=doctors/clinic</code> + <code>level</code>·출입 관계</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>접수·대기, 점포 직결문 또는 상가 공용 코어</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>종합병원</h4>
        <p class="taxonomy-layout">외래 본관 중심형 / 본관·센터 분산형. 응급·물품 인수는 별도 출입 역할</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=hospital</code>, <code>amenity=hospital</code>, <code>healthcare=hospital</code>. 종합병원 여부와 외래·병동 역할은 별도 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>외래 로비, 동별 안내, 응급 출입구, 물품 인수문</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>보건소·보건지소</h4>
        <p class="taxonomy-layout">도시 다부서 청사형 / 읍면 저층 지소형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd>의료·공공시설 태그 + 보건소·지소의 시설 정보. 범용 의료 태그만으로는 의원과 구별 보류</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>안내·접수, 층별 창구 또는 저층 직결 현관</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>노인요양시설</h4>
        <p class="taxonomy-layout">도시 다층 생활동형 / 저층 마당형. 생활층 이동과 마당 연결로 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=social_facility</code> + <code>social_facility=nursing_home</code> 등 확인된 돌봄 기능</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>생활실 외피, 접수, 승강기, 마당문</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>종합사회복지관</h4>
        <p class="taxonomy-layout">복지관 전용동형 / 문화·체육시설 복합형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=social_facility</code> 또는 <code>amenity=community_centre</code> + 복지관 기능 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>안내 창구, 상담·프로그램층, 복합시설 공용 코어</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="public-safety">
    <summary>공공·안전</summary>
    <div class="taxonomy-category-content">
      <p>구청과 주민센터는 민원 창구까지 가는 길이 중심이다. 본관·별관이나 층별 기능이 나뉜 복합청사에서는 동과 층 정보를 덧붙인다. 소방시설에서는 차고 셔터가 거리에서 눈에 띄어도 보행으로 방문할 문은 따로 기록한다.</p>
      <section class="taxonomy-item">
        <h4>시·군·구청</h4>
        <p class="taxonomy-layout">본관 중심형 / 본관·별관 분산형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=government</code>, <code>office=government</code>, <code>amenity=townhall</code> + 기관·동 정보. <code>B=public/civic</code> 단독은 공공시설까지만</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>청사 전면, 민원 로비, 광장·동별 안내</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>주민센터</h4>
        <p class="taxonomy-layout">동네 민원 중심형 / 층별 복합청사형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd>공공·정부 태그 + 주민센터·행정복지센터 확인. 복합 여부는 입점 시설·층 정보</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>민원 창구, 공용 코어, 층별 안내</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>소방시설</h4>
        <p class="taxonomy-layout">전면 차고형 119안전센터 / 본서 청사형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=fire_station</code>, <code>amenity=fire_station</code>. 본서·센터는 기관 정보로 구별</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>출동 셔터·차로, 보행 현관, 행정 로비</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>경찰시설</h4>
        <p class="taxonomy-layout">동네 파출소형 / 본서 민원 청사형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=police</code> + 기관 정보</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>소형 민원 현관 또는 청사 로비, 차량 게이트</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>법원·검찰청</h4>
        <p class="taxonomy-layout">민원동과 법정이 한 동에 있는 형태, 별관이나 출입 통제 구역이 분리된 청사형. 보안 검색 앞 공개 민원 창구를 인수처 후보로 본다.</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=courthouse</code>는 법원 단서다. 같은 부지의 별관이나 검찰청은 개별 용도를 확인한다.</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>민원 로비, 보안 검색대, 본관·별관 연결로.</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>우체국</h4>
        <p class="taxonomy-layout">가로 창구형과 차량 작업장을 갖춘 배송 거점형. 민원 창구와 차량 반입 동선을 구분한다.</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=post_office</code>와 <code>amenity=post_depot</code>로 시설의 역할을 구분한다.</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>거리 직결문, 접수 창구, 차량 반입문.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="culture">
    <summary>문화·집회</summary>
    <div class="taxonomy-category-content">
      <p>박물관은 로비 뒤 전시실로 갈라지거나, 마당을 건너 전시동을 찾는 구조다. 공연장과 전시장에는 관객 입구와 장비 반입구가 있을 수 있다. 같은 대형 홀 외관을 쓰더라도 방문객과 물품이 만나는 위치는 다르다.</p>
      <figure class="building-example">
        <img src="/images/devlog/osm-building-classification/national-museum.jpg" width="1440" height="957" loading="lazy" alt="국립중앙박물관의 큰 지붕 아래 야외 통로를 오가는 방문객" />
        <figcaption>국립중앙박물관. 큰 지붕 아래 야외 통로가 여러 접근 방향을 잇는다. 사진 <a href="https://commons.wikimedia.org/wiki/File:National_Museum_of_Korea_exterior.jpg">Tristan Surtel</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. 웹용으로 크기를 줄였다.</figcaption>
      </figure>
      <section class="taxonomy-item">
        <h4>박물관</h4>
        <p class="taxonomy-layout">한 동·공용 로비형 / 여러 전시동 분산형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=museum</code>, <code>tourism=museum</code> + 동 배치</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>전시 외피, 안내 로비 또는 마당·전시동 안내</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>도서관</h4>
        <p class="taxonomy-layout">동네 소형 열람형 / 층별 자료실형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=library</code> + 건물 범위·층 정보</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>안내대, 열람층, 공용 코어</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>공연장</h4>
        <p class="taxonomy-layout">단일 공연장 중심형 / 여러 공연장 복합형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=theatre</code> + 공연장·홀 정보</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>관객 로비·검표, 홀 안내, 무대 반입구</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>전시장·컨벤션</h4>
        <p class="taxonomy-layout">전시·회의 수직 결합형 / 전시장 동 분리형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=exhibition_centre/conference_centre</code> + 동·홀·층 정보</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>대형 홀 외피, 관람 로비, 동·홀 번호, 하역구</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>영화관</h4>
        <p class="taxonomy-layout">가로에서 바로 들어가는 독립관과 쇼핑몰에 입점한 멀티플렉스. 입점형은 쇼핑몰 공용 입구와 상영층 로비를 연결한다.</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=cinema</code>는 영화관 시설의 단서다. <code>B=cinema</code>는 건물 전체가 영화관으로 쓰이는 형태의 단서다.</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>매표 로비, 공용 승강기, 관람객 검표문.</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="religion">
    <summary>종교</summary>
    <div class="taxonomy-category-content">
      <p>상가에 입점한 교회나 기도시설은 상층 의원과 공용 계단을 공유하는 경우처럼 표현할 수 있다. 독립 예배시설은 거리에서 전용 현관을 찾고, 여러 전각이 있는 사찰은 부지 입구를 지나 마당과 전각 사이를 이동한다.</p>
      <section class="taxonomy-item">
        <h4>개신교 교회</h4>
        <p class="taxonomy-layout">상가 입점형 / 독립 예배당형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=place_of_worship</code> + <code>religion=christian</code>과 교단 정보. <code>B=church/chapel</code> 단독이면 교파 미정</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>상가 공용 코어 또는 예배당 외피·전용 현관</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>천주교 성당</h4>
        <p class="taxonomy-layout">성전·교육공간 적층형 / 성전·교육관 분리형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd>예배시설 + 가톨릭 <code>denomination=*</code> 또는 본당 확인. <code>B=cathedral</code>은 외피 단서</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>성전 외피, 교육층 코어 또는 마당·별동 현관</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>불교 사찰</h4>
        <p class="taxonomy-layout">도심 건물형 법당 / 여러 전각을 둔 가람형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd>예배시설 + <code>religion=buddhist</code>. <code>B=temple</code> 단독이면 종교 세부 미정</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>도심 현관·코어 또는 진입문·마당·전각</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>이슬람 기도시설</h4>
        <p class="taxonomy-layout">상가·복합건물 입점형 / 독립 성원형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>religion=muslim</code> + 예배시설, <code>B=mosque</code>는 전용 외피 단서</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>상가 공용 코어 또는 전용 예배시설 현관</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>기타·세부 미정 예배시설</h4>
        <p class="taxonomy-layout">건물 입점형 / 독립 시설형 / 부속동. 용도와 연결이 확인된 범위까지</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=religious/shrine/synagogue/kingdom_hall/monastery/presbytery</code> 등. 예배·거주·관리 역할 구분</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>공용 코어·전용 현관·부속동</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="sports">
    <summary>체육</summary>
    <div class="taxonomy-category-content">
      <p>생활체육관은 접수처와 탈의실을 거쳐 운동 공간으로 이어진다. 관람 경기장은 관객이 검표문을 지나 객석 구역을 찾아간다. 경기 장비는 별도의 반입문을 쓸 수 있다. 두 경우 모두 큰 홀이 필요하지만 출입구의 역할이 달라진다.</p>
      <figure class="building-example">
        <img src="/images/devlog/osm-building-classification/anyang-stadium.jpg" width="1280" height="720" loading="lazy" alt="안양종합운동장의 경기장과 둘레 관중석" />
        <figcaption>안양종합운동장. 경기 공간과 관중석 둘레가 구분된다. 사진 <a href="https://commons.wikimedia.org/wiki/File:Anyang_Stadium.jpg">고려</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. 웹용으로 크기를 줄였다.</figcaption>
      </figure>
      <section class="taxonomy-item">
        <h4>실내체육관</h4>
        <p class="taxonomy-layout">생활체육형 / 관람 경기장형. 객석·검표 동선으로 구분</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>leisure=sports_hall/sports_centre</code>, <code>B=sports_hall/sports_centre</code> + 관람 시설 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>큰 경기홀 외피, 접수·탈의 또는 관객 로비·장비 반입구</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>실내수영장</h4>
        <p class="taxonomy-layout">전용 수영동형 / 복합시설 입점형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>leisure=swimming_pool</code> 또는 <code>sport=swimming</code>이 있는 시설 + 건물·층 관계</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>접수·탈의·샤워, 전용 현관 또는 공용 코어</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>실외 운동장·경기장</h4>
        <p class="taxonomy-layout">생활 운동장형 / 관중석 둘레형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>leisure=pitch/track/stadium</code>, <code>B=stadium/grandstand</code> + 관중석·게이트 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>펜스·보행문 또는 관중석·검표 게이트, 장비문</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>헬스장·생활 운동시설</h4>
        <p class="taxonomy-layout">거리 직결형과 상가 위층·지하 입점형. 상가 공용문부터 접수 데스크까지 층 이동을 포함할 수 있다.</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>leisure=fitness_centre</code>는 운동시설의 단서다. 건물 전체에 적용하기 전에 입점 범위를 확인한다.</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>쇼윈도, 공용 계단·승강기, 접수 데스크.</dd>
        </dl>
      </section>
    </div>
  </details>
  <h3>교통·기반시설과 그 밖의 건물</h3>
  <details class="taxonomy-category" id="transport">
    <summary>교통·차량</summary>
    <div class="taxonomy-category-content">
      <p>지하철역은 거리 곳곳의 출입구가 같은 대합실로 이어질 수 있다. 철도역은 선로 위나 아래에 대합실을 두면 승강장까지 올라가거나 내려가는 방향이 달라진다. 터미널과 공항은 공개 로비, 승차·탑승 공간, 차량 진입을 나눠 목적지와 연결한다.</p>
      <figure class="building-example">
        <img src="/images/devlog/osm-building-classification/suwon-station.jpg" width="1280" height="960" loading="lazy" alt="버스가 정차하는 도로에서 바라본 수원역 정면" />
        <figcaption>수원역. 역 앞 도로에서 역사 진입부로 접근한다. 사진 <a href="https://commons.wikimedia.org/wiki/File:Suwon_station.JPG">Nils Öberg</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>. 웹용으로 크기를 줄였다.</figcaption>
      </figure>
      <section class="taxonomy-item">
        <h4>도시철도역</h4>
        <p class="taxonomy-layout">지하·분산 출입구형 / 고가 승강장형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>railway=station</code> + <code>station=subway</code> 등 운행 유형. <code>railway=subway_entrance</code>는 개별 거리 입구. 선로·대합실 높이는 별도 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>거리 계단·캐노피·엘리베이터, 대합실·개찰 연결</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>일반·고속철도역</h4>
        <p class="taxonomy-layout">선로 옆 지상역사형 / 선상역사형 / 선하역사형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=train_station</code>, <code>railway=station</code>, <code>public_transport=station</code> + 선로·역사 상대 위치. 고속철도 여부만으로 역사 배치 결정 불가</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>역광장·대합실, 육교·지하통로·승강장 계단</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>버스터미널</h4>
        <p class="taxonomy-layout">지상 독립형 / 상업 복합형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=bus_station</code>, <code>B=transportation</code> + 복합시설 연결</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>매표·대합실, 승차장, 버스 회차로·보행문</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>공항 여객청사</h4>
        <p class="taxonomy-layout">단일 청사형 / 본 청사·별도 탑승동형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>aeroway=terminal</code> + 청사·탑승동 관계. <code>aeroway=aerodrome</code>은 공항 부지</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>차량 하차 캐노피, 공개 로비, 통제문·연결통로</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>여객선터미널</h4>
        <p class="taxonomy-layout">연안 대합실·부두 직결형 / 국제 출입국 분리형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=ferry_terminal</code> + 여객청사·부두 관계. 국제선과 차량 선적은 별도 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>대합실, 보행 승선로, 차량 대기·통제문</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>주차 건물·주유소</h4>
        <p class="taxonomy-layout">적층 주차동·주차타워 / 주유 캐노피와 관리동</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=parking/garages</code>, <code>amenity=parking</code> + <code>parking=multi-storey</code> / <code>amenity=fuel</code></dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>차량 램프·차단기, 개방형 지붕, 관리실</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>격납·보관시설</h4>
        <p class="taxonomy-layout">격납고 / 선박 보관동</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=hangar/boathouse</code></dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>대형 셔터, 철골 외피, 관리문</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="agriculture">
    <summary>농축산</summary>
    <div class="taxonomy-category-content">
      <p>온실은 반투명 지붕과 반복 골조로, 축사와 작업동은 열린 측벽과 큰 작업문으로 구분할 수 있다. 농장 전체에 붙은 용도 정보는 부지에 남기고, 개별 동의 외벽과 문은 확인된 건물 형태를 따른다.</p>
      <section class="taxonomy-item">
        <h4>온실·축사·농업 작업동</h4>
        <p class="taxonomy-layout">연동 온실 / 개방 측벽 축사 / 닫힌 작업동</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=greenhouse/conservatory</code> / <code>B=barn/farm_auxiliary/stable/cowshed/sty/livestock</code></dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>반투명 지붕, 반복 철골·패널, 작업 차량문</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="infrastructure">
    <summary>기반시설</summary>
    <div class="taxonomy-category-content">
      <p>변전소나 발전시설에서는 설비동과 관리용 출입구가 중심이다. 자원순환시설에는 차량 반입문을 둘 수 있다. 같은 부지 안에 사무동이 있다면 일반 업무 로비를 공유하되 설비 구역의 접근과 따로 기록한다.</p>
      <section class="taxonomy-item">
        <h4>전력·발전·자원순환·방송</h4>
        <p class="taxonomy-layout">옥내 변전소 / 발전동·설비 결합 / 폐기물 반입형 / 업무동·제작동형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>power=substation/plant</code>, <code>man_made=wastewater_plant</code>, <code>amenity=waste_transfer_station</code> 등 부지 근거. 방송은 기관·제작동 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>설비동·펜스·관리문, 반입 셔터, 업무 로비</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="tourism">
    <summary>관광·휴게</summary>
    <div class="taxonomy-category-content">
      <p>휴게소는 넓은 주차면에서 여러 점포나 편의시설로 걸어가는 흐름이다. 수련시설은 숙소와 활동동이 떨어져 있을 수 있어 부지 안에서 동을 찾는 단계가 추가된다.</p>
      <section class="taxonomy-item">
        <h4>휴게소·수련시설</h4>
        <p class="taxonomy-layout">주차장 전면형 / 숙소·활동동 분산형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>highway=services</code>는 휴게소 부지. 수련시설은 시설 정보와 숙박·활동동 관계 확인</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>주차장 전면 점포, 대형 공용 현관, 숙박동·단지 보행로</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="special">
    <summary>특수시설</summary>
    <div class="taxonomy-category-content">
      <p>장례시설에서는 의식 공간과 마당을 중심으로 접근을 잡는다. 교정·군사시설은 부지 입구와 내부 동의 접근을 따로 본다. 일반 배달 경로는 공개 인수 지점이 확인된 범위에서 연결한다.</p>
      <section class="taxonomy-item">
        <h4>장례·추모 / 교정 / 군사</h4>
        <p class="taxonomy-layout">의식동·중정형 / 담장·통제동형 / 병영 생활동형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>amenity=funeral_hall/prison</code>, <code>landuse=military</code>, <code>B=barracks</code> 등. 부지 태그와 개별 건물 역할 분리</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>의식 로비·마당, 통제 게이트·담장, 반복 생활동</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="landmarks">
    <summary>역사·랜드마크</summary>
    <div class="taxonomy-category-content">
      <p>성문과 문루는 주변 거리에서 알아볼 수 있는 형태 자체가 중요하다. 외관을 직접 배치하고, 문을 통과하는 보행로가 있다면 통과 지점으로 따로 연결한다.</p>
      <section class="taxonomy-item">
        <h4>성문·문루 등</h4>
        <p class="taxonomy-layout">석축·목조 문루형 등 개별 외형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>historic=city_gate</code> 등 명시된 랜드마크</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>수동 배치 에셋, 필요한 경우 통과 연결</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="outbuildings">
    <summary>부속 건물</summary>
    <div class="taxonomy-category-content">
      <p>경비실, 창고, 개방 지붕은 큰 건물 옆에서 보이지만 주문의 목적지는 따로 정한다. 작은 상자형 외피나 기둥·지붕을 공유하고, 실제 인수처로 쓰는 경비실에만 그 역할을 기록한다.</p>
      <section class="taxonomy-item">
        <h4>경비실·소형 부속동·개방 지붕</h4>
        <p class="taxonomy-layout">초소형 / 닫힌 설비·창고형 / 개방 지붕형</p>
        <dl class="taxonomy-meta">
          <dt>OSM에서 볼 단서</dt>
          <dd><code>B=guardhouse/gatehouse/shed/hut/outbuilding/garage/toilets/service/tech_cab/carport/roof</code> 등</dd>
          <dt>공유할 외관·출입 부재</dt>
          <dd>소형 박스 외피, 관리문, 개방 지붕·기둥</dd>
        </dl>
      </section>
    </div>
  </details>
  <h3>판정 기준과 공유 모듈</h3>
  <details class="taxonomy-category" id="incomplete-evidence">
    <summary>태그가 부족할 때의 판정</summary>
    <div class="taxonomy-category-content">
      <section class="taxonomy-item">
        <h4>용도와 구조가 확인됨</h4>
        <dl class="taxonomy-meta">
          <dt>저장할 분류</dt>
          <dd>대·중·소분류 확정</dd>
          <dt>생성할 외관·동선</dt>
          <dd>확인된 외관 구조와 출입구를 적용. 수동 지정은 지정한 필드에 우선 적용</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>건물 용도만 확인됨</h4>
        <dl class="taxonomy-meta">
          <dt>저장할 분류</dt>
          <dd>대·중분류 확정, 소분류 미정</dd>
          <dt>생성할 외관·동선</dt>
          <dd>규모에 맞는 공용 외피와 성립하는 기본 진입을 사용. 생성한 진입은 실제 출입구와 구별해서 기록</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>건물 안 입점 시설만 확인됨</h4>
        <dl class="taxonomy-meta">
          <dt>저장할 분류</dt>
          <dd>건물은 기존 분류 또는 미분류, 해당 시설만 등록</dd>
          <dt>생성할 외관·동선</dt>
          <dd>윤곽·주소·층이 맞는 범위에 시설을 연결. 확인된 층이나 출입구가 있으면 그 시설 경로에만 적용</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4><code>building=yes</code>·빈 값·알 수 없는 값, 또는 건물 전체 용도 근거가 충돌함</h4>
        <dl class="taxonomy-meta">
          <dt>저장할 분류</dt>
          <dd>확인 가능한 가장 구체적인 분류까지만 저장. 용도 근거가 없으면 미분류</dd>
          <dt>생성할 외관·동선</dt>
          <dd>윤곽·높이·도로 방향으로 기본 외관 생성. 인근 토지 이용이나 직사각형 평면은 외관의 보조 단서로 사용</dd>
        </dl>
      </section>
    </div>
  </details>
  <details class="taxonomy-category" id="shared-modules">
    <summary>여러 유형에 쓰는 외관·출입 모듈</summary>
    <div class="taxonomy-category-content">
      <section class="taxonomy-item">
        <h4>거리 직결문 + 반복 전면</h4>
        <dl class="taxonomy-meta">
          <dt>같은 구조를 쓰는 유형</dt>
          <dd>근린 점포, 지상 의원, 작은 민원시설, 독립 예배시설</dd>
          <dt>출입구 연결</dt>
          <dd>전면의 문을 시설과 직접 연결</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>공용 현관 + 수직 코어 + 층별 문</h4>
        <dl class="taxonomy-meta">
          <dt>같은 구조를 쓰는 유형</dt>
          <dd>빌라, 다층 상가, 상층 의원·교회, 오피스, 호텔</dd>
          <dt>출입구 연결</dt>
          <dd>거리 입구 ID와 실내 목적층·시설 문을 연결</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>마당·단지 정문 + 동별 현관</h4>
        <dl class="taxonomy-meta">
          <dt>같은 구조를 쓰는 유형</dt>
          <dd>아파트 단지, 학교, 병원, 사찰, 리조트, 공장</dd>
          <dt>출입구 연결</dt>
          <dd>정문을 경유점으로 두고 배달 목적 동의 문을 따로 지정</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>관객·여객 로비 + 검표·통제문</h4>
        <dl class="taxonomy-meta">
          <dt>같은 구조를 쓰는 유형</dt>
          <dd>공연장, 경기장, 역, 공항·항만</dd>
          <dt>출입구 연결</dt>
          <dd>공개 구역의 인수처와 통제문을 별도 지점으로 기록</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>차량 진입 + 셔터·도크·하역구</h4>
        <dl class="taxonomy-meta">
          <dt>같은 구조를 쓰는 유형</dt>
          <dd>작업장, 물류센터, 대형 매장, 전시장, 소방시설</dd>
          <dt>출입구 연결</dt>
          <dd>차량문과 보행문을 분리하고, 차량문에는 하역·출동 등 실제 역할을 부여</dd>
        </dl>
      </section>
      <section class="taxonomy-item">
        <h4>저층부 + 상부 반복 외피</h4>
        <dl class="taxonomy-meta">
          <dt>같은 구조를 쓰는 유형</dt>
          <dd>아파트, 오피스 타워, 숙박, 복합건물</dd>
          <dt>출입구 연결</dt>
          <dd>상부 외피나 마감이 바뀌어도 저층 현관의 역할과 ID를 유지</dd>
        </dl>
      </section>
    </div>
  </details>
  <p class="taxonomy-note">작은 부속동은 배경용 공용 부재로 만든다. <code>stilt_house</code>, <code>houseboat</code>, <code>tent</code>, <code>bunker</code>처럼 드문 구조는 필요할 때 개별 에셋을 배치한다. <code>construction</code>, <code>ruins</code>, <code>abandoned:building=*</code>는 건물의 상태로 기록하고 자동 주문에서 제외한다. <code>building=no</code>나 철거된 객체는 독립 건물을 생성하지 않는다. <code>building:part=*</code>는 상위 건물에 합친다.</p>
</div>
