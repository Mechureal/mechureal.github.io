---
title: "OpenStreetMap 데이터를 Unity로 옮기기"
description: "지도 좌표를 Unity의 월드 좌표로 바꾸고 도로와 건물의 윤곽을 읽는 과정."
date: 2026-11-04
author: Mechureal
game: broke-rider-simulator
tags: [development]
draft: false
lang: ko
translationKey: osm-to-unity
slug: osm-to-unity
---

OpenStreetMap의 도로와 건물은 위도와 경도로 기록된다. Unity에서 이 데이터를 쓰려면 지도 안에 기준점을 잡고, 각 점을 기준점에서 얼마나 떨어져 있는지 미터 단위로 환산해야 한다. 동서와 남북은 월드의 X축과 Z축에 대응시킨다.

도로는 연결된 점의 배열로, 건물은 닫힌 윤곽으로 읽는다. 좌표 변환이 끝나면 먼저 교차로와 건물 외곽을 단순한 선으로 그려 본다. 같은 교차로를 공유하는 도로가 Unity에서도 같은 지점에서 만나는지 확인하기 위해서다.
