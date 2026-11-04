---
title: "Designing the in-game phone UI"
description: "What the phone shows when an order comes in and when the destination changes."
date: 2026-11-04
author: Mechureal
game: broke-rider-simulator
tags: [development]
draft: false
lang: en
translationKey: phone-ui
slug: phone-ui
---

The in-game phone is where players check orders and find their next stop. A new order shows the pickup and drop-off locations. After accepting it, the phone prioritizes the next destination and switches from the shop to the drop-off once the food is picked up.

The plan is to keep order state separate from the visible screen. Closing the phone leaves the order active, and reopening it shows the current step. Since the screen is meant for quick checks, the destination and order number need to be easy to spot.
